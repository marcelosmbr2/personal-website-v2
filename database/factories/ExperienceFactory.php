<?php

namespace Database\Factories;

use App\Models\Experience;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Experience>
 */
class ExperienceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->jobTitle(),
            'company' => fake()->company(),
            'period' => fake()->year().' – '.fake()->randomElement([fake()->year(), 'Presente']),
            'icon' => 'devicon:'.fake()->slug(1),
            'icon_type' => 'devicon',
            'description' => fake()->paragraph(),
            'technologies' => fake()->randomElements(['PHP', 'Laravel', 'React', 'TypeScript', 'MySQL', 'Docker', 'Vue', 'Node.js'], 3),
            'order' => fake()->numberBetween(0, 10),
        ];
    }
}
