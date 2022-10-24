<?php

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ScansController;
use Illuminate\Support\Facades\Route;

/*
 |--------------------------------------------------------------------------
 | Web Routes
 |--------------------------------------------------------------------------
 |
 | Here is where you can register web routes for your application. These
 | routes are loaded by the RouteServiceProvider within a group which
 | contains the "web" middleware group. Now create something great!
 |
 */

Route::get('/', function () {
    return view('welcome');
});

// updates (PUT)
Route::put('/scan/{id}', [ScansController::class , 'update'])->name('scan.update');

// edits (PATCH)
Route::patch('/scan/{id}', [ScansController::class , 'edit'])->name('scan.edit');


Route::get('/', [LoginController::class, 'loginPage'])->name('loginPage');

Route::post('/autenticar', [LoginController::class, 'autenticar'])->name('autenticar');

Route::get('/logout', [LoginController::class, 'logout'])->name('logout');

Route::get('/dashboard', [LoginController::class, 'dashboardPage'])->name('dashboardPage');

Route::resource('categoria', CategoriaController::class);

Route::get('index', [LoginController::class, 'index'])->name('index');


