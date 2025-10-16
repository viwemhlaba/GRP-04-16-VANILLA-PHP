<?php $__env->startComponent('mail::message'); ?>
## Repeat Prescription Request Rejected

Hello <?php echo new \Illuminate\Support\EncodedHtmlString($prescription->user->name); ?>,

Your repeat prescription request has been **rejected** by our pharmacist.

<?php $__env->startComponent('mail::panel'); ?>
**Prescription:** <?php echo new \Illuminate\Support\EncodedHtmlString($prescription->name); ?>  
**Patient ID:** <?php echo new \Illuminate\Support\EncodedHtmlString($prescription->patient_id_number ?? 'N/A'); ?>  
**Doctor:** <?php echo new \Illuminate\Support\EncodedHtmlString($prescription->doctor->name ?? 'N/A'); ?> <?php echo new \Illuminate\Support\EncodedHtmlString($prescription->doctor->surname ?? ''); ?>  
**Date Rejected:** <?php echo new \Illuminate\Support\EncodedHtmlString(now()->format('Y-m-d H:i')); ?>

<?php echo $__env->renderComponent(); ?>

### Reason for Rejection
> <?php echo new \Illuminate\Support\EncodedHtmlString($rejectionNote); ?>


### What You Can Do Next
- Wait until the next repeat is due (if applicable)  
- Consult your doctor for a new prescription  
- Contact our pharmacy if you need clarification  

If you believe this decision was made in error, feel free to reply to this email.

Regards,  
**Ibhayi Pharmacy Team**

<?php echo $__env->renderComponent(); ?><?php /**PATH C:\Users\27671\Desktop\Projects\Laravel\GRP-04-16\eprescription\resources\views/emails/repeat-rejected-markdown.blade.php ENDPATH**/ ?>