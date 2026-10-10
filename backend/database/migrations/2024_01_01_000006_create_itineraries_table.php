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
        Schema::create('itineraries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->cascadeOnDelete();
            $table->string('title', 255);
            $table->text('description')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->integer('total_days')->default(0);
            $table->decimal('budget', 10, 2)->nullable();
            $table->string('currency', 5)->default('MAD');
            $table->enum('travel_style', ['budget', 'comfort', 'luxury', 'adventure', 'cultural'])->default('comfort');
            $table->boolean('is_ai_generated')->default(false);
            $table->boolean('is_public')->default(false);
            $table->enum('status', ['draft', 'active', 'completed'])->default('draft');
            $table->text('ai_prompt')->nullable();
            $table->timestamps();

            $table->index('user_id');
            $table->index('status');
            $table->index('is_public');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('itineraries');
    }
};
