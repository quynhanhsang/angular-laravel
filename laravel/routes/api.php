<?php

use App\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Route as RoutingRoute;
use Illuminate\Routing\RouteGroup;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return Auth::user();
});

Route::get('users', function(){
    return User::all();
});

Route::group(['namespace'=>'Api\Auth'], function(){
    Route::post('/login', 'AuthenticationController@login');
    Route::post('/logout', 'AuthenticationController@logout')->middleware('auth:api');
    Route::post('/register', 'RegisterController@register');
    Route::post('/forgot', 'ForgotPasswordController@forgot');
    Route::post('/reset', 'ForgotPasswordController@reset');
});

Route::group(['namespace'=>'Api\User'], function(){
    Route::post('/users/search', 'UserController@search');
    Route::post('/users/add', 'UserController@add');
    Route::get('/users/profile/{id}', 'ProfileController@getById')->middleware('auth:api');
    Route::post('/users/edit', 'ProfileController@edit')->middleware('auth:api');
    // Route::post('/register', 'RegisterController@register');
    // Route::post('/forgot', 'ForgotPasswordController@forgot');
    // Route::post('/reset', 'ForgotPasswordController@reset');
});
