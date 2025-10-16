@component('mail::message')
# Prescription Ready for Collection

Hello **{{ $prescription->user->name }}**,  
Your prescription **"{{ $prescription->name }}"** has been dispensed and is now ready for collection.

@isset($patientId)
**Patient ID:** {{ $patientId }}  
@endisset
**Date Dispensed:** {{ now()->format('Y-m-d') }}  
**Total Due:** {{ $prescription->formatted_total_due ?? ('R ' . number_format($prescription->items->sum('price'),2)) }}  

@unless($isLastRepeat)
@if($remainingRepeats > 0)
**Remaining Repeats:** {{ $remainingRepeats }}  
@if($prescription->next_repeat_date)
**Next Repeat Eligible:** {{ \Carbon\Carbon::parse($prescription->next_repeat_date)->format('Y-m-d') }}  
@endif
@endif
@else
> ### Final Repeat Dispensed
> This was the final repeat on your prescription. A new prescription from your doctor will be required for future dispensing.
@endunless

@component('mail::panel')
Please bring a valid form of identification when collecting your medication.
@endcomponent

If you have any questions, reply to this email or contact the pharmacy.

Thanks,  
**Ibhayi Pharmacy**

@component('mail::subcopy')
If you were not expecting this email, you can ignore it.
@endcomponent
@endcomponent
