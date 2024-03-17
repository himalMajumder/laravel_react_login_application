<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/login', [App\Http\Controllers\Api\AuthController::class, 'loginUser'])->name('loginUser');
Route::post('/register', [App\Http\Controllers\Api\AuthController::class, 'registerUser'])->name('registerUser');


Route::group(['middleware' => ['auth:sanctum']], function() {
    Route::get('/home', [App\Http\Controllers\Api\DashboardController::class, 'index']);
    Route::post('/user', [App\Http\Controllers\Api\DashboardController::class, 'user']);
    Route::post('/logout', [App\Http\Controllers\Api\AuthController::class, 'logoutUser'])->name('logoutUser');
});
