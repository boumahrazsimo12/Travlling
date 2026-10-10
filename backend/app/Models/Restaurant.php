<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Restaurant extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'restaurants';

    protected $fillable = [
        'destination_id', 'name', 'cuisine_type',
        'cover_image', 'rating', 'avg_price', 'price_range',
    ];

    protected $casts = [
        'rating' => 'float',
        'avg_price' => 'float',
    ];

    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }
}
