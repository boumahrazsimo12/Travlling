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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->string('bookable_type', 100);
            $table->unsignedBigInteger('bookable_id');
            $table->date('booking_date')->nullable();
            $table->integer('participants')->default(1);
            $table->decimal('total_price', 10, 2)->nullable();
            $table->string('currency', 5)->default('MAD');
            $table->enum('status', ['pending', 'confirmed', 'cancelled', 'completed'])->default('pending');
            $table->enum('payment_status', ['unpaid', 'paid', 'refunded'])->default('unpaid');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['bookable_type', 'bookable_id']);
            $table->index('user_id');
            $table->index('status');
            $table->index('booking_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
