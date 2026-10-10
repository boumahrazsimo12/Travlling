<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Hotel extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'hotels';

    protected $fillable = [
        'destination_id', 'name', 'address', 'cover_image',
        'rating', 'price_per_night', 'amenities', 'is_wc2030_partner',
    ];

    protected $casts = [
        'rating' => 'float',
        'price_per_night' => 'float',
        'amenities' => 'array',
        'is_wc2030_partner' => 'boolean',
    ];

    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }
}
