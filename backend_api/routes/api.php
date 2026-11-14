<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('auth/register', [AuthController::class, 'register']);
    Route::post('auth/login', [AuthController::class, 'login']);
    Route::get('products', [ProductController::class, 'index']);
    Route::get('products/{product}', [ProductController::class, 'show']);
    Route::get('categories', [CategoryController::class, 'index']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('users/me', fn (Illuminate\Http\Request $request) => $request->user());
        Route::post('auth/logout', [AuthController::class, 'logout']);
        Route::post('orders', [OrderController::class, 'store']);
        Route::get('orders', [OrderController::class, 'index'])
            ->middleware('permission:orders.view');
        Route::get('orders/{order}', [OrderController::class, 'show'])
            ->middleware('permission:orders.view');
        Route::post('payments/orders/{order}/payments', [PaymentController::class, 'store']);

        Route::get('users/permissions', [UserController::class, 'permissions'])
            ->middleware('permission:users.view');
        Route::apiResource('products', ProductController::class)->except(['index', 'show'])
            ->middleware('permission:products.manage');
        Route::apiResource('categories', CategoryController::class)->except(['index'])
            ->middleware('permission:categories.manage');
        Route::get('users', [UserController::class, 'index'])
            ->middleware('permission:users.view');
        Route::get('users/{user}', [UserController::class, 'show'])
            ->middleware('permission:users.view');
        Route::apiResource('users', UserController::class)->except(['index', 'show', 'create', 'edit'])
            ->middleware('permission:users.manage');
        Route::patch('orders/{order}/status', [OrderController::class, 'updateStatus'])
            ->middleware('permission:orders.manage');
        Route::delete('orders/{order}', [OrderController::class, 'destroy'])
            ->middleware('permission:orders.manage');
    });
});
