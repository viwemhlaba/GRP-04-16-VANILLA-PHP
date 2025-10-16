<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Dispensed Medications Report</title>
    <style>
        :root { --accent:#1e40af; --accent-soft:#dbeafe; --border:#e5e7eb; --bg:#ffffff; --muted:#6b7280; --danger:#b91c1c; }
        * { box-sizing:border-box; }
        body { font-family: Arial, Helvetica, sans-serif; font-size:11px; line-height:1.38; color:#111827; margin:0; padding:20px 22px 28px; background:#fff; }
        h1,h2,h3,h4 { margin:0 0 6px; line-height:1.2; }
        h1 { font-size:22px; letter-spacing:.5px; }
        h2 { font-size:14px; }
        p { margin:0 0 8px; }
        .header { text-align:center; padding-bottom:10px; margin-bottom:14px; border-bottom:2px solid var(--accent); }
        .brand { font-size:10px; font-weight:700; letter-spacing:.8px; color:var(--accent); }
        .meta-band { display:flex; justify-content:center; gap:6px; flex-wrap:wrap; margin-top:4px; }
        .badge { background:var(--accent-soft); color:var(--accent); padding:3px 6px 2px; border-radius:4px; font-size:10px; font-weight:600; text-transform:uppercase; line-height:1.1; letter-spacing:.4px; }
        .badge.outline { background:#fff; border:1px solid var(--accent-soft); }
        .section { margin-bottom:18px; page-break-inside:avoid; }
        .section-title { font-size:12px; font-weight:700; color:var(--accent); margin:0 0 6px; padding-bottom:3px; border-bottom:1px solid var(--border); }
        table { width:100%; border-collapse:collapse; }
        th,td { border:1px solid var(--border); padding:5px 6px; vertical-align:top; }
        th { background:#f3f4f6; font-size:11px; text-align:left; font-weight:600; color:#374151; }
        tr:nth-child(even) td { background:#fafafa; }
        .text-right { text-align:right; }
        .small { font-size:10px; }
        .muted { color:var(--muted); }
        .kpi-grid { width:100%; border-spacing:14px 0; }
        .kpi-grid td { width:25%; padding:10px; border:1px solid var(--border); background:#fbfdff; vertical-align:top; border-radius:4px; }
        .kpi-label { font-weight:600; font-size:10px; color:#374151; text-transform:uppercase; letter-spacing:.5px; }
        .kpi-value { font-size:16px; font-weight:700; color:var(--accent); margin-top:2px; }
        .group-summary { background:#f9fafb; border:1px solid var(--border); padding:6px 8px; font-size:10px; margin-top:6px; border-radius:4px; display:flex; justify-content:space-between; }
        .footer { margin-top:26px; padding-top:10px; border-top:1px solid var(--border); font-size:9px; text-align:center; color:var(--muted); }
        .watermark { position:fixed; top:45%; left:50%; transform:translate(-50%, -50%); font-size:64px; color:#1e40af10; font-weight:700; letter-spacing:4px; pointer-events:none; }
    </style>
</head>
<body>
    <div class="watermark">iBHAYI</div>
    <div class="header">
        <div class="brand">iBHAYI E-PRESCRIPTION</div>
        <h1>Dispensed Medications Report</h1>
        <div class="meta-band">
            <span class="badge outline"><?php echo e($startDate); ?> → <?php echo e($endDate); ?></span>
            <span class="badge outline">GROUP: <?php echo e(strtoupper($groupBy)); ?></span>
            <span class="badge">ITEMS <?php echo e($totals['items']); ?></span>
            <span class="badge">PATIENTS <?php echo e($totals['patients']); ?></span>
            <span class="badge">MEDS <?php echo e($totals['medications']); ?></span>
            <span class="badge outline">VALUE R<?php echo e(number_format($totals['cost'], 2)); ?></span>
        </div>
        <p class="small muted" style="margin-top:6px;">Generated: <?php echo e($generatedAt); ?> | Pharmacist: <?php echo e($pharmacist->name); ?> <?php echo e($pharmacist->surname); ?> (ID: <?php echo e($pharmacist->id); ?>)</p>
    </div>

    <div class="section">
        <h2 class="section-title">Key Metrics</h2>
        <table class="kpi-grid">
            <tr>
                <td>
                    <div class="kpi-label">Total Items Dispensed</div>
                    <div class="kpi-value"><?php echo e($totals['items']); ?></div>
                </td>
                <td>
                    <div class="kpi-label">Total Value (R)</div>
                    <div class="kpi-value"><?php echo e(number_format($totals['cost'], 2)); ?></div>
                </td>
                <td>
                    <div class="kpi-label">Unique Patients</div>
                    <div class="kpi-value"><?php echo e($totals['patients']); ?></div>
                </td>
                <td>
                    <div class="kpi-label">Unique Medications</div>
                    <div class="kpi-value"><?php echo e($totals['medications']); ?></div>
                </td>
            </tr>
        </table>
    </div>

    <?php if($groupedData->isEmpty()): ?>
        <div class="section">
            <div class="small muted" style="text-align:center; padding:24px 0;">No dispensed medications found for the selected period.</div>
        </div>
    <?php else: ?>
        <div class="section">
            <h2 class="section-title">Grouped Dispensed Items</h2>
            <?php $__currentLoopData = $groupedData; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $groupName => $items): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <div style="margin-bottom:16px; page-break-inside:avoid;">
                    <h3 style="margin:0 0 6px; font-size:12px; color:var(--accent);"><?php echo e($groupName); ?> <span class="muted" style="font-weight:400;">(<?php echo e($items->count()); ?> <?php echo e($items->count() === 1 ? 'item' : 'items'); ?>)</span></h3>
                    <table>
                        <thead>
                        <tr>
                            <th style="width:15%">Date</th>
                            <th style="width:22%">Medication</th>
                            <th style="width:7%">Qty</th>
                            <th style="width:20%">Patient</th>
                            <th style="width:18%">Doctor</th>
                            <th style="width:8%">Sch</th>
                            <th style="width:10%" class="text-right">Cost (R)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php $__currentLoopData = $items; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <tr>
                                <td class="small"><?php echo e($item->dispensed_at->format('Y-m-d')); ?><br><span class="muted"><?php echo e($item->dispensed_at->format('H:i')); ?></span></td>
                                <td><strong><?php echo e($item->medication->name ?? 'Unknown'); ?></strong></td>
                                <td class="text-right"><?php echo e($item->quantity_dispensed); ?></td>
                                <td class="small">
                                    <?php if($item->prescription && $item->prescription->user): ?>
                                        <?php echo e($item->prescription->user->name); ?> <?php echo e($item->prescription->user->surname); ?>

                                    <?php else: ?>
                                        Unknown Patient
                                    <?php endif; ?>
                                </td>
                                <td class="small">
                                    <?php if($item->prescription && $item->prescription->doctor): ?>
                                        <?php echo e($item->prescription->doctor->name); ?>

                                    <?php else: ?>
                                        Unknown Doctor
                                    <?php endif; ?>
                                </td>
                                <td class="small"><?php echo e($item->medication->schedule ? 'S' . $item->medication->schedule : 'N/A'); ?></td>
                                <td class="text-right"><?php echo e(number_format($item->cost, 2)); ?></td>
                            </tr>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                            <tr style="background:#f3f4f6; font-weight:600;">
                                <td colspan="6" class="text-right">Group Total Value</td>
                                <td class="text-right">R<?php echo e(number_format($items->sum('cost'), 2)); ?></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </div>
    <?php endif; ?>

    <div class="footer">
        Report generated <?php echo e($generatedAt); ?> &mdash; iBhayi e-Prescription System
    </div>
</body>
</html>
<?php /**PATH C:\Users\27671\Desktop\Projects\Laravel\GRP-04-16\eprescription\resources\views/pdf/pharmacist/dispensed-report.blade.php ENDPATH**/ ?>