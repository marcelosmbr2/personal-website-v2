<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProjectRequest;
use App\Http\Requests\Admin\UpdateProjectRequest;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProjectsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/projects/index', [
            'projects' => Project::orderBy('order')->get(),
        ]);
    }

    public function store(StoreProjectRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['technologies'] = $this->parseTechnologies($data['technologies'] ?? '');
        $data['is_favorite'] = $request->boolean('is_favorite');

        Project::create($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Projeto criado.']);

        return to_route('admin.projects.index');
    }

    public function update(UpdateProjectRequest $request, Project $project): RedirectResponse
    {
        $data = $request->validated();
        $data['technologies'] = $this->parseTechnologies($data['technologies'] ?? '');
        $data['is_favorite'] = $request->boolean('is_favorite');

        $project->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Projeto atualizado.']);

        return to_route('admin.projects.index');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Projeto excluído.']);

        return to_route('admin.projects.index');
    }

    private function parseTechnologies(string $value): array
    {
        return array_values(array_filter(array_map('trim', explode(',', $value))));
    }
}
