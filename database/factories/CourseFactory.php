<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'platform' => fake()->randomElement(['Udemy', 'Coursera', 'YouTube', 'Alura']),
            'link' => fake()->optional()->url(),
            'status' => fake()->randomElement(['Completed', 'In Progress', 'Planned']),
            'order' => fake()->numberBetween(0, 100),
        ];
    }
}
