<?php

namespace App\Http\Controllers;

use App\Models\StockOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;

class OrderActionController extends Controller
{
    /**
     * Supplier approves order: update status to Received and increment stock quantities.
     */
    public function approve(Request $request, StockOrder $order)
    {
        if (! $request->hasValidSignature()) {
            abort(401, 'Invalid or expired approval link.');
        }

        if (in_array($order->status, ['Received', 'Declined'])) {
            return view('orders.action-result', [
                'order' => $order,
                'message' => 'No action taken. Order already marked as '.$order->status.'.',
            ]);
        }

        $order->load('items.medication');

        DB::transaction(function () use ($order) {
            foreach ($order->items as $item) {
                $medication = $item->medication;
                if ($medication) {
                    $medication->quantity_on_hand += $item->quantity;
                    $medication->save();
                }
            }
            $order->status = 'Received';
            $order->received_at = now();
            $order->save();
        });

        return view('orders.action-result', [
            'order' => $order,
            'message' => 'Order approved and stock updated successfully.',
        ]);
    }

    /**
     * Supplier declines order: mark declined (no stock changes).
     */
    public function decline(Request $request, StockOrder $order)
    {
        if (! $request->hasValidSignature()) {
            abort(401, 'Invalid or expired decline link.');
        }

        if (in_array($order->status, ['Received', 'Declined'])) {
            return view('orders.action-result', [
                'order' => $order,
                'message' => 'No action taken. Order already marked as '.$order->status.'.',
            ]);
        }

        $order->status = 'Declined';
        $order->save();

        return view('orders.action-result', [
            'order' => $order,
            'message' => 'Order has been declined. We will review and follow up.',
        ]);
    }
}
