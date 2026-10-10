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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->string('reviewable_type', 100);
            $table->unsignedBigInteger('reviewable_id');
            $table->tinyInteger('rating');
            $table->string('title', 255)->nullable();
            $table->text('body')->nullable();
            $table->json('photos')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->timestamps();

            $table->index(['reviewable_type', 'reviewable_id']);
            $table->index('user_id');
            $table->index('rating');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
