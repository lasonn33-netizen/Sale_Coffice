<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'name' => 'Coffice API',
        'status' => 'ok',
        'api' => '/api/v1',
    ]);
});
