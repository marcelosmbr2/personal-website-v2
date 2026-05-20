<?php

use App\Models\Message;
use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get(route('dashboard'))
        ->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/dashboard')
            ->has('messagesTotal')
            ->has('messagesBugCount')
            ->has('messagesContatoCount')
            ->has('messagesEmpregoCount')
        );
});

test('dashboard passes correct total messages count', function () {
    Message::factory()->count(5)->create();

    $this->actingAs(User::factory()->create())
        ->get(route('dashboard'))
        ->assertInertia(fn ($page) => $page
            ->where('messagesTotal', 5)
        );
});

test('dashboard passes correct bug messages count', function () {
    Message::factory()->bug()->count(3)->create();
    Message::factory()->contato()->count(2)->create();

    $this->actingAs(User::factory()->create())
        ->get(route('dashboard'))
        ->assertInertia(fn ($page) => $page
            ->where('messagesBugCount', 3)
            ->where('messagesContatoCount', 2)
            ->where('messagesEmpregoCount', 0)
        );
});

test('dashboard passes correct emprego messages count', function () {
    Message::factory()->emprego()->count(4)->create();

    $this->actingAs(User::factory()->create())
        ->get(route('dashboard'))
        ->assertInertia(fn ($page) => $page
            ->where('messagesEmpregoCount', 4)
        );
});
