<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateResumeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'language' => ['required', 'string', 'in:pt-BR,en,es'],
            'status' => ['required', 'string', 'in:draft,active,archived'],
            'published' => ['boolean'],
            'content' => ['nullable', 'array'],
        ];
    }
}
