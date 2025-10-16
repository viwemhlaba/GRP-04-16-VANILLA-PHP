<x-mail::message>
# Stock Order Placed

A new stock order has been placed and is awaiting your confirmation.

**Order Details:**
- Order Number: {{ $stockOrder->order_number }}
- Order Date: {{ $stockOrder->created_at->format('F j, Y \a\t g:i A') }}
- Status: {{ $stockOrder->status }}

<x-mail::table>
| Medication | Quantity Ordered |
|:-----------|:-----------------|
@foreach($stockOrder->items as $item)
| {{ $item->medication->name ?? 'N/A' }} | {{ $item->quantity }} units |
@endforeach
</x-mail::table>

Please prepare the requested medications for delivery. Contact us if you have any questions regarding this order.

<x-mail::panel>
Please confirm the order:

<x-mail::button :url="$approveUrl" color="success">
Approve Order
</x-mail::button>

<x-mail::button :url="$declineUrl" color="error">
Decline Order
</x-mail::button>
</x-mail::panel>

Thank you for your continued partnership.

Best regards,<br>
{{ config('app.name') }} Pharmacy Management
</x-mail::message>
