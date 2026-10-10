<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Destination;
use App\Models\User;
use Illuminate\Support\Carbon;

class AdminController extends Controller
{
    /** High-level KPI cards for the top of the dashboard. */
    public function kpis()
    {
        $totalUsers = User::count();
        $activeBookings = Booking::whereIn('status', ['pending', 'confirmed'])->count();
        $revenue = Booking::where('status', '!=', 'cancelled')->sum('amount');
        $destinations = Destination::count();

        return response()->json([
            'total_users' => $totalUsers,
            'active_bookings' => $activeBookings,
            'revenue_ytd' => $revenue,
            'destinations' => $destinations,
        ]);
    }

    /** Monthly visitor proxy (new users per month) and revenue for the last 12 months. */
    public function monthlyStats()
    {
        $months = collect(range(0, 11))->map(fn ($i) => Carbon::now()->subMonths(11 - $i));

        $stats = $months->map(function (Carbon $month) {
            $start = $month->copy()->startOfMonth();
            $end = $month->copy()->endOfMonth();

            return [
                'month' => $month->format('M'),
                'visitors' => User::whereBetween('created_at', [$start, $end])->count(),
                'revenue' => (float) Booking::whereBetween('created_at', [$start, $end])
                    ->where('status', '!=', 'cancelled')
                    ->sum('amount'),
            ];
        });

        return response()->json($stats->values());
    }

    /** Top destinations ranked by rating × review_count as a simple popularity proxy. */
    public function topDestinations()
    {
        $destinations = Destination::orderByDesc('review_count')->take(10)->get(['name_en', 'review_count']);

        return response()->json(
            $destinations->map(fn ($d) => ['name' => $d->name_en, 'visits' => $d->review_count])
        );
    }

    /** Visitor nationality breakdown from registered users. */
    public function nationalities()
    {
        $total = User::count();
        if ($total === 0) {
            return response()->json([]);
        }

        $breakdown = User::all()
            ->groupBy('nationality')
            ->map(fn ($group, $name) => [
                'name' => $name ?: 'Unknown',
                'value' => round($group->count() / $total * 100),
            ])
            ->values()
            ->sortByDesc('value')
            ->values();

        return response()->json($breakdown);
    }

    public function recentBookings()
    {
        return response()->json(
            Booking::with('user')->orderByDesc('created_at')->take(5)->get()
        );
    }
}
