<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AIPlannerService;
use Illuminate\Http\Request;
use RuntimeException;

class AIPlannerController extends Controller
{
    public function __construct(protected AIPlannerService $planner)
    {
    }

    public function generate(Request $request)
    {
        $data = $request->validate([
            'destination' => 'nullable|string|max:120',
            'days' => 'required|integer|min:1|max:21',
            'budget' => 'required|numeric|min:100',
            'travel_style' => 'required|in:solo,couple,family,friends',
            'interests' => 'array',
            'interests.*' => 'string',
        ]);

        try {
            $itinerary = $this->planner->generate($data);

            return response()->json($itinerary);
        } catch (RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], 502);
        }
    }
}
