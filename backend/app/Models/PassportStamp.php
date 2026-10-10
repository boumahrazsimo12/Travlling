<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class PassportStamp extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'passport_stamps';

    protected $fillable = [
        'user_id', 'destination_id', 'destination_name', 'visited_at', 'note',
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
