<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $messageCounts = Message::selectRaw('type, count(*) as total')
            ->groupBy('type')
            ->pluck('total', 'type');

        return Inertia::render('admin/dashboard', [
            'messagesTotal' => Message::count(),
            'messagesBugCount' => $messageCounts->get('bug', 0),
            'messagesContatoCount' => $messageCounts->get('contato', 0),
            'messagesEmpregoCount' => $messageCounts->get('emprego', 0),
        ]);
    }
}
