<?php

namespace App\Models;

use Database\Factories\ResumeFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'language', 'status', 'file_path', 'content'])]
class Resume extends Model
{
    /** @use HasFactory<ResumeFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'content' => 'array',
        ];
    }

    protected function filePath(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => $value ? asset('storage/'.$value) : null,
        );
    }
}
