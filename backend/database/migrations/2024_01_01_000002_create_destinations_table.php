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
        Schema::create('destinations', function (Blueprint $table) {
            $table->id();
            $table->string('name_en', 200);
            $table->string('name_fr', 200)->nullable();
            $table->string('name_ar', 200)->nullable();
            $table->string('slug', 220)->unique();
            $table->enum('type', ['city', 'monument', 'beach', 'mountain', 'desert', 'village', 'museum', 'market']);
            $table->string('region', 100)->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->text('description_en')->nullable();
            $table->text('description_fr')->nullable();
            $table->text('description_ar')->nullable();
            $table->string('cover_image')->nullable();
            $table->json('gallery')->nullable();
            $table->string('virtual_tour_url')->nullable();
            $table->string('best_season', 50)->nullable();
            $table->tinyInteger('avg_crowd_level')->default(5);
            $table->tinyInteger('safety_score')->default(8);
            $table->tinyInteger('sustainability_score')->default(5);
            $table->boolean('hidden_gem')->default(false);
            $table->boolean('wc2030_venue')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['type', 'region']);
            $table->index('hidden_gem');
            $table->index('wc2030_venue');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('destinations');
    }
};
