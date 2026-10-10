<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Destination extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'destinations';

    protected $fillable = [
        'name_en', 'name_fr', 'name_ar',
        'slug', 'type', 'region',
        'latitude', 'longitude',
        'description_en', 'description_fr', 'description_ar',
        'cover_image', 'best_season',
        'avg_crowd_level', 'safety_score', 'sustainability_score',
        'hidden_gem', 'wc2030_venue',
        'rating', 'review_count',
    ];

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'avg_crowd_level' => 'integer',
        'safety_score' => 'integer',
        'sustainability_score' => 'integer',
        'hidden_gem' => 'boolean',
        'wc2030_venue' => 'boolean',
        'rating' => 'float',
        'review_count' => 'integer',
    ];

    public function hotels()
    {
        return $this->hasMany(Hotel::class);
    }

    public function experiences()
    {
        return $this->hasMany(Experience::class);
    }

    public function restaurants()
    {
        return $this->hasMany(Restaurant::class);
    }
}
