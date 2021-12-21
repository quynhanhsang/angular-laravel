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

Route::group(['namespace'=>'Api\Role'], function(){
    Route::post('roles/filter', 'RoleController@filter')->middleware('auth:api');
    Route::post('roles/add', 'RoleController@add')->middleware('auth:api');
    Route::post('/roles/edit', 'RoleController@edit')->middleware('auth:api');
    Route::get('/roles/getbyid/{id}', 'RoleController@getById')->middleware('auth:api');
    Route::get('/roles/delete/{id}', 'RoleController@delete')->middleware('auth:api');
    Route::post('/roles/deleterange', 'RoleController@deleterange')->middleware('auth:api');

});

Route::group(['namespace'=>'Api\Permission'], function(){
    Route::get('permission/getall', 'PermissionController@getAll');
});

Route::group(['namespace'=>'Api\User'], function(){
    Route::post('/users/filter', 'UserController@filter')->middleware('auth:api');
    Route::post('/users/add', 'UserController@add')->middleware('auth:api');
    Route::post('/users/edit', 'UserController@edit')->middleware('auth:api');
    Route::get('/users/getbyid/{id}', 'UserController@getById')->middleware('auth:api');
    Route::get('/users/delete/{id}', 'UserController@delete')->middleware('auth:api');
    Route::post('/users/deleterange', 'UserController@deleterange')->middleware('auth:api');

    Route::get('/users/profile/{id}', 'ProfileController@getById')->middleware('auth:api');
    //Route::post('/users/edit', 'ProfileController@edit')->middleware('auth:api');
    // Route::post('/register', 'RegisterController@register');
    // Route::post('/forgot', 'ForgotPasswordController@forgot');
    // Route::post('/reset', 'ForgotPasswordController@reset');
});
