<?php

use App\Http\Controllers\Guest\ArticlesController;
use App\Http\Controllers\Guest\ProjectsController;
use App\Http\Controllers\Guest\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', WelcomeController::class)->name('home');
Route::get('/articles', ArticlesController::class)->name('articles.index');
Route::get('/projects', ProjectsController::class)->name('projects.index');

Route::middleware(['auth'])->group(function () {
    Route::inertia('dashboard', 'admin/dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
