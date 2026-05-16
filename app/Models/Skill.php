<?php

namespace App\Models;

use Database\Factories\SkillFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'category', 'icon', 'order'])]
class Skill extends Model
{
    /** @use HasFactory<SkillFactory> */
    use HasFactory;
}
