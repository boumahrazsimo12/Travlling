<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Stadium extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'stadiums';

    protected $fillable = [
        'name', 'city', 'capacity', 'latitude', 'longitude',
        'description', 'cover_image',
    ];

    protected $casts = [
        'capacity' => 'integer',
        'latitude' => 'float',
        'longitude' => 'float',
    ];
}
