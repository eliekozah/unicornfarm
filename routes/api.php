<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ForgotController;
use App\Http\Controllers\UnicornController;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});




Route::get('/', [UnicornController::class, 'get']);
Route::delete('/{id}', [UnicornController::class, 'delete']);
Route::put('/{id}', [UnicornController::class, 'put']);
Route::post('/', [UnicornController::class, 'post']);

Route::post('login', [AuthController::class, 'login']);

Route::get('user', [AuthController::class, 'user'])->middleware('auth:api');;
Route::post('/register', [AuthController::class, 'register']);
Route::post('forgot', [ForgotController::class, 'forgot']);
Route::post('reset', [ForgotController::class, 'reset']);
