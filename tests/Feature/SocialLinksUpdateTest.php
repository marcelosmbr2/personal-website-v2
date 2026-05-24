<?php

use App\Models\SocialLink;
use App\Models\User;

test('social links can be updated', function () {
    $user = User::factory()->create();
    $link = SocialLink::factory()->create(['link' => 'https://old.example.com']);

    $response = $this
        ->actingAs($user)
        ->patch(route('social-links.update'), [
            'links' => [$link->id => 'https://new.example.com'],
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('profile.edit'));

    expect($link->fresh()->link)->toBe('https://new.example.com');
});

test('social links update requires authentication', function () {
    $link = SocialLink::factory()->create();

    $response = $this->patch(route('social-links.update'), [
        'links' => [$link->id => 'https://example.com'],
    ]);

    $response->assertRedirect(route('login'));
});
