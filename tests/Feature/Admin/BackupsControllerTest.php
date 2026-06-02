<?php

use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;

test('guests are redirected to the login page', function () {
    $this->get(route('admin.backup.index'))
        ->assertRedirect(route('login'));
});

test('authenticated users can view the backup page', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('admin.backup.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/backup/index')
            ->has('backups')
        );
});

test('authenticated users can run a database backup', function () {
    Artisan::shouldReceive('call')
        ->once()
        ->with('backup:run', ['--only-db' => true, '--disable-notifications' => true]);

    $this->actingAs(User::factory()->create())
        ->post(route('admin.backup.runDatabase'))
        ->assertRedirect(route('admin.backup.index'));
});

test('authenticated users can run a storage backup', function () {
    Artisan::shouldReceive('call')
        ->once()
        ->with('backup:run', ['--only-files' => true, '--disable-notifications' => true]);

    $this->actingAs(User::factory()->create())
        ->post(route('admin.backup.runStorage'))
        ->assertRedirect(route('admin.backup.index'));
});

test('authenticated users can delete a backup file', function () {
    Storage::fake('local');

    $appSlug = str(config('backup.backup.name'))->slug();
    $directory = "backups/{$appSlug}";
    $filename = '2024-01-15-12-00-00.zip';

    Storage::disk('local')->put("{$directory}/{$filename}", 'fake-zip-content');

    $this->actingAs(User::factory()->create())
        ->delete(route('admin.backup.destroy', ['file' => $filename]))
        ->assertRedirect(route('admin.backup.index'));

    Storage::disk('local')->assertMissing("{$directory}/{$filename}");
});

test('authenticated users can download a backup file', function () {
    Storage::fake('local');

    $appSlug = str(config('backup.backup.name'))->slug();
    $directory = "backups/{$appSlug}";
    $filename = '2024-01-15-12-00-00.zip';

    Storage::disk('local')->put("{$directory}/{$filename}", 'fake-zip-content');

    $this->actingAs(User::factory()->create())
        ->get(route('admin.backup.download', ['file' => $filename]))
        ->assertOk()
        ->assertHeader('Content-Disposition');
});

test('download returns 404 for non-existent backup file', function () {
    Storage::fake('local');

    $this->actingAs(User::factory()->create())
        ->get(route('admin.backup.download', ['file' => 'nonexistent.zip']))
        ->assertNotFound();
});
