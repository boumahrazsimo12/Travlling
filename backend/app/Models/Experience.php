<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Experience extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'experiences';

    protected $fillable = [
        'destination_id', 'type', 'title',
        'host_name', 'host_avatar', 'cover_image',
        'price', 'duration_hours', 'rating', 'review_count',
    ];

    protected $casts = [
        'price' => 'float',
        'duration_hours' => 'float',
        'rating' => 'float',
        'review_count' => 'integer',
    ];

    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }
}
