<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    protected $table = 'permission';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'permission_name', 'permission_key', 'parent_id', 'role_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
    ];

    // public function creating(Product $product)
    // {
    //     $product->id_user = Auth::id();
    // }
}
