<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Badge extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'badges';

    protected $fillable = [
        'name', 'description', 'icon', 'points_required',
    ];

    protected $casts = [
        'points_required' => 'integer',
    ];
}
