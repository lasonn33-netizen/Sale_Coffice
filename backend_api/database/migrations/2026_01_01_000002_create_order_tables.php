<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('orders', function (Blueprint $table) { $table->id(); $table->string('order_number')->unique(); $table->foreignId('user_id')->constrained()->restrictOnDelete(); $table->enum('order_type', ['dine_in', 'takeaway', 'delivery', 'grab']); $table->unsignedInteger('table_number')->nullable(); $table->string('channel')->default('store'); $table->enum('status', ['pending', 'paid', 'cancelled'])->default('pending'); $table->decimal('total_amount', 10, 2)->default(0); $table->timestamps(); });
        Schema::create('order_items', function (Blueprint $table) { $table->id(); $table->foreignId('order_id')->constrained()->cascadeOnDelete(); $table->foreignId('product_id')->constrained()->restrictOnDelete(); $table->unsignedInteger('quantity'); $table->decimal('unit_price', 10, 2); $table->decimal('subtotal', 10, 2); });
        Schema::create('payments', function (Blueprint $table) { $table->id(); $table->foreignId('order_id')->constrained()->cascadeOnDelete(); $table->decimal('amount', 10, 2); $table->enum('payment_method', ['cash', 'card', 'online']); $table->string('status')->default('completed'); $table->timestamp('paid_at')->nullable(); $table->timestamps(); });
    }
    public function down(): void { Schema::dropIfExists('payments'); Schema::dropIfExists('order_items'); Schema::dropIfExists('orders'); }
};
