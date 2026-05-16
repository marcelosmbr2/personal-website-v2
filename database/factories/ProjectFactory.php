<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'image' => null,
            'technologies' => $this->faker->words(3),
            'link' => null,
            'status' => 'Completed',
            'is_favorite' => false,
            'order' => $this->faker->numberBetween(1, 100),
        ];
    }
}
