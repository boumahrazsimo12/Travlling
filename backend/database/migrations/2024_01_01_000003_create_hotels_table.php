<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('hotels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('destination_id')->nullable()->constrained('destinations')->nullOnDelete();
            $table->string('name', 200);
            $table->string('slug', 220)->unique();
            $table->tinyInteger('stars')->nullable();
            $table->enum('type', ['riad', 'hotel', 'hostel', 'apartment', 'luxury'])->default('hotel');
            $table->text('address')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->decimal('price_per_night', 10, 2)->nullable();
            $table->string('currency', 5)->default('MAD');
            $table->json('amenities')->nullable();
            $table->string('cover_image')->nullable();
            $table->json('gallery')->nullable();
            $table->decimal('rating', 3, 2)->default(0);
            $table->boolean('is_wc2030_partner')->default(false);
            $table->string('booking_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index('destination_id');
            $table->index('type');
            $table->index('price_per_night');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hotels');
    }
};
