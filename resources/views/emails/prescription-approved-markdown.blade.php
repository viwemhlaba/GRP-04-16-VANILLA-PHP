@component('mail::message')
# Prescription Approved

Hi {{ $prescription->user->name }},

Your prescription **"{{ $prescription->name }}"** has been approved.

@component('mail::panel')
**Total Due:** {{ $prescription->formatted_total_due }}
@endcomponent

@component('mail::button', ['url' => config('app.url')])
View Your Prescription
@endcomponent

If you have repeats remaining, you can request them from your account dashboard when eligible.

Thanks,
{{ config('app.name') }}
@endcomponent
