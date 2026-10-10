<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    public function index(Request $request)
    {
        $query = Restaurant::query();

        if ($request->filled('destination_id')) {
            $query->where('destination_id', $request->destination_id);
        }

        return response()->json($query->get());
    }

    public function show(string $id)
    {
        return response()->json(Restaurant::findOrFail($id));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'destination_id' => 'required',
            'name' => 'required|string',
            'cuisine_type' => 'required|string',
            'cover_image' => 'required|url',
            'avg_price' => 'required|numeric',
            'price_range' => 'required|in:$,$$,$$$',
        ]);

        return response()->json(Restaurant::create($data + ['rating' => 0]), 201);
    }

    public function update(Request $request, string $id)
    {
        $restaurant = Restaurant::findOrFail($id);
        $restaurant->update($request->all());

        return response()->json($restaurant);
    }

    public function destroy(string $id)
    {
        Restaurant::findOrFail($id)->delete();

        return response()->json(['message' => 'Restaurant deleted.']);
    }
}
