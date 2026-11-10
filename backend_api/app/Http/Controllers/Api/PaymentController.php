<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function store(Request $request, Order $order)
    {
        abort_unless($request->user()->role !== 'customer' || $order->user_id === $request->user()->id, 403);
        $data = $request->validate(['amount' => 'required|numeric|min:0', 'payment_method' => 'required|in:cash,card,online']);
        abort_if((float) $data['amount'] !== (float) $order->total_amount, 422, 'Payment amount must equal order total.');
        return DB::transaction(function () use ($order, $data) {
            $payment = $order->payments()->create(['amount' => $data['amount'], 'payment_method' => $data['payment_method'], 'status' => 'completed', 'paid_at' => now()]);
            $order->update(['status' => 'paid']);
            return response()->json($payment->load('order'), 201);
        });
    }
}
