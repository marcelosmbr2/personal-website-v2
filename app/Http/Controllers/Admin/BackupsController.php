<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BackupsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/backup/index', [
            'backups' => $this->listBackups(),
        ]);
    }

    public function runDatabase(): RedirectResponse
    {
        try {
            Artisan::call('backup:run', ['--only-db' => true, '--disable-notifications' => true]);
            Inertia::flash('toast', ['type' => 'success', 'message' => 'Backup do banco de dados realizado com sucesso.']);
        } catch (\Exception $e) {
            Inertia::flash('toast', ['type' => 'error', 'message' => 'Erro ao realizar backup: '.$e->getMessage()]);
        }

        return to_route('admin.backup.index');
    }

    public function runStorage(): RedirectResponse
    {
        try {
            Artisan::call('backup:run', ['--only-files' => true, '--disable-notifications' => true]);
            Inertia::flash('toast', ['type' => 'success', 'message' => 'Backup do storage realizado com sucesso.']);
        } catch (\Exception $e) {
            Inertia::flash('toast', ['type' => 'error', 'message' => 'Erro ao realizar backup: '.$e->getMessage()]);
        }

        return to_route('admin.backup.index');
    }

    public function download(string $file): StreamedResponse
    {
        $path = $this->resolvePath($file);

        abort_unless(Storage::disk('local')->exists($path), 404);

        return Storage::disk('local')->download($path);
    }

    public function destroy(string $file): RedirectResponse
    {
        $path = $this->resolvePath($file);

        if (Storage::disk('local')->exists($path)) {
            Storage::disk('local')->delete($path);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Backup excluído com sucesso.']);

        return to_route('admin.backup.index');
    }

    private function backupDirectory(): string
    {
        return 'backups/'.str(config('backup.backup.name'))->slug();
    }

    private function resolvePath(string $file): string
    {
        return $this->backupDirectory().'/'.$file;
    }

    /** @return array<int, array{name: string, size: string, date: string}> */
    private function listBackups(): array
    {
        $disk = Storage::disk('local');
        $directory = $this->backupDirectory();

        if (! $disk->exists($directory)) {
            return [];
        }

        return collect($disk->files($directory))
            ->map(fn (string $file) => [
                'name' => basename($file),
                'size' => $this->formatBytes($disk->size($file)),
                'date' => Carbon::createFromTimestamp($disk->lastModified($file))->toDateTimeString(),
            ])
            ->sortByDesc('date')
            ->values()
            ->all();
    }

    private function formatBytes(int $bytes): string
    {
        if ($bytes >= 1_048_576) {
            return round($bytes / 1_048_576, 2).' MB';
        }

        if ($bytes >= 1_024) {
            return round($bytes / 1_024, 2).' KB';
        }

        return $bytes.' B';
    }
}
