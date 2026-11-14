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
        $categories = [
            'Coffee' => 'Freshly prepared coffee',
            'Cold Brew' => 'Refreshing cold coffee drinks',
            'Tea & Specials' => 'Tea and signature drinks',
            'Bakery' => 'Freshly baked pastries',
        ];

        $categoryIds = [];
        foreach ($categories as $name => $description) {
            $categoryIds[$name] = Category::firstOrCreate(
                ['name' => $name],
                ['description' => $description]
            )->id;
        }

        $products = [
            ['Coffice Latte', 'Coffee', 'Smooth espresso with steamed milk', 3.50, 'hero-latte.png'],
            ['Americano', 'Coffee', 'Espresso with hot water', 2.50, 'hero-iced-coffee.png'],
            ['Cappuccino', 'Coffee', 'Rich espresso topped with silky foam', 3.25, 'hero-latte.png'],
            ['Mocha', 'Coffee', 'Espresso with chocolate and steamed milk', 3.75, 'hero-latte.png'],
            ['Vanilla Latte', 'Coffee', 'Classic latte with sweet vanilla', 3.75, 'hero-latte.png'],
            ['Caramel Macchiato', 'Coffee', 'Espresso layered with caramel and milk', 4.00, 'hero-latte.png'],
            ['Iced Coffee', 'Cold Brew', 'Chilled coffee served over ice', 2.75, 'hero-iced-coffee.png'],
            ['Cold Brew', 'Cold Brew', 'Slow-steeped coffee with a smooth finish', 3.25, 'hero-iced-coffee.png'],
            ['Iced Americano', 'Cold Brew', 'Bold espresso poured over ice and water', 2.75, 'hero-iced-coffee.png'],
            ['Matcha Latte', 'Tea & Specials', 'Creamy green tea with fresh milk', 3.50, 'hero-pour-over.png'],
            ['Chocolate Frappe', 'Tea & Specials', 'Blended chocolate coffee with cream', 4.25, 'hero-iced-coffee.png'],
            ['Butter Croissant', 'Bakery', 'Flaky, buttery pastry baked fresh daily', 2.25, 'hero-pour-over.png'],
        ];

        foreach ($products as [$name, $category, $description, $price, $image]) {
            Product::updateOrCreate(
                ['name' => $name],
                [
                    'category_id' => $categoryIds[$category],
                    'description' => $description,
                    'price' => $price,
                    'image_url' => "/images/{$image}",
                    'is_available' => true,
                ]
            );
        }
    }
}
