<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use MongoDB\Laravel\Eloquent\Model;

class User extends Model implements AuthenticatableContract
{
    use Authenticatable, HasApiTokens, Notifiable;

    protected $connection = 'mongodb';

    protected $collection = 'users';

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',           // tourist | host | admin
        'avatar',
        'nationality',
        'preferred_language',
        'gamification_points',
        'sustainability_score',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'gamification_points' => 'integer',
        'sustainability_score' => 'integer',
    ];

    public function passportStamps()
    {
        return $this->hasMany(PassportStamp::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }
}
