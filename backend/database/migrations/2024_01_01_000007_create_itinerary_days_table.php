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
        Schema::create('itinerary_days', function (Blueprint $table) {
            $table->id();
            $table->foreignId('itinerary_id')->constrained('itineraries')->cascadeOnDelete();
            $table->integer('day_number');
            $table->date('date')->nullable();
            $table->foreignId('destination_id')->nullable()->constrained('destinations');
            $table->json('morning_activities')->nullable();
            $table->json('afternoon_activities')->nullable();
            $table->json('evening_activities')->nullable();
            $table->foreignId('hotel_id')->nullable()->constrained('hotels');
            $table->json('restaurant_ids')->nullable();
            $table->json('transport_info')->nullable();
            $table->decimal('estimated_cost', 10, 2)->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['itinerary_id', 'day_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('itinerary_days');
    }
};
