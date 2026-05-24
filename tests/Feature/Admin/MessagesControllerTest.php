<?php

use App\Models\Message;
use App\Models\User;

test('guests are redirected to the login page', function () {
    $message = Message::factory()->create();

    $this->get(route('admin.messages.show', $message))
        ->assertRedirect(route('login'));
});

test('authenticated users can view a message', function () {
    $message = Message::factory()->create();

    $this->actingAs(User::factory()->create())
        ->get(route('admin.messages.show', $message))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/messages/show')
            ->has('message', fn ($m) => $m
                ->where('id', $message->id)
                ->where('subject', $message->subject)
                ->where('sender_email', $message->sender_email)
                ->etc()
            )
        );
});

test('returns 404 for non-existent message', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('admin.messages.show', 99999))
        ->assertNotFound();
});
