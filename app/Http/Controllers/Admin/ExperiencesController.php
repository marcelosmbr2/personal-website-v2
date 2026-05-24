<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreExperienceRequest;
use App\Http\Requests\Admin\UpdateExperienceRequest;
use App\Models\Experience;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
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
        $data['icon'] = $this->resolveIcon($request);
        unset($data['icon_file'], $data['icon_name']);

        Experience::create($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Experiência criada.']);

        return to_route('admin.experiences.index');
    }

    public function update(UpdateExperienceRequest $request, Experience $experience): RedirectResponse
    {
        $data = $request->validated();
        $data['technologies'] = array_values(array_filter(array_map('trim', explode(',', $data['technologies'] ?? ''))));
        $data['icon'] = $this->resolveIcon($request, $experience->getRawOriginal('icon'));
        unset($data['icon_file'], $data['icon_name']);

        $experience->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Experiência atualizada.']);

        return to_route('admin.experiences.index');
    }

    private function resolveIcon(StoreExperienceRequest|UpdateExperienceRequest $request, ?string $previousIcon = null): string
    {
        if ($request->input('icon_type') === 'devicon') {
            if ($previousIcon !== null && str_starts_with($previousIcon, 'public/')) {
                Storage::disk('public')->delete(substr($previousIcon, 7));
            }

            return 'devicon:'.$request->input('icon_name');
        }

        if ($request->hasFile('icon_file')) {
            if ($previousIcon !== null && str_starts_with($previousIcon, 'public/')) {
                Storage::disk('public')->delete(substr($previousIcon, 7));
            }

            $path = $request->file('icon_file')->store('experiences', 'public');

            return 'public/'.$path;
        }

        return $previousIcon ?? '';
    }

    public function destroy(Experience $experience): RedirectResponse
    {
        $experience->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Experiência excluída.']);

        return to_route('admin.experiences.index');
    }
}
