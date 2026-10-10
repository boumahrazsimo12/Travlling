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
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('host_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('destination_id')->nullable()->constrained('destinations')->nullOnDelete();
            $table->string('title', 255);
            $table->enum('type', ['cooking', 'workshop', 'tour', 'cultural', 'adventure', 'sport']);
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->string('currency', 5)->default('MAD');
            $table->decimal('duration_hours', 4, 1)->nullable();
            $table->integer('max_participants')->default(10);
            $table->string('cover_image')->nullable();
            $table->json('gallery')->nullable();
            $table->json('languages')->nullable();
            $table->decimal('rating', 3, 2)->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index('host_id');
            $table->index('destination_id');
            $table->index('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
