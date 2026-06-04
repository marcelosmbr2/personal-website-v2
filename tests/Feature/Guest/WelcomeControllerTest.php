<?php

use App\Models\Resume;
use App\Models\User;

test('welcome page renders', function () {
    User::factory()->create();

    $this->get('/')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('guest/welcome')
            ->has('resumes')
        );
});

test('welcome page only returns active resumes', function () {
    User::factory()->create();
    Resume::factory()->create(['status' => 'active', 'name' => 'Currículo Ativo']);
    Resume::factory()->create(['status' => 'draft', 'name' => 'Rascunho']);
    Resume::factory()->create(['status' => 'archived', 'name' => 'Arquivado']);

    $this->get('/')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('guest/welcome')
            ->has('resumes', 1)
            ->where('resumes.0.name', 'Currículo Ativo')
        );
});
