<?php

use App\Models\Project;
use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get(route('admin.projects.index'))
        ->assertRedirect(route('login'));
});

test('authenticated users can view the projects list', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('admin.projects.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/projects/index')
            ->has('projects')
        );
});

test('can store a project', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('admin.projects.store'), [
            'name' => 'Novo Projeto',
            'description' => 'Descrição do projeto',
            'status' => 'Completed',
            'technologies' => 'Laravel, React',
            'link' => 'https://example.com',
            'image' => null,
            'order' => 1,
        ])
        ->assertRedirect(route('admin.projects.index'));

    $this->assertDatabaseHas('projects', [
        'name' => 'Novo Projeto',
        'description' => 'Descrição do projeto',
        'status' => 'Completed',
    ]);
});

test('store validates required fields', function () {
    $this->actingAs(User::factory()->create())
        ->post(route('admin.projects.store'), [])
        ->assertSessionHasErrors(['name', 'description', 'status']);
});

test('can update a project', function () {
    $project = Project::factory()->create(['name' => 'Antigo Nome']);

    $this->actingAs(User::factory()->create())
        ->put(route('admin.projects.update', $project), [
            'name' => 'Novo Nome',
            'description' => 'Nova descrição',
            'status' => 'In Progress',
            'order' => 2,
        ])
        ->assertRedirect(route('admin.projects.index'));

    $this->assertDatabaseHas('projects', [
        'id' => $project->id,
        'name' => 'Novo Nome',
        'status' => 'In Progress',
    ]);
});

test('can delete a project', function () {
    $project = Project::factory()->create();

    $this->actingAs(User::factory()->create())
        ->delete(route('admin.projects.destroy', $project))
        ->assertRedirect(route('admin.projects.index'));

    $this->assertDatabaseMissing('projects', ['id' => $project->id]);
});
