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
        Schema::create('restaurants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('destination_id')->nullable()->constrained('destinations')->nullOnDelete();
            $table->string('name', 200);
            $table->string('cuisine_type', 100)->nullable();
            $table->text('address')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->enum('price_range', ['budget', 'mid', 'upscale', 'luxury'])->nullable();
            $table->decimal('avg_price', 8, 2)->nullable();
            $table->decimal('rating', 3, 2)->default(0);
            $table->string('cover_image')->nullable();
            $table->json('opening_hours')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index('destination_id');
            $table->index('cuisine_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restaurants');
    }
};
