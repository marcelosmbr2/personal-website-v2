<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreArticleRequest;
use App\Http\Requests\Admin\UpdateArticleRequest;
use App\Models\Article;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ArticlesController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/articles/index', [
            'articles' => Article::latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/articles/create');
    }

    public function store(StoreArticleRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['is_favorite'] = $request->boolean('is_favorite');
        $data['is_from_medium'] = $request->boolean('is_from_medium');

        Article::create($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Artigo criado.']);

        return to_route('admin.articles.index');
    }

    public function update(UpdateArticleRequest $request, Article $article): RedirectResponse
    {
        $data = $request->validated();
        $data['is_favorite'] = $request->boolean('is_favorite');
        $data['is_from_medium'] = $request->boolean('is_from_medium');

        $article->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Artigo atualizado.']);

        return to_route('admin.articles.index');
    }

    public function destroy(Article $article): RedirectResponse
    {
        $article->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Artigo excluído.']);

        return to_route('admin.articles.index');
    }
}
