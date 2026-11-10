<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('app:about', function () {
    $this->info('Coffice API');
})->purpose('Display application information');
