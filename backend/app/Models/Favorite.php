<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Favorite extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'favorites';

    protected $fillable = [
        'user_id', 'destination_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }
}
