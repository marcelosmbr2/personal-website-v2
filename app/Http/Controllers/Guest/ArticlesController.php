<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Inertia\Inertia;
use Inertia\Response;

class ArticlesController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('guest/articles/index', [
            'articles' => Article::latest()->get(),
        ]);
    }
}
