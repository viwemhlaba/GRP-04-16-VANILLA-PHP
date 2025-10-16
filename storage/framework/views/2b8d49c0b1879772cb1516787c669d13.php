<?php $__env->startComponent('mail::message'); ?>
# Prescription Approved

Hi <?php echo new \Illuminate\Support\EncodedHtmlString($prescription->user->name); ?>,

Your prescription **"<?php echo new \Illuminate\Support\EncodedHtmlString($prescription->name); ?>"** has been approved.

<?php $__env->startComponent('mail::panel'); ?>
**Total Due:** <?php echo new \Illuminate\Support\EncodedHtmlString($prescription->formatted_total_due); ?>

<?php echo $__env->renderComponent(); ?>

<?php $__env->startComponent('mail::button', ['url' => config('app.url')]); ?>
View Your Prescription
<?php echo $__env->renderComponent(); ?>

If you have repeats remaining, you can request them from your account dashboard when eligible.

Thanks,
<?php echo new \Illuminate\Support\EncodedHtmlString(config('app.name')); ?>

<?php echo $__env->renderComponent(); ?>
<?php /**PATH C:\Users\27671\Desktop\Projects\Laravel\GRP-04-16\eprescription\resources\views/emails/prescription-approved-markdown.blade.php ENDPATH**/ ?>