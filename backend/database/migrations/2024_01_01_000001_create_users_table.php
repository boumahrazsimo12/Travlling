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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('email', 150)->unique();
            $table->string('password');
            $table->enum('role', ['admin', 'tourist', 'guide', 'artisan'])->default('tourist');
            $table->string('avatar')->nullable();
            $table->string('nationality', 80)->nullable();
            $table->string('preferred_language', 10)->default('en');
            $table->text('bio')->nullable();
            $table->string('phone', 20)->nullable();
            $table->integer('sustainability_score')->default(0);
            $table->integer('gamification_points')->default(0);
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
