<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::create(['name' => 'Quản lý users']);
        Permission::create(['name' => 'Quản lý roles']);

        // // create roles and assign existing permissions
        // $role1 = Role::create(['name' => 'writer']);
        // $role1->givePermissionTo('edit articles');
        // $role1->givePermissionTo('delete articles');

        // $role2 = Role::create(['name' => 'admin']);
        // $role2->givePermissionTo('publish articles');
        // $role2->givePermissionTo('unpublish articles');

        // $role3 = Role::create(['name' => 'super-admin']);
        // // gets all permissions via Gate::before rule; see AuthServiceProvider

        // // create demo users
        // $user = Factory(App\User::class)->create([
        // 'name' => 'Example User',
        // 'email' => 'testsss@example.com',
        // 'fullName'=>'d',
        // 'id_user'=>1,
        // 'password'=>'1'
        // ]);
        // $user->assignRole($role1);

        // $user = Factory(App\User::class)->create([
        // 'name' => 'Example Admin User',
        // 'email' => 'admin@example.com',
        // 'fullName'=>'d',
        // 'id_user'=>1,
        // 'password'=>'1'
        // ]);
        // $user->assignRole($role2);

        // $user = Factory(App\User::class)->create([
        // 'name' => 'Example Super-Admin User',
        // 'email' => 'superadmin@example.com',
        // 'fullName'=>'d',
        // 'id_user'=>1,
        // 'password'=>'1'
        // ]);
        // $user->assignRole($role3);
    }
}
