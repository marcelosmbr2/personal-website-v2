<?php

namespace Database\Factories;

use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Article>
 */
class ArticleFactory extends Factory
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
            'external_link' => null,
            'image_url' => null,
            'is_favorite' => false,
            'is_from_medium' => false,
            'category' => fake()->randomElement(['Tecnologia', 'Filosofia', null]),
            'published_at' => null,
        ];
    }
}
