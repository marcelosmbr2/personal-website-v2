<?php

use App\Models\Experience;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('guests are redirected to the login page', function () {
    $this->get(route('admin.experiences.index'))
        ->assertRedirect(route('login'));
});

test('authenticated users can view the experiences list', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('admin.experiences.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/experiences/index')
            ->has('experiences')
        );
});

test('authenticated users can view the create experience page', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('admin.experiences.create'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/experiences/create'));
});

test('can store an experience with a devicon', function () {
    $this->actingAs(User::factory()->create())
        ->post(route('admin.experiences.store'), [
            'title' => 'Engenheiro de Software',
            'company' => 'Acme Corp',
            'period' => '2022 – Presente',
            'icon_type' => 'devicon',
            'icon_name' => 'laravel',
            'description' => 'Desenvolvimento de aplicações web.',
            'technologies' => 'PHP, Laravel, React',
            'order' => 1,
        ])
        ->assertRedirect(route('admin.experiences.index'));

    $this->assertDatabaseHas('experiences', [
        'title' => 'Engenheiro de Software',
        'company' => 'Acme Corp',
        'icon' => 'devicon:laravel',
        'icon_type' => 'devicon',
    ]);
});

test('can store an experience with a file upload', function () {
    Storage::fake('public');

    $this->actingAs(User::factory()->create())
        ->post(route('admin.experiences.store'), [
            'title' => 'Engenheiro de Software',
            'company' => 'Acme Corp',
            'period' => '2022 – Presente',
            'icon_type' => 'upload',
            'icon_file' => UploadedFile::fake()->image('icon.png'),
            'description' => 'Desenvolvimento de aplicações web.',
            'technologies' => 'PHP, Laravel, React',
            'order' => 1,
        ])
        ->assertRedirect(route('admin.experiences.index'));

    $experience = Experience::where('title', 'Engenheiro de Software')->first();
    expect($experience->getRawOriginal('icon'))->toStartWith('public/experiences/');
});

test('authenticated users can view the edit experience page', function () {
    $experience = Experience::factory()->create();

    $this->actingAs(User::factory()->create())
        ->get(route('admin.experiences.edit', $experience))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/experiences/edit')
            ->has('experience')
        );
});

test('store validates required fields', function () {
    $this->actingAs(User::factory()->create())
        ->post(route('admin.experiences.store'), [])
        ->assertSessionHasErrors(['title', 'company', 'period', 'icon_type', 'description']);
});

test('can update an experience icon to devicon', function () {
    $experience = Experience::factory()->create(['title' => 'Cargo Antigo']);

    $this->actingAs(User::factory()->create())
        ->put(route('admin.experiences.update', $experience), [
            'title' => 'Cargo Atualizado',
            'company' => 'Nova Empresa',
            'period' => '2023 – Presente',
            'icon_type' => 'devicon',
            'icon_name' => 'react',
            'description' => 'Nova descrição.',
            'technologies' => 'TypeScript, Vue',
            'order' => 2,
        ])
        ->assertRedirect(route('admin.experiences.index'));

    $this->assertDatabaseHas('experiences', [
        'id' => $experience->id,
        'title' => 'Cargo Atualizado',
        'icon' => 'devicon:react',
        'icon_type' => 'devicon',
    ]);
});

test('devicon icon accessor returns cdn url', function () {
    $experience = Experience::factory()->create([
        'icon' => 'devicon:laravel',
        'icon_type' => 'devicon',
    ]);

    expect($experience->icon)->toBe(
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg'
    );
});

test('can delete an experience', function () {
    $experience = Experience::factory()->create();

    $this->actingAs(User::factory()->create())
        ->delete(route('admin.experiences.destroy', $experience))
        ->assertRedirect(route('admin.experiences.index'));

    $this->assertDatabaseMissing('experiences', ['id' => $experience->id]);
});
