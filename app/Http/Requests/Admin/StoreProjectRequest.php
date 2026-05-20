<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'status' => ['required', 'string', 'in:Completed,In Progress,Planned'],
            'technologies' => ['nullable', 'string'],
            'link' => ['nullable', 'url', 'max:255'],
            'image' => ['nullable', 'string', 'max:255'],
            'order' => ['integer', 'min:0'],
        ];
    }
}
