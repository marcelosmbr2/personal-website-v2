<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateExperienceRequest extends FormRequest
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
            'icon_type' => ['required', 'in:upload,devicon'],
            'icon_file' => ['nullable', 'file', 'image', 'max:2048'],
            'icon_name' => ['required_if:icon_type,devicon', 'nullable', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'technologies' => ['nullable', 'string'],
            'order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
