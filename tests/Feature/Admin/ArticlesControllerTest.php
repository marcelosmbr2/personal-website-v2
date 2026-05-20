<?php

use App\Models\Article;
use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get(route('admin.articles.index'))
        ->assertRedirect(route('login'));
});

test('authenticated users can view the articles list', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('admin.articles.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/articles/index')
            ->has('articles')
        );
});

test('authenticated users can view the create article page', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('admin.articles.create'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/articles/create'));
});

test('can store an article', function () {
    $this->actingAs(User::factory()->create())
        ->post(route('admin.articles.store'), [
            'name' => 'Novo Artigo',
            'description' => 'Descrição do artigo',
            'content' => '<p>Conteúdo do artigo</p>',
            'external_link' => 'https://example.com',
            'image_url' => null,
            'category' => 'Tecnologia',
        ])
        ->assertRedirect(route('admin.articles.index'));

    $this->assertDatabaseHas('articles', [
        'name' => 'Novo Artigo',
        'description' => 'Descrição do artigo',
        'content' => '<p>Conteúdo do artigo</p>',
        'category' => 'Tecnologia',
    ]);
});

test('store validates required fields', function () {
    $this->actingAs(User::factory()->create())
        ->post(route('admin.articles.store'), [])
        ->assertSessionHasErrors(['name', 'description']);
});

test('can update an article', function () {
    $article = Article::factory()->create(['name' => 'Artigo Antigo']);

    $this->actingAs(User::factory()->create())
        ->put(route('admin.articles.update', $article), [
            'name' => 'Artigo Atualizado',
            'description' => 'Nova descrição',
            'content' => '<p>Conteúdo atualizado</p>',
            'category' => 'Filosofia',
        ])
        ->assertRedirect(route('admin.articles.index'));

    $this->assertDatabaseHas('articles', [
        'id' => $article->id,
        'name' => 'Artigo Atualizado',
    ]);
});

test('can delete an article', function () {
    $article = Article::factory()->create();

    $this->actingAs(User::factory()->create())
        ->delete(route('admin.articles.destroy', $article))
        ->assertRedirect(route('admin.articles.index'));

    $this->assertDatabaseMissing('articles', ['id' => $article->id]);
});
