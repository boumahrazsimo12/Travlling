<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            Favorite::where('user_id', $request->user()->id)->pluck('destination_id')
        );
    }

    public function toggle(Request $request)
    {
        $data = $request->validate(['destination_id' => 'required']);

        $existing = Favorite::where('user_id', $request->user()->id)
            ->where('destination_id', $data['destination_id'])
            ->first();

        if ($existing) {
            $existing->delete();

            return response()->json(['favorited' => false]);
        }

        Favorite::create([
            'user_id' => $request->user()->id,
            'destination_id' => $data['destination_id'],
        ]);

        return response()->json(['favorited' => true]);
    }
}
