<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = ['username', 'email', 'full_name', 'password', 'role', 'is_active', 'permissions'];

    protected $hidden = ['password', 'remember_token'];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
            'permissions' => 'array',
        ];
    }

    public static function availablePermissions(): array
    {
        return [
            'products.view' => 'View products',
            'products.manage' => 'Create and edit products',
            'categories.view' => 'View categories',
            'categories.manage' => 'Create and edit categories',
            'orders.view' => 'View orders',
            'orders.manage' => 'Update and delete orders',
            'users.view' => 'View users',
            'users.manage' => 'Manage users and permissions',
        ];
    }

    public function hasPermission(string $permission): bool
    {
        return $this->role === 'admin'
            || in_array($permission, $this->permissions ?? [], true);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
