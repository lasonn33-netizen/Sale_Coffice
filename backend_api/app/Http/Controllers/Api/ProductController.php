<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category')->when($request->search, fn ($q, $v) => $q->where(fn ($q) => $q->where('name', 'like', "%{$v}%")->orWhere('description', 'like', "%{$v}%")))->when($request->category_id, fn ($q, $v) => $q->where('category_id', $v))->when($request->boolean('available'), fn ($q) => $q->where('is_available', true));
        return $query->latest()->limit(min((int) $request->input('limit', 100), 1000))->get();
    }
    public function store(Request $request) { return response()->json(Product::create($request->validate(['category_id' => 'required|exists:categories,id', 'name' => 'required|string|max:150', 'description' => 'nullable|string', 'price' => 'required|numeric|min:0', 'image_url' => 'nullable|url|max:2048', 'is_available' => 'boolean'])), 201); }
    public function show(Product $product) { return $product->load('category'); }
    public function update(Request $request, Product $product) { $product->update($request->validate(['category_id' => 'sometimes|exists:categories,id', 'name' => 'sometimes|string|max:150', 'description' => 'nullable|string', 'price' => 'sometimes|numeric|min:0', 'image_url' => 'nullable|url|max:2048', 'is_available' => 'boolean'])); return $product->fresh('category'); }
    public function destroy(Product $product) { abort_if($product->orderItems()->exists(), 422, 'Product has order history.'); $product->delete(); return response()->json(['message' => 'Product deleted.']); }
}
