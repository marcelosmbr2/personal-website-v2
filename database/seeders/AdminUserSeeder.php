<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => env('ADMIN_EMAIL')],
            [
                'name' => env('ADMIN_NAME', 'Marcelo Moreira'),
                'email_verified_at' => now(),
                'password' => env('ADMIN_PASSWORD'),
                'avatar' => '/images/avatar.webp',
                'role' => 'Desenvolvedor Full Stack',
            ]
        );
    }
}
