<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Prescription Approved</title>
</head>
<body>
<h2>Hello <?php echo e($prescription->user->name); ?>,</h2>

<p>Your prescription "<strong><?php echo e($prescription->name); ?></strong>" has been approved by our pharmacist.</p>

<p><strong>Total Due: <?php echo e($prescription->formatted_total_due); ?></strong></p>

<p>You can now proceed to the next steps as discussed or await further instructions.</p>

<p>Thank you,<br>
    Ibhayi Pharmacy</p>
</body>
</html>
<?php /**PATH C:\Users\27671\Desktop\Projects\Laravel\GRP-04-16\eprescription\resources\views/emails/prescription-approved.blade.php ENDPATH**/ ?>