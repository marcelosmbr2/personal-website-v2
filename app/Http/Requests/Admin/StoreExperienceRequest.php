<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreExperienceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'company' => ['required', 'string', 'max:255'],
            'period' => ['required', 'string', 'max:255'],
            'icon' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'technologies' => ['nullable', 'string'],
            'order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
