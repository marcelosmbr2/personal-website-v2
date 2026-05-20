<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCourseRequest;
use App\Http\Requests\Admin\UpdateCourseRequest;
use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CoursesController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/courses/index', [
            'courses' => Course::orderBy('order')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/courses/create');
    }

    public function store(StoreCourseRequest $request): RedirectResponse
    {
        Course::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Curso criado.']);

        return to_route('admin.courses.index');
    }

    public function update(UpdateCourseRequest $request, Course $course): RedirectResponse
    {
        $course->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Curso atualizado.']);

        return to_route('admin.courses.index');
    }

    public function destroy(Course $course): RedirectResponse
    {
        $course->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Curso excluído.']);

        return to_route('admin.courses.index');
    }
}
