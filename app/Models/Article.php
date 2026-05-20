<?php

namespace App\Models;

use Database\Factories\ArticleFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'description', 'content', 'external_link', 'image_url', 'is_favorite', 'is_from_medium', 'category'])]
class Article extends Model
{
    /** @use HasFactory<ArticleFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'is_favorite' => 'boolean',
            'is_from_medium' => 'boolean',
        ];
    }
}
