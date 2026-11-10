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
        Route::get('orders', [OrderController::class, 'index']);
        Route::get('orders/{order}', [OrderController::class, 'show']);
        Route::post('payments/orders/{order}/payments', [PaymentController::class, 'store']);

        Route::middleware('admin')->group(function () {
            Route::apiResource('products', ProductController::class)->except(['index', 'show']);
            Route::apiResource('categories', CategoryController::class)->except(['index']);
            Route::apiResource('users', UserController::class)->except(['create', 'edit']);
            Route::patch('orders/{order}/status', [OrderController::class, 'updateStatus']);
            Route::delete('orders/{order}', [OrderController::class, 'destroy']);
        });
    });
});
