<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'name' => 'Portfolio',
                'image' => '/images/projects/nextjs.webp',
                'description' => 'Portfolio pessoal construído com Next.js 15 e DatoCMS.',
                'technologies' => ['Next.js', 'DatoCMS'],
                'link' => 'https://github.com/Marcelosmbr2/personal-website',
                'status' => 'Completed',
                'is_favorite' => false,
                'order' => 1,
            ],
            [
                'name' => 'Symfony Framework',
                'image' => '/images/projects/symfony.webp',
                'description' => 'Estudo dos fundamentos e funcionalidades do framework Symfony.',
                'technologies' => ['PHP', 'Symfony'],
                'link' => 'https://github.com/marcelosmbr2/symfony-framework',
                'status' => 'in-progress',
                'is_favorite' => true,
                'order' => 2,
            ],
            [
                'name' => 'Laravel MCP',
                'image' => '/images/projects/laravel.webp',
                'description' => 'Estudo de servidor MCP com Laravel.',
                'technologies' => ['PHP', 'Laravel', 'MCP'],
                'link' => 'https://github.com/marcelosmbr2/laravel-mcp',
                'status' => 'Completed',
                'is_favorite' => true,
                'order' => 3,
            ],
            [
                'name' => 'Infraestrutura como Código',
                'image' => '/images/projects/terraform.webp',
                'description' => 'Implantação de uma aplicação Laravel na AWS utilizando Terraform e Ansible',
                'technologies' => ['AWS', 'EC2', 'Terraform', 'Ansible', 'Laravel'],
                'link' => 'https://github.com/marcelosmbr2/iac-terraform-ansible.git',
                'status' => 'Completed',
                'is_favorite' => true,
                'order' => 4,
            ],
            [
                'name' => 'Laravel Queues',
                'image' => '/images/projects/laravel.webp',
                'description' => 'Estudo de filas, jobs assíncronos e monitoramento com Horizon.',
                'technologies' => ['PHP', 'Laravel', 'Horizon', 'Queues', 'Redis', 'Mailhog', 'Docker'],
                'link' => 'https://github.com/Marcelosmbr2/laravel-queue-horizon',
                'status' => 'Completed',
                'is_favorite' => false,
                'order' => 5,
            ],
            [
                'name' => 'Laravel Cache Telescope',
                'image' => '/images/projects/laravel.webp',
                'description' => 'Estudo de cache e monitoramento com Telescope.',
                'technologies' => ['PHP', 'Laravel', 'Telescope', 'Redis', 'Docker'],
                'link' => 'https://github.com/Marcelosmbr2/laravel-cache-telescope',
                'status' => 'Completed',
                'is_favorite' => false,
                'order' => 6,
            ],
            [
                'name' => 'Laravel Evolution API',
                'image' => '/images/projects/laravel.webp',
                'description' => 'Enviando notificações via Whatsapp com Evolution API.',
                'technologies' => ['PHP', 'Laravel', 'Evolution API', 'Docker'],
                'link' => 'https://github.com/marcelosmbr2/laravel-evolution-api',
                'status' => 'Completed',
                'is_favorite' => false,
                'order' => 7,
            ],
            [
                'name' => 'Spring Framework',
                'image' => '/images/projects/spring.webp',
                'description' => 'Estudo dos fundamentos e funcionalidades do framework Spring.',
                'technologies' => ['Java', 'Spring'],
                'link' => 'https://github.com/Marcelosmbr2/spring-basic',
                'status' => 'Completed',
                'is_favorite' => false,
                'order' => 8,
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}
