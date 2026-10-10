<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class UserBadge extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'user_badges';

    protected $fillable = [
        'user_id', 'badge_id', 'earned_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function badge()
    {
        return $this->belongsTo(Badge::class);
    }
}
