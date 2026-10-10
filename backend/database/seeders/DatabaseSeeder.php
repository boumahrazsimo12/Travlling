<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            DestinationSeeder::class,
            HotelSeeder::class,
            ExperienceSeeder::class,
            RestaurantSeeder::class,
            EventSeeder::class,
            StadiumSeeder::class,
            BadgeSeeder::class,
            AdminUserSeeder::class,
        ]);
    }
}
