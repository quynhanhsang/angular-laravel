<?php

use App\User;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::create([
            'name' => 'main',
            'email' => 'a@a.com',
            'password' => bcrypt('a'),
            'fullName'=>'fullName'
        ]);

        //$users = factory(User::class, 5)->create();
    }
}
