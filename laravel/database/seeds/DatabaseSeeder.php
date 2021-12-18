<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
//        $this->call(UserTableSeeder::class);
        $this->call(PermissionsTableSeeder::class);

        // DB::table('permission')->insert([
        //     'permission_name' => 'Hệ thống',
        //     'permission_key' => 'page.hethong',
        //     'parent_id' =>0,
        //     'role_id'=>0
        // ]);
        // DB::table('permission')->insert([
        //     'permission_name' => 'Quản lý người dùng',
        //     'permission_key' => 'page.hethong.users',
        //     'parent_id' =>1,
        //     'role_id'=>0
        // ]);
        // DB::table('permission')->insert([
        //     'permission_name' => 'Roles',
        //     'permission_key' => 'page.hethong.role',
        //     'parent_id' =>1,
        //     'role_id'=>0
        // ]);
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
