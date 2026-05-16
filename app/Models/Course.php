<?php

namespace App\Models;

use Database\Factories\CourseFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'description', 'platform', 'link', 'status', 'order'])]
class Course extends Model
{
    /** @use HasFactory<CourseFactory> */
    use HasFactory;
}
