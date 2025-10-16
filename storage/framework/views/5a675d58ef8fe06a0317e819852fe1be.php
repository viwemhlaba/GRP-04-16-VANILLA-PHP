<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Prescription Ready for Collection</title>
</head>
<body>
<h2>Hello <?php echo e($prescription->user->name); ?>,</h2>

<p>Your prescription "<strong><?php echo e($prescription->name); ?></strong>" has been dispensed and is now ready for collection.</p>

<p>Please visit us at your earliest convenience to collect your medication. Remember to bring a valid form of identification.</p>

<p><strong>Collection Details:</strong></p>
<ul>
    <li>Prescription: <?php echo e($prescription->name); ?></li>
    <li>Patient ID: <?php echo e($prescription->patient_id_number ?? 'N/A'); ?></li>
    <li>Date Dispensed: <?php echo e(now()->format('Y-m-d')); ?></li>
    <li><strong>Total Due: <?php echo e($prescription->formatted_total_due); ?></strong></li>
    <?php if($prescription->repeats_used < $prescription->repeats_total): ?>
        <li>Remaining Repeats: <?php echo e($prescription->repeats_total - $prescription->repeats_used); ?></li>
        <?php if($prescription->next_repeat_date): ?>
            <li>Next Repeat Available: <?php echo e($prescription->next_repeat_date); ?></li>
        <?php endif; ?>
    <?php endif; ?>
</ul>

<p>If you have any questions, please don't hesitate to contact us.</p>

<p>Thank you,<br>
    Ibhayi Pharmacy</p>
</body>
</html>
<?php /**PATH C:\Users\27671\Desktop\Projects\Laravel\GRP-04-16\eprescription\resources\views/emails/prescription-ready-collection.blade.php ENDPATH**/ ?>