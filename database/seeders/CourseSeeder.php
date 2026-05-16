<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $courses = [
            [
                'name' => 'Formação em Engenharia de Software',
                'description' => 'Essa formação oferece uma visão completa da área, abordando disciplinas como arquitetura e design de sistemas, testes de software, gestão de projetos, infraestrutura e deploy.',
                'platform' => 'Alura',
                'link' => 'https://cursos.alura.com.br/degree/certificate/5b05f0ae-36c9-4898-af7c-4e4fed60a6f3?lang=pt_BR',
                'status' => 'Completed',
                'order' => 1,
            ],
            [
                'name' => 'Formação em DevOps',
                'description' => 'Essa formação ensina práticas de integração e entrega contínua, virtualização e provisionamento de infraestrutura, conteinerização e monitoramento de sistemas.',
                'platform' => 'Alura',
                'link' => 'https://www.alura.com.br/formacao-engenharia-software',
                'status' => 'Completed',
                'order' => 2,
            ],
            [
                'name' => 'Carreira Desenvolvedor PHP',
                'description' => 'Essa carreira cobre desde os fundamentos da linguagem PHP até o desenvolvimento de aplicações web completas utilizando frameworks como Laravel e Symfony.',
                'platform' => 'Alura',
                'link' => 'https://www.alura.com.br/carreiras/desenvolvimento-backend-php',
                'status' => 'Pending',
                'order' => 3,
            ],
        ];

        foreach ($courses as $course) {
            Course::create($course);
        }
    }
}
