<?php

namespace Database\Factories;

use App\Models\Resume;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Resume>
 */
class ResumeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(3),
            'language' => fake()->randomElement(['pt-BR', 'en', 'es']),
            'status' => fake()->randomElement(['draft', 'active', 'archived']),
            'file_path' => null,
        ];
    }
}
