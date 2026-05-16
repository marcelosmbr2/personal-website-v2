<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class ProjectsController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('guest/projects/index', [
            'projects' => Project::orderBy('order')->get(),
        ]);
    }
}
