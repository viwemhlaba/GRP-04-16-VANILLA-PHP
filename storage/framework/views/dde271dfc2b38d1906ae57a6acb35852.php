<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Prescription #<?php echo e($prescription->id); ?></title>
    <style>
        :root { --accent:#1e40af; --accent-soft:#dbeafe; --border:#e5e7eb; --bg:#ffffff; --muted:#6b7280; --danger:#b91c1c; --success:#065f46; }
        * { box-sizing:border-box; }
        body { font-family: Arial, Helvetica, sans-serif; font-size:11px; line-height:1.38; color:#111827; margin:0; padding:20px 22px 28px; background:#fff; }
        h1,h2,h3,h4 { margin:0 0 6px; line-height:1.2; }
        h1 { font-size:22px; letter-spacing:.5px; }
        h2 { font-size:14px; }
        p { margin:0 0 8px; }
        .header { text-align:center; padding-bottom:10px; margin-bottom:14px; border-bottom:2px solid var(--accent); }
    .brand { font-size:10px; font-weight:700; letter-spacing:.8px; color:var(--accent); }
    .meta-band { display:flex; justify-content:center; gap:6px; flex-wrap:wrap; margin-top:4px; font-family:inherit; }
    .badge { background:var(--accent-soft); color:var(--accent); padding:3px 6px 2px; border-radius:4px; font-size:10px; font-weight:600; text-transform:uppercase; line-height:1.1; letter-spacing:.4px; }
    .badge.outline { background:#fff; border:1px solid var(--accent-soft); }
    .badge.warn { background:#fee2e2; color:#991b1b; }
    .badge.status-approved { background:#dbeafe; color:#1e40af; }
    .badge.status-dispensed { background:#d1fae5; color:var(--success); }
    .badge.status-pending { background:#fef3c7; color:#92400e; }
    .badge.status-rejected { background:#fecaca; color:#dc2626; }
        .section { margin-bottom:18px; page-break-inside:avoid; }
        .section-title { font-size:12px; font-weight:700; color:var(--accent); margin:0 0 6px; padding-bottom:3px; border-bottom:1px solid var(--border); }
        table { width:100%; border-collapse:collapse; }
        th,td { border:1px solid var(--border); padding:5px 6px; vertical-align:top; }
        th { background:#f3f4f6; font-size:11px; text-align:left; font-weight:600; color:#374151; }
        tr:nth-child(even) td { background:#fafafa; }
        .text-right { text-align:right; }
        .text-center { text-align:center; }
        .small { font-size:10px; }
        .muted { color:var(--muted); }
    /* removed separate .status class; using .badge.status-* for uniform typography */
        .grid-3 { width:100%; border-spacing:14px 0; }
        .grid-3 td { width:33.333%; padding:10px; border:1px solid var(--border); background:#fbfdff; vertical-align:top; border-radius:4px; }
        .label { font-weight:600; color:#374151; }
        .value { color:#374151; }
        .value.small { font-size:10px; }
        .totals-row td { background:#f3f4f6; font-weight:700; }
        .summary-bar { display:flex; justify-content:space-between; font-size:10px; padding:6px 8px; border:1px solid var(--border); background:#f9fafb; margin-top:6px; }
        .notes-box { border:1px solid var(--accent-soft); background:#f8fafc; padding:8px 10px; border-radius:4px; font-size:10px; }
        .footer { margin-top:26px; padding-top:10px; border-top:1px solid var(--border); font-size:9px; text-align:center; color:var(--muted); }
        .signature-grid { width:100%; margin-top:24px; border-spacing:24px 0; }
        .signature-grid td { width:50%; vertical-align:bottom; }
        .sig-line { margin-top:38px; border-top:1px solid #111827; font-size:9px; padding-top:3px; text-align:center; }
        .watermark { position:fixed; top:45%; left:50%; transform:translate(-50%, -50%); font-size:64px; color:#1e40af10; font-weight:700; letter-spacing:4px; pointer-events:none; }
        .kv-table { width:100%; border-collapse:collapse; margin-bottom:8px; }
        .kv-table td { border:1px solid var(--border); padding:4px 6px; font-size:10px; }
        .kv-label { width:28%; background:#f8fafc; font-weight:600; color:#374151; }
        .wrap { word-break:break-word; }
    </style>
</head>
<body>
    <div class="watermark">iBHAYI</div>
    <div class="header">
    <div class="brand">iBHAYI E-PRESCRIPTION</div>
        <h1>Prescription</h1>
        <div class="meta-band">
            <span class="badge">#<?php echo e($prescription->id); ?></span>
            <span class="badge outline"><?php echo e($prescription->is_manual ? 'Manual Entry' : 'Uploaded'); ?></span>
            <span class="badge outline"><?php echo e(strtoupper($prescription->delivery_method)); ?></span>
            <span class="badge <?php echo e($prescription->repeats_used >= $prescription->repeats_total ? 'warn' : 'outline'); ?>">REPEATS <?php echo e($prescription->repeats_used); ?> / <?php echo e($prescription->repeats_total); ?></span>
            <span class="badge status-<?php echo e($prescription->status); ?>"><?php echo e(strtoupper($prescription->status)); ?></span>
        </div>
        <?php if($current_pharmacist && $current_pharmacist->pharmacy): ?>
            <p class="small muted" style="margin-top:6px;"><?php echo e($current_pharmacist->pharmacy->name); ?> — Reg: <?php echo e($current_pharmacist->pharmacy->registration_number ?? 'N/A'); ?></p>
        <?php endif; ?>
        <p class="small muted" style="margin-top:2px;">Created: <?php echo e($prescription->created_at->format('M d, Y H:i')); ?> <?php if($prescription->next_repeat_date): ?> | Next Repeat: <?php echo e(\Carbon\Carbon::parse($prescription->next_repeat_date)->format('M d, Y')); ?> <?php endif; ?></p>
    </div>

    <div class="section">
        <h2 class="section-title">Key Information</h2>
        <table class="kv-table">
            <tr>
                <td class="kv-label">Prescription Name</td>
                <td class="wrap"><?php echo e($prescription->name); ?></td>
            </tr>
            <tr>
                <td class="kv-label">Status</td>
                <td><?php echo e(strtoupper($prescription->status)); ?></td>
            </tr>
            <tr>
                <td class="kv-label">Repeats Used</td>
                <td><?php echo e($prescription->repeats_used); ?> / <?php echo e($prescription->repeats_total); ?></td>
            </tr>
            <?php if($prescription->notes): ?>
            <tr>
                <td class="kv-label">Notes</td>
                <td><?php echo e($prescription->notes); ?></td>
            </tr>
            <?php endif; ?>
        </table>
    </div>

    <div class="section">
        <h2 class="section-title">Parties</h2>
        <table class="grid-3">
            <tr>
                <td>
                    <h3 style="font-size:11px; margin:0 0 6px; color:var(--accent);">Patient</h3>
                    <div><span class="label">Name:</span> <?php echo e($patient->name); ?> <?php echo e($patient->surname); ?></div>
                    <div><span class="label">ID:</span> <?php echo e($customer->id_number ?? $prescription->patient_id_number ?? 'N/A'); ?></div>
                    <div><span class="label">Email:</span> <?php echo e($patient->email); ?></div>
                    <div><span class="label">Phone:</span> <?php echo e($customer->cellphone_number ?? 'N/A'); ?></div>
                    <?php if($customer && ($customer->address_line_1 || $customer->address_line_2 || $customer->city)): ?>
                        <div><span class="label">Address:</span><br>
                            <span class="value small">
                                <?php if($customer->address_line_1): ?><?php echo e($customer->address_line_1); ?><br><?php endif; ?>
                                <?php if($customer->address_line_2): ?><?php echo e($customer->address_line_2); ?><br><?php endif; ?>
                                <?php if($customer->city): ?><?php echo e($customer->city); ?><?php endif; ?> <?php if($customer->postal_code): ?>, <?php echo e($customer->postal_code); ?><?php endif; ?>
                            </span>
                        </div>
                    <?php endif; ?>
                </td>
                <td>
                    <h3 style="font-size:11px; margin:0 0 6px; color:var(--accent);">Doctor</h3>
                    <div><span class="label">Name:</span> Dr. <?php echo e($doctor->name); ?> <?php echo e($doctor->surname); ?></div>
                    <div><span class="label">Practice #:</span> <?php echo e($doctor->practice_number); ?></div>
                    <?php if($doctor->email): ?><div><span class="label">Email:</span> <?php echo e($doctor->email); ?></div><?php endif; ?>
                    <?php if($doctor->phone): ?><div><span class="label">Phone:</span> <?php echo e($doctor->phone); ?></div><?php endif; ?>
                    <?php if($doctor->specialization): ?><div><span class="label">Specialization:</span> <?php echo e($doctor->specialization); ?></div><?php endif; ?>
                </td>
                <td>
                    <h3 style="font-size:11px; margin:0 0 6px; color:var(--accent);">Pharmacist</h3>
                    <?php if($current_pharmacist): ?>
                        <div><span class="label">Name:</span> <?php echo e($current_pharmacist->user->name ?? 'N/A'); ?> <?php echo e($current_pharmacist->user->surname ?? ''); ?></div>
                        <?php if($current_pharmacist->license_number): ?><div><span class="label">License #:</span> <?php echo e($current_pharmacist->license_number); ?></div><?php endif; ?>
                        <?php if($current_pharmacist->pharmacy): ?><div><span class="label">Pharmacy:</span> <?php echo e($current_pharmacist->pharmacy->name); ?></div><?php endif; ?>
                        <?php if($current_pharmacist->pharmacy && $current_pharmacist->pharmacy->phone): ?><div><span class="label">Phone:</span> <?php echo e($current_pharmacist->pharmacy->phone); ?></div><?php endif; ?>
                        <?php if($current_pharmacist->pharmacy && $current_pharmacist->pharmacy->address): ?><div><span class="label">Address:</span><br><span class="value small"><?php echo e($current_pharmacist->pharmacy->address); ?></span></div><?php endif; ?>
                    <?php else: ?>
                        <div class="muted small">Pharmacist information not available</div>
                    <?php endif; ?>
                </td>
            </tr>
        </table>
    </div>

    <div class="section">
        <h2 class="section-title">Prescribed Medications</h2>
        <table>
            <thead>
                <tr>
                    <th style="width:24%">Medication</th>
                    <th style="width:20%">Active Ingredients</th>
                    <th style="width:25%">Instructions</th>
                    <th style="width:7%" class="text-center">Qty</th>
                    <th style="width:12%" class="text-center">Repeats</th>
                    <th style="width:12%" class="text-right">Price</th>
                </tr>
            </thead>
            <tbody>
            <?php $__currentLoopData = $items; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <tr>
                    <td><strong><?php echo e($item->medication->name); ?></strong></td>
                    <td class="small"><?php echo e($item->medication->activeIngredients->pluck('name')->join(', ') ?: 'N/A'); ?></td>
                    <td class="small"><?php echo e($item->instructions ?: '-'); ?></td>
                    <td class="text-center"><?php echo e($item->quantity); ?></td>
                    <td class="text-center"><?php echo e($item->repeats_used); ?>/<?php echo e($item->repeats); ?></td>
                    <td class="text-right">R<?php echo e(number_format($item->price, 2)); ?></td>
                </tr>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                <tr class="totals-row">
                    <td colspan="5" class="text-right">Total Prescription Value</td>
                    <td class="text-right">R<?php echo e(number_format($totals['prescription_total_value'], 2)); ?></td>
                </tr>
            </tbody>
        </table>
    </div>

    <?php if($dispensed_history->count() > 0): ?>
    <div class="section">
        <h2 class="section-title">Dispensing History</h2>
        <table>
            <thead>
                <tr>
                    <th style="width:15%">Date</th>
                    <th style="width:20%">Medication</th>
                    <th style="width:8%" class="text-center">Qty</th>
                    <th style="width:20%">Pharmacist</th>
                    <th style="width:25%">Pharmacy</th>
                    <th style="width:12%" class="text-right">Cost</th>
                </tr>
            </thead>
            <tbody>
            <?php $__currentLoopData = $dispensed_history; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <tr>
                    <td class="small"><?php echo e($item->dispensed_at->format('M d, Y')); ?><br><span class="muted small"><?php echo e($item->dispensed_at->format('H:i')); ?></span></td>
                    <td><?php echo e($item->medication->name); ?></td>
                    <td class="text-center"><?php echo e($item->quantity_dispensed); ?></td>
                    <td class="small"><?php echo e($item->pharmacist->name ?? 'Unknown'); ?></td>
                    <td class="small"><?php echo e($item->pharmacist->pharmacistProfile->pharmacy->name ?? 'Unknown Pharmacy'); ?></td>
                    <td class="text-right">R<?php echo e(number_format($item->cost, 2)); ?></td>
                </tr>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                <tr class="totals-row">
                    <td colspan="5" class="text-right">Total Dispensed Value</td>
                    <td class="text-right">R<?php echo e(number_format($totals['total_cost'], 2)); ?></td>
                </tr>
            </tbody>
        </table>
        <div class="summary-bar">
            <span><strong>Summary</strong></span>
            <span>Total Items Dispensed: <?php echo e($totals['total_items_dispensed']); ?></span>
        </div>
    </div>
    <?php endif; ?>

    <table class="signature-grid">
        <tr>
            <td>
                <div class="sig-line">Doctor Signature</div>
            </td>
            <td>
                <div class="sig-line">Pharmacist Signature</div>
            </td>
        </tr>
    </table>

    <div class="footer">
        Document generated <?php echo e($generated_at->format('F d, Y H:i:s')); ?> &mdash; This is a computer generated record. If repeats are exhausted, a new prescription is required.
    </div>
</body>
</html>
<?php /**PATH C:\Users\27671\Desktop\Projects\Laravel\GRP-04-16\eprescription\resources\views/pdf/prescription-detailed.blade.php ENDPATH**/ ?>