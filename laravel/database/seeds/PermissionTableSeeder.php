<?php

use App\Permission;
use Illuminate\Database\Seeder;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('permission')->insert([
            'permission_name' => 'Hệ thống',
            'permission_key' => 'page.hethong',
            'parent_id' =>0,
            'role_id'=>0
        ]);

        // $permission = Permission::create([
        //     'permission_name' => 'Hệ thống',
        //     'permission_key' => 'page.hethong',
        //     'parent_id' =>'',
        //     'role_id'=>0
        // ]);

        // [
        //     'permission_name' => 'Quản lý người dùng',
        //     'permission_key' => 'page.hethong.users',
        //     'parent_id' =>1,
        // ],
        // [
        //     'permission_name' => 'Roles',
        //     'permission_key' => 'page.hethong.role',
        //     'parent_id' =>1,
        // ]
    }
}
