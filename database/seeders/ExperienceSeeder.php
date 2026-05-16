<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    public function run(): void
    {
        $devicon = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

        $experiences = [
            [
                'title' => 'Desenvolvedor Full Stack',
                'company' => 'Freelancer',
                'period' => '11/2024 – Presente',
                'icon' => "$devicon/laravel/laravel-original.svg",
                'description' => 'Desenvolvimento de um aplicação moderna e responsiva para clubes esportivos, conectando-os diretamente a jogadores. No frontend, uso React.js com TypeScript, e outros recursos, como TailwindCSS para estilização, enquanto no backend utilizo PHP 8 e Laravel 12, integrando ambos, frontend e backend, com Inertia.js. A aplicação conta com dashboards para administração de usuários, gerenciamento de quadras, partidas e serviços por clubes, além de áreas dedicadas a jogadores para agendamento de reservas, gerenciamento de partidas, histórico, notificações, gerenciamento do perfil entre outras. Também sou responsável por gerenciar a infraestrutura, como o ambiente de homologação e produção, ambos hospedados na Digital Ocean.',
                'technologies' => ['Laravel', 'PHP', 'React', 'JavaScript', 'HTML5', 'CSS3', 'TypeScript', 'Inertia.js', 'Docker', 'Tailwind CSS', 'GitHub', 'MySQL', 'CI/CD', 'Digital Ocean'],
                'order' => 1,
            ],
            [
                'title' => 'Bolsista - Capes',
                'company' => 'Colégio Municipal Pelotense',
                'period' => '01/2022 – 03/2024',
                'icon' => "$devicon/laravel/laravel-original.svg",
                'description' => 'Ministrei aulas de informática básica na escola Pelotense, ensinando o básico sobre uso de computadores, sistema operacional Windows, pacote Office e navegação na Internet.',
                'technologies' => ['Informática Básica', 'Docência'],
                'order' => 2,
            ],
            [
                'title' => 'Desenvolvedor Full Stack',
                'company' => 'Birdview',
                'period' => '07/2023 – 02/2024',
                'icon' => "$devicon/laravel/laravel-original.svg",
                'description' => 'Dei continuidade ao projeto iniciado como bolsista, agora como prestador de serviço para a Birdview, aprimorando o software de criação de rotas para missões com drones em plantações e a plataforma de integração e gerenciamento dessas missões.',
                'technologies' => ['Laravel', 'PHP', 'React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Docker', 'HTML5', 'MySQL', 'Inertia.js', 'GitHub', 'CSS3', 'CI/CD', 'Digital Ocean'],
                'order' => 3,
            ],
            [
                'title' => 'Bolsista de Desenvolvimento Tecnológico',
                'company' => 'Bolsa, IFSUL',
                'period' => '08/2021 – 07/2023',
                'icon' => "$devicon/laravel/laravel-original.svg",
                'description' => 'Atuei no desenvolvimento de uma plataforma multi-tenant para gerenciamento de missões com drones voltadas ao controle biológico de pragas. Fui responsável por integrar um sistema de criação de rotas programáticas com Mapbox, permitindo o planejamento, execução e monitoramento das missões. A plataforma contemplava diferentes perfis de usuários (administradores, gerentes, pilotos e clientes) e gerava logs e relatórios detalhados para acompanhamento das operações.',
                'technologies' => ['Laravel', 'React.js', 'JavaScript', 'PHP', 'CSS3', 'HTML5', 'GitHub', 'MySQL'],
                'order' => 4,
            ],
            [
                'title' => 'Desenvolvedor PHP',
                'company' => 'Escola Mario Quintana',
                'period' => '04/2021 – 08/2021',
                'icon' => "$devicon/php/php-original.svg",
                'description' => 'Atuei no desenvolvimento de módulos da plataforma open-source Helpdezk, implementando novas funcionalidades com PHP, jQuery e Bootstrap. Também fui responsável por escrever a documentação da plataforma.',
                'technologies' => ['PHP', 'jQuery', 'MySQL', 'CSS', 'HTML5', 'GitHub', 'Smarty Engine', 'JavaScript'],
                'order' => 5,
            ],
        ];

        foreach ($experiences as $experience) {
            Experience::create($experience);
        }
    }
}
