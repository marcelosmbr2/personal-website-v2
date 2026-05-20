<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreExperienceRequest;
use App\Http\Requests\Admin\UpdateExperienceRequest;
use App\Models\Experience;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ExperiencesController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/experiences/index', [
            'experiences' => Experience::orderBy('order')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/experiences/create');
    }

    public function edit(Experience $experience): Response
    {
        return Inertia::render('admin/experiences/edit', [
            'experience' => $experience,
        ]);
    }

    public function store(StoreExperienceRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['technologies'] = array_values(array_filter(array_map('trim', explode(',', $data['technologies'] ?? ''))));

        Experience::create($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Experiência criada.']);

        return to_route('admin.experiences.index');
    }

    public function update(UpdateExperienceRequest $request, Experience $experience): RedirectResponse
    {
        $data = $request->validated();
        $data['technologies'] = array_values(array_filter(array_map('trim', explode(',', $data['technologies'] ?? ''))));

        $experience->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Experiência atualizada.']);

        return to_route('admin.experiences.index');
    }

    public function destroy(Experience $experience): RedirectResponse
    {
        $experience->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Experiência excluída.']);

        return to_route('admin.experiences.index');
    }
}
