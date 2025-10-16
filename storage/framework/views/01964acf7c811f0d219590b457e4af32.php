<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Repeat Prescription Request Rejected</title>
</head>
<body>
<h2>Hello <?php echo e($prescription->user->name); ?>,</h2>

<p>We regret to inform you that your repeat prescription request has been rejected by our pharmacist.</p>

<p><strong>Prescription Details:</strong></p>
<ul>
    <li>Prescription: <?php echo e($prescription->name); ?></li>
    <li>Patient ID: <?php echo e($prescription->patient_id_number ?? 'N/A'); ?></li>
    <li>Doctor: <?php echo e($prescription->doctor->name ?? 'N/A'); ?> <?php echo e($prescription->doctor->surname ?? ''); ?></li>
    <li>Date Rejected: <?php echo e(now()->format('Y-m-d H:i')); ?></li>
</ul>

<p><strong>Reason for Rejection:</strong></p>
<div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #dc3545; margin: 15px 0;">
    <?php echo e($rejectionNote); ?>

</div>

<p>If you have any questions about this rejection or would like to discuss your prescription needs, please contact us directly or consult with your doctor.</p>

<p>You may need to:</p>
<ul>
    <li>Wait until your next repeat is due</li>
    <li>Consult with your doctor for a new prescription</li>
    <li>Contact our pharmacy for clarification</li>
</ul>

<p>Thank you for your understanding.</p>

<p>Best regards,<br>
    Ibhayi Pharmacy Team</p>
</body>
</html>
<?php /**PATH C:\Users\27671\Desktop\Projects\Laravel\GRP-04-16\eprescription\resources\views/emails/repeat-rejected.blade.php ENDPATH**/ ?>