<?php

use App\Http\Controllers\Admin;
use App\Http\Controllers\Guest\ArticlesController;
use App\Http\Controllers\Guest\ProjectsController;
use App\Http\Controllers\Guest\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', WelcomeController::class)->name('home');
Route::get('/articles', ArticlesController::class)->name('articles.index');
Route::get('/projects', ProjectsController::class)->name('projects.index');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', Admin\DashboardController::class)->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('projects', Admin\ProjectsController::class)
            ->only(['index', 'store', 'update', 'destroy']);
        Route::resource('articles', Admin\ArticlesController::class)
            ->only(['index', 'create', 'store', 'update', 'destroy']);
        Route::resource('courses', Admin\CoursesController::class)
            ->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
        Route::resource('experiences', Admin\ExperiencesController::class)
            ->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
        Route::resource('resumes', Admin\ResumesController::class)
            ->only(['index', 'create', 'store', 'show', 'edit', 'update', 'destroy']);
        Route::get('resumes/import', [Admin\ResumesController::class, 'showImport'])->name('resumes.import');
        Route::post('resumes/import', [Admin\ResumesController::class, 'storeImport'])->name('resumes.storeImport');
        Route::resource('messages', Admin\MessagesController::class)
            ->only(['show']);

    });
});

require __DIR__.'/settings.php';
