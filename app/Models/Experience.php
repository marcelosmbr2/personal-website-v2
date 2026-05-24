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
            get: fn (string $value) => str_starts_with($value, 'public/')
                ? asset(substr($value, 7))
                : $value,
        );
    }
}
