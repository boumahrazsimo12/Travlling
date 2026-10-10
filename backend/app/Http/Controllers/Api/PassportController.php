<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Badge;
use App\Models\Destination;
use App\Models\PassportStamp;
use App\Models\UserBadge;
use Illuminate\Http\Request;

class PassportController extends Controller
{
    public function index(Request $request)
    {
        $stamps = PassportStamp::where('user_id', $request->user()->id)
            ->orderByDesc('visited_at')
            ->get();

        return response()->json([
            'stamps' => $stamps,
            'points' => $request->user()->gamification_points,
        ]);
    }

    /** Add a stamp for a visited destination, award points, and unlock badges as needed. */
    public function store(Request $request)
    {
        $data = $request->validate([
            'destination_id' => 'required',
            'note' => 'nullable|string|max:280',
        ]);

        $destination = Destination::findOrFail($data['destination_id']);
        $user = $request->user();

        $already = PassportStamp::where('user_id', $user->id)
            ->where('destination_id', $destination->id)
            ->exists();

        if ($already) {
            return response()->json(['message' => 'You already have a stamp for this destination.'], 409);
        }

        $stamp = PassportStamp::create([
            'user_id' => $user->id,
            'destination_id' => $destination->id,
            'destination_name' => $destination->name_en,
            'visited_at' => now()->toDateString(),
            'note' => $data['note'] ?? null,
        ]);

        $user->increment('gamification_points', 50);

        $this->checkBadgeUnlocks($user);

        return response()->json($stamp, 201);
    }

    /** Very simple rule engine: award the "Master Explorer" badge at 10 stamps. */
    protected function checkBadgeUnlocks($user): void
    {
        $stampCount = PassportStamp::where('user_id', $user->id)->count();

        if ($stampCount >= 10) {
            $masterBadge = Badge::where('name', 'Master Explorer')->first();

            if ($masterBadge) {
                UserBadge::firstOrCreate([
                    'user_id' => $user->id,
                    'badge_id' => $masterBadge->id,
                ], ['earned_at' => now()]);
            }
        }
    }
}
