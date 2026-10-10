<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Badge;
use App\Models\UserBadge;
use Illuminate\Http\Request;

class BadgeController extends Controller
{
    /** Returns all badges annotated with whether the current user earned each one. */
    public function index(Request $request)
    {
        $badges = Badge::all();
        $earnedIds = UserBadge::where('user_id', $request->user()->id)->pluck('badge_id')->all();

        $result = $badges->map(function ($badge) use ($earnedIds) {
            $badge->earned = in_array((string) $badge->id, array_map('strval', $earnedIds));

            return $badge;
        });

        return response()->json($result);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'icon' => 'required|string',
            'points_required' => 'required|integer',
        ]);

        return response()->json(Badge::create($data), 201);
    }
}
