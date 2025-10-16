<?php $__env->startComponent('mail::message'); ?>
# Prescription Ready for Collection

Hello **<?php echo new \Illuminate\Support\EncodedHtmlString($prescription->user->name); ?>**,  
Your prescription **"<?php echo new \Illuminate\Support\EncodedHtmlString($prescription->name); ?>"** has been dispensed and is now ready for collection.

<?php if(isset($patientId)): ?>
**Patient ID:** <?php echo new \Illuminate\Support\EncodedHtmlString($patientId); ?>  
<?php endif; ?>
**Date Dispensed:** <?php echo new \Illuminate\Support\EncodedHtmlString(now()->format('Y-m-d')); ?>  
**Total Due:** <?php echo new \Illuminate\Support\EncodedHtmlString($prescription->formatted_total_due ?? ('R ' . number_format($prescription->items->sum('price'),2))); ?>  

<?php if (! ($isLastRepeat)): ?>
<?php if($remainingRepeats > 0): ?>
**Remaining Repeats:** <?php echo new \Illuminate\Support\EncodedHtmlString($remainingRepeats); ?>  
<?php if($prescription->next_repeat_date): ?>
**Next Repeat Eligible:** <?php echo new \Illuminate\Support\EncodedHtmlString(\Carbon\Carbon::parse($prescription->next_repeat_date)->format('Y-m-d')); ?>  
<?php endif; ?>
<?php endif; ?>
<?php else: ?>
> ### Final Repeat Dispensed
> This was the final repeat on your prescription. A new prescription from your doctor will be required for future dispensing.
<?php endif; ?>

<?php $__env->startComponent('mail::panel'); ?>
Please bring a valid form of identification when collecting your medication.
<?php echo $__env->renderComponent(); ?>

If you have any questions, reply to this email or contact the pharmacy.

Thanks,  
**Ibhayi Pharmacy**

<?php $__env->startComponent('mail::subcopy'); ?>
If you were not expecting this email, you can ignore it.
<?php echo $__env->renderComponent(); ?>
<?php echo $__env->renderComponent(); ?>
<?php /**PATH C:\Users\27671\Desktop\Projects\Laravel\GRP-04-16\eprescription\resources\views/emails/prescription-ready-collection-markdown.blade.php ENDPATH**/ ?>