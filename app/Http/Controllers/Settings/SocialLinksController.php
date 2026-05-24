<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\UpdateSocialLinksRequest;
use App\Models\SocialLink;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class SocialLinksController extends Controller
{
    public function update(UpdateSocialLinksRequest $request): RedirectResponse
    {
        foreach ($request->validated('links') as $id => $link) {
            SocialLink::where('id', $id)->update(['link' => $link ?? '']);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Social links updated.')]);

        return to_route('profile.edit');
    }
}
