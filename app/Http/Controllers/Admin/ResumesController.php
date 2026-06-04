<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreResumeRequest;
use App\Http\Requests\Admin\UpdateResumeRequest;
use App\Models\Resume;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ResumesController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/resumes/index', [
            'resumes' => Resume::orderByDesc('updated_at')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/resumes/create');
    }

    public function store(StoreResumeRequest $request): RedirectResponse
    {
        $data = $request->validated();

        Resume::create($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Currículo criado.']);

        return to_route('admin.resumes.index');
    }

    public function showImport(): Response
    {
        return Inertia::render('admin/resumes/import');
    }

    public function storeImport(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'language' => ['required', 'string', 'in:pt-BR,en,es'],
            'status' => ['required', 'string', 'in:draft,active,archived'],
            'file' => ['required', 'file', 'mimes:pdf', 'max:10240'],
        ]);

        $data['file_path'] = $request->file('file')->store('resumes', 'public');
        unset($data['file']);

        Resume::create($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Currículo importado.']);

        return to_route('admin.resumes.index');
    }

    public function show(Resume $resume): Response
    {
        return Inertia::render('admin/resumes/show', [
            'resume' => $resume,
        ]);
    }

    public function edit(Resume $resume): Response
    {
        return Inertia::render('admin/resumes/edit', [
            'resume' => $resume,
        ]);
    }

    public function update(UpdateResumeRequest $request, Resume $resume): RedirectResponse
    {
        $data = $request->validated();

        $resume->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Currículo atualizado.']);

        return to_route('admin.resumes.index');
    }

    public function destroy(Resume $resume): RedirectResponse
    {
        if ($resume->getRawOriginal('file_path')) {
            Storage::disk('public')->delete($resume->getRawOriginal('file_path'));
        }

        $resume->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Currículo excluído.']);

        return to_route('admin.resumes.index');
    }
}
