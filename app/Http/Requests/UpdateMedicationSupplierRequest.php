<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMedicationSupplierRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->route('supplier');
        return [
            'name' => 'required|string|unique:medication_suppliers,name,' . $id,
            'contact_name' => 'required|string',
            'contact_surname' => 'required|string',
            'email' => 'required|email|unique:medication_suppliers,email,' . $id,
        ];
    }
}
