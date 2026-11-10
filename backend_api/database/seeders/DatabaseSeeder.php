<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::updateOrCreate(['username' => 'admin'], ['email' => 'admin@coffice.local', 'full_name' => 'Coffice Admin', 'password' => Hash::make('password'), 'role' => 'admin', 'is_active' => true]);
        $category = Category::firstOrCreate(['name' => 'Coffee'], ['description' => 'Freshly prepared coffee']);
        Product::firstOrCreate(['name' => 'Coffice Latte'], ['category_id' => $category->id, 'description' => 'Smooth espresso with steamed milk', 'price' => 3.50, 'is_available' => true]);
        Product::firstOrCreate(['name' => 'Americano'], ['category_id' => $category->id, 'description' => 'Espresso with hot water', 'price' => 2.50, 'is_available' => true]);
    }
}
