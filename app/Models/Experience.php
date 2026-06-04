<?php

namespace App\Models;

use Database\Factories\ExperienceFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['title', 'company', 'period', 'icon', 'icon_type', 'description', 'technologies', 'order'])]
class Experience extends Model
{
    /** @use HasFactory<ExperienceFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'technologies' => 'array',
        ];
    }

    protected function icon(): Attribute
    {
        return Attribute::make(
            get: function (string $value) {
                if (str_starts_with($value, 'public/')) {
                    return asset(substr($value, 7));
                }
                if (str_starts_with($value, 'devicon:')) {
                    $name = substr($value, 8);

                    return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{$name}/{$name}-original.svg";
                }

                return $value;
            },
        );
    }
}
