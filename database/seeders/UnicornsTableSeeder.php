<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UnicornsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Unicorn::factory(5)->create();
    }
}
