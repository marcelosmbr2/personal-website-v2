<?php

namespace Database\Seeders;

use App\Models\SocialLink;
use Illuminate\Database\Seeder;

class SocialLinkSeeder extends Seeder
{
    public function run(): void
    {
        $links = [
            ['name' => 'Email', 'link' => 'mailto:marcelosmbr.dev@outlook.com', 'icon' => 'IconMail'],
            ['name' => 'GitHub', 'link' => 'https://github.com/marcelosmbr2', 'icon' => 'IconBrandGithub'],
            ['name' => 'LinkedIn', 'link' => 'https://linkedin.com/in/marcelosmbr', 'icon' => 'IconBrandLinkedin'],
            ['name' => 'WhatsApp', 'link' => 'https://wa.me/5553991082653', 'icon' => 'IconBrandWhatsapp'],
            ['name' => 'YouTube', 'link' => '', 'icon' => 'IconBrandYoutube'],
        ];

        foreach ($links as $link) {
            SocialLink::create($link);
        }
    }
}
