<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use Illuminate\Http\Request;

class HotelController extends Controller
{
    public function index(Request $request)
    {
        $query = Hotel::query();

        if ($request->filled('destination_id')) {
            $query->where('destination_id', $request->destination_id);
        }

        if ($request->boolean('wc2030_only')) {
            $query->where('is_wc2030_partner', true);
        }

        return response()->json($query->get());
    }

    public function show(string $id)
    {
        return response()->json(Hotel::findOrFail($id));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'destination_id' => 'required',
            'name' => 'required|string',
            'address' => 'required|string',
            'cover_image' => 'required|url',
            'price_per_night' => 'required|numeric',
            'amenities' => 'array',
            'is_wc2030_partner' => 'boolean',
        ]);

        return response()->json(Hotel::create($data + ['rating' => 0]), 201);
    }

    public function update(Request $request, string $id)
    {
        $hotel = Hotel::findOrFail($id);
        $hotel->update($request->all());

        return response()->json($hotel);
    }

    public function destroy(string $id)
    {
        Hotel::findOrFail($id)->delete();

        return response()->json(['message' => 'Hotel deleted.']);
    }
}
