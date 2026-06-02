<?php

use App\Models\Resume;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('guests are redirected to the login page', function () {
    $this->get(route('admin.resumes.index'))
        ->assertRedirect(route('login'));
});

test('authenticated users can view the resumes list', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('admin.resumes.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/resumes/index')
            ->has('resumes')
        );
});

test('authenticated users can view the create resume page', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('admin.resumes.create'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/resumes/create'));
});

test('authenticated users can create a resume with content', function () {
    $this->actingAs(User::factory()->create())
        ->post(route('admin.resumes.store'), [
            'name' => 'Currículo PT-BR 2025',
            'language' => 'pt-BR',
            'status' => 'draft',
            'published' => false,
            'content' => [
                'header' => ['name' => 'Marcelo', 'title' => 'Dev', 'location' => '', 'email' => '', 'phone' => '', 'linkedin' => '', 'website' => '', 'github' => ''],
                'summary' => 'Desenvolvedor full-stack.',
                'skills' => [],
                'experiences' => [],
                'education' => [],
                'courses' => [],
                'publications' => null,
                'projects' => null,
            ],
        ])
        ->assertRedirect(route('admin.resumes.index'));

    $this->assertDatabaseHas('resumes', [
        'name' => 'Currículo PT-BR 2025',
        'language' => 'pt-BR',
        'status' => 'draft',
    ]);
});

test('authenticated users can view the edit resume page', function () {
    $resume = Resume::factory()->create();

    $this->actingAs(User::factory()->create())
        ->get(route('admin.resumes.edit', $resume))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/resumes/edit')
            ->has('resume')
        );
});

test('authenticated users can update a resume', function () {
    $resume = Resume::factory()->create(['name' => 'Antigo Nome']);

    $this->actingAs(User::factory()->create())
        ->put(route('admin.resumes.update', $resume), [
            'name' => 'Novo Nome',
            'language' => 'en',
            'status' => 'active',
            'published' => true,
            'content' => null,
        ])
        ->assertRedirect(route('admin.resumes.index'));

    $this->assertDatabaseHas('resumes', [
        'id' => $resume->id,
        'name' => 'Novo Nome',
        'status' => 'active',
    ]);
});

test('authenticated users can delete a resume', function () {
    $resume = Resume::factory()->create(['file_path' => null]);

    $this->actingAs(User::factory()->create())
        ->delete(route('admin.resumes.destroy', $resume))
        ->assertRedirect(route('admin.resumes.index'));

    $this->assertDatabaseMissing('resumes', ['id' => $resume->id]);
});

test('deleting a resume removes its file from storage', function () {
    Storage::fake('public');

    $file = UploadedFile::fake()->create('resume.pdf', 100, 'application/pdf');
    $path = $file->store('resumes', 'public');

    $resume = Resume::factory()->create(['file_path' => $path]);

    $this->actingAs(User::factory()->create())
        ->delete(route('admin.resumes.destroy', $resume))
        ->assertRedirect(route('admin.resumes.index'));

    Storage::disk('public')->assertMissing($path);
});
