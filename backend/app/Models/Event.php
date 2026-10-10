<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Event extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'events';

    protected $fillable = [
        'title', 'description', 'cover_image',
        'start_date', 'end_date', 'location', 'category',
    ];
}
