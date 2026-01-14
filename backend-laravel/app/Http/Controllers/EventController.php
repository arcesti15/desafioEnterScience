<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function save(Request $request)
    {
        $validated = $request->validate([
            'event_name' => 'required|string|max:255',
            'artist'     => 'required|string|max:255',
            'price'      => 'required|numeric',
            'date'       => 'required|date',
            'address'    => 'required|string|max:255',
            'image'      => 'nullable|string'
        ]);

        $event = Event::create($validated);

        return response()->json($event, 201);
    }

    public function get()
    {
        $events = Event::orderBy('date', 'asc')->get();

        return response()->json($events, 200);
    }

    public function delete($id)
    {
        $event = Event::find($id);
        
        if(!$event) {
            return response() -> json([
                'message' => 'Event not found'
            ], 404);
        }

        $event -> delete();

        return response() -> json([
            'message' => 'Event deleted successfully'
        ], 200);
    }
}