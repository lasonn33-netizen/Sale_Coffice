<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with(['user', 'items.product', 'payments'])->when($request->status, fn ($q, $v) => $q->where('status', $v));
        if ($request->user()->role === 'customer') $query->where('user_id', $request->user()->id);
        return $query->latest()->limit(min((int) $request->input('limit', 100), 1000))->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate(['order_type' => 'required|in:dine_in,takeaway,delivery,grab', 'table_number' => 'nullable|integer|min:1', 'channel' => 'nullable|string|max:40', 'items' => 'required|array|min:1', 'items.*.product_id' => 'required|exists:products,id', 'items.*.quantity' => 'required|integer|min:1|max:100']);
        $order = DB::transaction(function () use ($data, $request) {
            $products = Product::whereIn('id', collect($data['items'])->pluck('product_id'))->where('is_available', true)->get()->keyBy('id');
            abort_if($products->count() !== collect($data['items'])->unique('product_id')->count(), 422, 'One or more products are unavailable.');
            $order = Order::create(['order_number' => 'CF-'.now()->format('YmdHis').'-'.random_int(100, 999), 'user_id' => $request->user()->id, 'order_type' => $data['order_type'], 'table_number' => $data['table_number'] ?? null, 'channel' => $data['channel'] ?? ($data['order_type'] === 'grab' ? 'grab' : 'store'), 'status' => 'pending', 'total_amount' => 0]);
            $total = 0;
            foreach ($data['items'] as $item) {
                $product = $products[$item['product_id']]; $subtotal = $product->price * $item['quantity']; $total += $subtotal;
                $order->items()->create(['product_id' => $product->id, 'quantity' => $item['quantity'], 'unit_price' => $product->price, 'subtotal' => $subtotal]);
            }
            $order->update(['total_amount' => $total]);
            return $order;
        });
        return response()->json($order->load(['items.product', 'user']), 201);
    }

    public function show(Request $request, Order $order) { abort_unless($request->user()->role !== 'customer' || $order->user_id === $request->user()->id, 403); return $order->load(['items.product', 'user', 'payments']); }
    public function updateStatus(Request $request, Order $order) { $status = $request->validate(['status' => 'required|in:pending,paid,cancelled'])['status']; $order->update(['status' => $status]); return $order->fresh(['items.product', 'user', 'payments']); }
    public function destroy(Order $order) { $order->delete(); return response()->json(['message' => 'Order deleted.']); }
}
