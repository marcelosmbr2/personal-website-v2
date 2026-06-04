<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Course;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Resume;
use App\Models\Skill;
use App\Models\SocialLink;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class WelcomeController extends Controller
{
    public function __invoke(): Response
    {
        $owner = User::select(['name', 'role', 'bio', 'avatar', 'cv_path'])->first();

        return Inertia::render('guest/welcome', [
            'owner' => $owner,
            'socialLinks' => SocialLink::where('link', '!=', '')->get(),
            'skills' => Skill::orderBy('order')->get()->groupBy('category'),
            'experiences' => Experience::orderBy('order')->get(),
            'projects' => Project::where('is_favorite', true)->limit(3)->get(),
            'courses' => Course::orderBy('order')->get(),
            'articles' => Article::where('is_favorite', true)->limit(3)->get(),
            'resumes' => Resume::where('status', 'active')->select(['id', 'name', 'language', 'file_path', 'content'])->get(),
        ]);
    }
}
