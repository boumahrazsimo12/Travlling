<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use App\Models\Stadium;
use Illuminate\Http\Request;

class StadiumController extends Controller
{
    public function index()
    {
        return response()->json(Stadium::all());
    }

    public function partnerHotels()
    {
        return response()->json(Hotel::where('is_wc2030_partner', true)->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'city' => 'required|string',
            'capacity' => 'required|integer',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'description' => 'required|string',
            'cover_image' => 'required|url',
        ]);

        return response()->json(Stadium::create($data), 201);
    }
}
