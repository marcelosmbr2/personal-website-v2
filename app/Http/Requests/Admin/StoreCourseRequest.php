<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCourseRequest extends FormRequest
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
            'platform' => ['required', 'string', 'in:Udemy,Coursera,YouTube,Alura'],
            'link' => ['nullable', 'url', 'max:255'],
            'status' => ['required', 'string', 'in:Completed,In Progress,Planned'],
            'order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
