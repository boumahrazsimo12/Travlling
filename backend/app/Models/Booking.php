<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Booking extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'bookings';

    protected $fillable = [
        'user_id',
        'bookable_type',   // hotel | experience
        'bookable_id',
        'item_label',
        'amount',
        'status',          // pending | confirmed | completed | cancelled
    ];

    protected $casts = [
        'amount' => 'float',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
