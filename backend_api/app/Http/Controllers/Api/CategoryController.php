<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index() { return Category::withCount('products')->orderBy('name')->get(); }
    public function store(Request $request) { return response()->json(Category::create($request->validate(['name' => 'required|string|max:100|unique:categories', 'description' => 'nullable|string'])), 201); }
    public function update(Request $request, Category $category) { $category->update($request->validate(['name' => 'required|string|max:100|unique:categories,name,'.$category->id, 'description' => 'nullable|string'])); return $category; }
    public function destroy(Category $category) { abort_if($category->products()->exists(), 422, 'Category has products.'); $category->delete(); return response()->json(['message' => 'Category deleted.']); }
}
