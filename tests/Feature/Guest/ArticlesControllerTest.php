<?php

use App\Models\Article;

test('articles index page renders', function () {
    $response = $this->get('/articles');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('guest/articles/index')
        ->has('articles')
    );
});

test('articles index includes is_from_medium field', function () {
    Article::factory()->create(['is_from_medium' => true]);

    $response = $this->get('/articles');

    $response->assertInertia(fn ($page) => $page
        ->component('guest/articles/index')
        ->where('articles.0.is_from_medium', true)
    );
});

test('articles index returns all articles', function () {
    Article::factory()->count(3)->create();

    $response = $this->get('/articles');

    $response->assertInertia(fn ($page) => $page
        ->component('guest/articles/index')
        ->has('articles', 3)
    );
});
