<?php

use App\Models\Project;

test('projects index page renders', function () {
    $response = $this->get('/projects');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('guest/projects/index')
        ->has('projects')
    );
});

test('projects index returns all projects', function () {
    Project::factory()->count(3)->create();

    $response = $this->get('/projects');

    $response->assertInertia(fn ($page) => $page
        ->component('guest/projects/index')
        ->has('projects', 3)
    );
});
