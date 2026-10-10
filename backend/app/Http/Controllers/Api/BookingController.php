<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            Booking::where('user_id', $request->user()->id)->orderByDesc('created_at')->get()
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'bookable_type' => 'required|in:hotel,experience',
            'bookable_id' => 'required',
            'item_label' => 'required|string',
            'amount' => 'required|numeric',
        ]);

        $booking = Booking::create($data + [
            'user_id' => $request->user()->id,
            'status' => 'confirmed',
        ]);

        return response()->json($booking, 201);
    }

    /** All bookings across users — used by the admin dashboard. */
    public function all(Request $request)
    {
        return response()->json(
            Booking::orderByDesc('created_at')->take((int) $request->get('limit', 20))->get()
        );
    }
}
