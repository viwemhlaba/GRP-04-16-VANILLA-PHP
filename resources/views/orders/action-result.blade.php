<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Order Action</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
        body { font-family: system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif; background:#f5f7fa; margin:0; padding:40px; }
        .card { max-width:520px; margin:0 auto; background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:32px; box-shadow:0 4px 12px -2px rgba(0,0,0,.06); }
        h1 { font-size:20px; margin:0 0 12px; color:#1e293b; }
        p { line-height:1.5; color:#475569; }
        .meta { background:#f1f5f9; border:1px solid #e2e8f0; padding:12px 16px; border-radius:6px; font-size:14px; margin:16px 0; }
        .status { display:inline-block; padding:4px 10px; border-radius:16px; font-size:12px; font-weight:600; background:#e0f2fe; color:#0369a1; }
        .footer { margin-top:24px; font-size:12px; color:#64748b; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Stock Order Update</h1>
        <p>{{ $message }}</p>
        <div class="meta">
            <div><strong>Order #:</strong> {{ $order->order_number }}</div>
            <div><strong>Status:</strong> <span class="status">{{ $order->status }}</span></div>
            <div><strong>Items:</strong> {{ $order->items->sum('quantity') }} units</div>
        </div>
        <p>If you have questions please reply to this email.</p>
        <div class="footer">&copy; {{ date('Y') }} {{ config('app.name') }}</div>
    </div>
</body>
</html>
