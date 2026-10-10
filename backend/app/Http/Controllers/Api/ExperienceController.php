<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index(Request $request)
    {
        $query = Experience::query();

        if ($request->filled('type') && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        if ($request->filled('destination_id')) {
            $query->where('destination_id', $request->destination_id);
        }

        if ($request->filled('search')) {
            $q = $request->string('search');
            $query->where(function ($w) use ($q) {
                $w->where('title', 'like', "%{$q}%")
                    ->orWhere('host_name', 'like', "%{$q}%");
            });
        }

        return response()->json($query->get());
    }

    public function show(string $id)
    {
        return response()->json(Experience::findOrFail($id));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'destination_id' => 'required',
            'type' => 'required|string',
            'title' => 'required|string',
            'host_name' => 'required|string',
            'host_avatar' => 'required|url',
            'cover_image' => 'required|url',
            'price' => 'required|numeric',
            'duration_hours' => 'required|numeric',
        ]);

        return response()->json(Experience::create($data + ['rating' => 0, 'review_count' => 0]), 201);
    }

    public function update(Request $request, string $id)
    {
        $experience = Experience::findOrFail($id);
        $experience->update($request->all());

        return response()->json($experience);
    }

    public function destroy(string $id)
    {
        Experience::findOrFail($id)->delete();

        return response()->json(['message' => 'Experience deleted.']);
    }
}
