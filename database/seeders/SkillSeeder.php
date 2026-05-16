<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        $devicon = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

        $skills = [
            ['name' => 'HTML5', 'category' => 'frontend', 'icon' => "$devicon/html5/html5-original.svg", 'order' => 1],
            ['name' => 'CSS3', 'category' => 'frontend', 'icon' => "$devicon/css3/css3-original.svg", 'order' => 2],
            ['name' => 'JavaScript', 'category' => 'frontend', 'icon' => "$devicon/javascript/javascript-original.svg", 'order' => 3],
            ['name' => 'TypeScript', 'category' => 'frontend', 'icon' => "$devicon/typescript/typescript-original.svg", 'order' => 4],
            ['name' => 'React', 'category' => 'frontend', 'icon' => "$devicon/react/react-original.svg", 'order' => 5],
            ['name' => 'Next.js', 'category' => 'frontend', 'icon' => "$devicon/nextjs/nextjs-original.svg", 'order' => 6],
            ['name' => 'PHP', 'category' => 'backend', 'icon' => "$devicon/php/php-original.svg", 'order' => 1],
            ['name' => 'Laravel', 'category' => 'backend', 'icon' => "$devicon/laravel/laravel-original.svg", 'order' => 2],
            ['name' => 'Symfony', 'category' => 'backend', 'icon' => "$devicon/symfony/symfony-original.svg", 'order' => 3],
            ['name' => 'Node.js', 'category' => 'backend', 'icon' => "$devicon/nodejs/nodejs-original.svg", 'order' => 4],
            ['name' => 'MySQL', 'category' => 'backend', 'icon' => "$devicon/mysql/mysql-original.svg", 'order' => 5],
            ['name' => 'PostgreSQL', 'category' => 'backend', 'icon' => "$devicon/postgresql/postgresql-original.svg", 'order' => 6],
            ['name' => 'MongoDB', 'category' => 'backend', 'icon' => "$devicon/mongodb/mongodb-original.svg", 'order' => 7],
            ['name' => 'Redis', 'category' => 'backend', 'icon' => "$devicon/redis/redis-original.svg", 'order' => 8],
            ['name' => 'RabbitMQ', 'category' => 'backend', 'icon' => "$devicon/rabbitmq/rabbitmq-original.svg", 'order' => 9],
            ['name' => 'WordPress', 'category' => 'cms', 'icon' => "$devicon/wordpress/wordpress-original.svg", 'order' => 1],
            ['name' => 'Git', 'category' => 'devops', 'icon' => "$devicon/git/git-original.svg", 'order' => 1],
            ['name' => 'GitHub', 'category' => 'devops', 'icon' => "$devicon/github/github-original.svg", 'order' => 2],
            ['name' => 'GitHub Actions', 'category' => 'devops', 'icon' => "$devicon/githubactions/githubactions-original.svg", 'order' => 3],
            ['name' => 'Docker', 'category' => 'devops', 'icon' => "$devicon/docker/docker-original.svg", 'order' => 4],
            ['name' => 'AWS', 'category' => 'devops', 'icon' => "$devicon/amazonwebservices/amazonwebservices-plain-wordmark.svg", 'order' => 5],
            ['name' => 'Comunicação', 'category' => 'soft', 'icon' => '', 'order' => 1],
            ['name' => 'Trabalho em Equipe', 'category' => 'soft', 'icon' => '', 'order' => 2],
            ['name' => 'Solução de Problemas', 'category' => 'soft', 'icon' => '', 'order' => 3],
            ['name' => 'Proatividade', 'category' => 'soft', 'icon' => '', 'order' => 4],
        ];

        foreach ($skills as $skill) {
            Skill::create($skill);
        }
    }
}
