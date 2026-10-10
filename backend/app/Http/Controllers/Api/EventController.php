<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $query = Event::query();

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        return response()->json($query->orderBy('start_date')->get());
    }

    public function show(string $id)
    {
        return response()->json(Event::findOrFail($id));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'cover_image' => 'required|url',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'location' => 'required|string',
            'category' => 'required|string',
        ]);

        return response()->json(Event::create($data), 201);
    }

    public function update(Request $request, string $id)
    {
        $event = Event::findOrFail($id);
        $event->update($request->all());

        return response()->json($event);
    }

    public function destroy(string $id)
    {
        Event::findOrFail($id)->delete();

        return response()->json(['message' => 'Event deleted.']);
    }
}
