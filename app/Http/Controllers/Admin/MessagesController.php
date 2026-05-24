<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Inertia\Inertia;
use Inertia\Response;

class MessagesController extends Controller
{
    public function show(Message $message): Response
    {
        return Inertia::render('admin/messages/show', [
            'message' => $message,
        ]);
    }
}
