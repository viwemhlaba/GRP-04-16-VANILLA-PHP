@component('mail::message')
## Repeat Prescription Request Rejected

Hello {{ $prescription->user->name }},

Your repeat prescription request has been **rejected** by our pharmacist.

@component('mail::panel')
**Prescription:** {{ $prescription->name }}  
**Patient ID:** {{ $prescription->patient_id_number ?? 'N/A' }}  
**Doctor:** {{ $prescription->doctor->name ?? 'N/A' }} {{ $prescription->doctor->surname ?? '' }}  
**Date Rejected:** {{ now()->format('Y-m-d H:i') }}
@endcomponent

### Reason for Rejection
> {{ $rejectionNote }}

### What You Can Do Next
- Wait until the next repeat is due (if applicable)  
- Consult your doctor for a new prescription  
- Contact our pharmacy if you need clarification  

If you believe this decision was made in error, feel free to reply to this email.

Regards,  
**Ibhayi Pharmacy Team**

@endcomponent