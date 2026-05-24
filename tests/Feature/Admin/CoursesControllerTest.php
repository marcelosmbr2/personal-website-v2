<?php

use App\Models\Course;
use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get(route('admin.courses.index'))
        ->assertRedirect(route('login'));
});

test('authenticated users can view the courses list', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('admin.courses.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/courses/index')
            ->has('courses')
        );
});

test('authenticated users can view the create course page', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('admin.courses.create'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/courses/create'));
});

test('authenticated users can view the edit course page', function () {
    $course = Course::factory()->create();

    $this->actingAs(User::factory()->create())
        ->get(route('admin.courses.edit', $course))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/courses/edit')
            ->has('course')
        );
});

test('can store a course', function () {
    $this->actingAs(User::factory()->create())
        ->post(route('admin.courses.store'), [
            'name' => 'React do Zero ao Avançado',
            'description' => 'Aprenda React do zero',
            'platform' => 'Udemy',
            'link' => 'https://udemy.com/react',
            'status' => 'planned',
            'order' => 1,
        ])
        ->assertRedirect(route('admin.courses.index'));

    $this->assertDatabaseHas('courses', [
        'name' => 'React do Zero ao Avançado',
        'platform' => 'Udemy',
        'status' => 'planned',
    ]);
});

test('store validates required fields', function () {
    $this->actingAs(User::factory()->create())
        ->post(route('admin.courses.store'), [])
        ->assertSessionHasErrors(['name', 'description', 'platform', 'status']);
});

test('can update a course', function () {
    $course = Course::factory()->create(['name' => 'Curso Antigo']);

    $this->actingAs(User::factory()->create())
        ->put(route('admin.courses.update', $course), [
            'name' => 'Curso Atualizado',
            'description' => 'Nova descrição',
            'platform' => 'Coursera',
            'status' => 'completed',
            'order' => 2,
        ])
        ->assertRedirect(route('admin.courses.index'));

    $this->assertDatabaseHas('courses', [
        'id' => $course->id,
        'name' => 'Curso Atualizado',
        'platform' => 'Coursera',
        'status' => 'completed',
    ]);
});

test('can delete a course', function () {
    $course = Course::factory()->create();

    $this->actingAs(User::factory()->create())
        ->delete(route('admin.courses.destroy', $course))
        ->assertRedirect(route('admin.courses.index'));

    $this->assertDatabaseMissing('courses', ['id' => $course->id]);
});
