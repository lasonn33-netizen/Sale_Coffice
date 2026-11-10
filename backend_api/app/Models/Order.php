<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['order_number', 'user_id', 'order_type', 'table_number', 'status', 'total_amount', 'channel'];

    protected function casts(): array
    {
        return ['total_amount' => 'decimal:2', 'table_number' => 'integer'];
    }

    public function user() { return $this->belongsTo(User::class); }
    public function items() { return $this->hasMany(OrderItem::class); }
    public function payments() { return $this->hasMany(Payment::class); }
}
