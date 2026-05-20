<?php

namespace Database\Factories;

use App\Models\Message;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Message>
 */
class MessageFactory extends Factory
{
    public function definition(): array
    {
        return [
            'type' => fake()->randomElement(['bug', 'contato', 'emprego']),
            'subject' => fake()->sentence(4),
            'sender_email' => fake()->safeEmail(),
            'body' => fake()->paragraph(),
        ];
    }

    public function bug(): static
    {
        return $this->state(['type' => 'bug']);
    }

    public function contato(): static
    {
        return $this->state(['type' => 'contato']);
    }

    public function emprego(): static
    {
        return $this->state(['type' => 'emprego']);
    }
}
