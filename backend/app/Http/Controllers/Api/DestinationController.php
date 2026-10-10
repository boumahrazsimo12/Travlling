<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use App\Models\Experience;
use App\Models\Hotel;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
    public function index(Request $request)
    {
        $query = Destination::query();

        if ($request->filled('search')) {
            $q = $request->string('search');
            $query->where(function ($w) use ($q) {
                $w->where('name_en', 'like', "%{$q}%")
                    ->orWhere('name_fr', 'like', "%{$q}%")
                    ->orWhere('region', 'like', "%{$q}%");
            });
        }

        if ($request->filled('type') && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        if ($request->filled('region') && $request->region !== 'all') {
            $query->where('region', $request->region);
        }

        if ($request->boolean('hidden_gems_only')) {
            $query->where('hidden_gem', true);
        }

        if ($request->boolean('wc2030_only')) {
            $query->where('wc2030_venue', true);
        }

        $sortBy = $request->get('sort_by', 'rating');
        match ($sortBy) {
            'crowd' => $query->orderBy('avg_crowd_level', 'asc'),
            'name' => $query->orderBy('name_en', 'asc'),
            default => $query->orderBy('rating', 'desc'),
        };

        return response()->json($query->get());
    }

    public function show(string $slug)
    {
        $destination = Destination::where('slug', $slug)->first();

        if (! $destination) {
            return response()->json(['message' => 'Destination not found.'], 404);
        }

        return response()->json([
            'destination' => $destination,
            'hotels' => Hotel::where('destination_id', $destination->id)->take(4)->get(),
            'experiences' => Experience::where('destination_id', $destination->id)->take(3)->get(),
            'restaurants' => Restaurant::where('destination_id', $destination->id)->take(4)->get(),
        ]);
    }

    public function regions()
    {
        return response()->json(Destination::distinct('region')->pluck('region'));
    }

    // ─── Admin-only mutations ────────────────────────────────────────
    public function store(Request $request)
    {
        $data = $request->validate([
            'name_en' => 'required|string',
            'name_fr' => 'required|string',
            'name_ar' => 'required|string',
            'slug' => 'required|string|unique:mongodb.destinations,slug',
            'type' => 'required|string',
            'region' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'description_en' => 'required|string',
            'description_fr' => 'required|string',
            'description_ar' => 'required|string',
            'cover_image' => 'required|url',
            'best_season' => 'required|string',
        ]);

        $destination = Destination::create($data + [
            'avg_crowd_level' => 5,
            'safety_score' => 8,
            'sustainability_score' => 7,
            'hidden_gem' => false,
            'wc2030_venue' => false,
            'rating' => 0,
            'review_count' => 0,
        ]);

        return response()->json($destination, 201);
    }

    public function update(Request $request, string $id)
    {
        $destination = Destination::findOrFail($id);
        $destination->update($request->all());

        return response()->json($destination);
    }

    public function destroy(string $id)
    {
        Destination::findOrFail($id)->delete();

        return response()->json(['message' => 'Destination deleted.']);
    }
}
