<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AIPlannerController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BadgeController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\DestinationController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\HotelController;
use App\Http\Controllers\Api\PassportController;
use App\Http\Controllers\Api\RestaurantController;
use App\Http\Controllers\Api\StadiumController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — VisitMaroc
|--------------------------------------------------------------------------
| All routes are prefixed with /api. Public routes serve the browsing
| experience (destinations, experiences, map, world cup). Auth routes
| require a valid Sanctum bearer token. Admin routes additionally
| require the `admin` middleware (role check).
*/

// ─── Auth ──────────────────────────────────────────────────────────────
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
});

// ─── Public read-only browsing ─────────────────────────────────────────
Route::get('/destinations', [DestinationController::class, 'index']);
Route::get('/destinations/regions', [DestinationController::class, 'regions']);
Route::get('/destinations/{slug}', [DestinationController::class, 'show']);

Route::get('/hotels', [HotelController::class, 'index']);
Route::get('/hotels/{id}', [HotelController::class, 'show']);

Route::get('/experiences', [ExperienceController::class, 'index']);
Route::get('/experiences/{id}', [ExperienceController::class, 'show']);

Route::get('/restaurants', [RestaurantController::class, 'index']);
Route::get('/restaurants/{id}', [RestaurantController::class, 'show']);

Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{id}', [EventController::class, 'show']);

Route::get('/stadiums', [StadiumController::class, 'index']);
Route::get('/stadiums/partner-hotels', [StadiumController::class, 'partnerHotels']);

// AI Planner is usable without an account, but rate-limited to protect the API key.
Route::middleware('throttle:20,1')->post('/planner/generate', [AIPlannerController::class, 'generate']);

// ─── Authenticated (tourist) routes ─────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/badges', [BadgeController::class, 'index']);

    Route::get('/passport', [PassportController::class, 'index']);
    Route::post('/passport/stamps', [PassportController::class, 'store']);

    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post('/favorites/toggle', [FavoriteController::class, 'toggle']);

    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
});

// ─── Admin-only routes ───────────────────────────────────────────────────
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/kpis', [AdminController::class, 'kpis']);
    Route::get('/monthly-stats', [AdminController::class, 'monthlyStats']);
    Route::get('/top-destinations', [AdminController::class, 'topDestinations']);
    Route::get('/nationalities', [AdminController::class, 'nationalities']);
    Route::get('/recent-bookings', [AdminController::class, 'recentBookings']);
    Route::get('/bookings', [BookingController::class, 'all']);

    Route::post('/destinations', [DestinationController::class, 'store']);
    Route::put('/destinations/{id}', [DestinationController::class, 'update']);
    Route::delete('/destinations/{id}', [DestinationController::class, 'destroy']);

    Route::post('/hotels', [HotelController::class, 'store']);
    Route::put('/hotels/{id}', [HotelController::class, 'update']);
    Route::delete('/hotels/{id}', [HotelController::class, 'destroy']);

    Route::post('/experiences', [ExperienceController::class, 'store']);
    Route::put('/experiences/{id}', [ExperienceController::class, 'update']);
    Route::delete('/experiences/{id}', [ExperienceController::class, 'destroy']);

    Route::post('/restaurants', [RestaurantController::class, 'store']);
    Route::put('/restaurants/{id}', [RestaurantController::class, 'update']);
    Route::delete('/restaurants/{id}', [RestaurantController::class, 'destroy']);

    Route::post('/events', [EventController::class, 'store']);
    Route::put('/events/{id}', [EventController::class, 'update']);
    Route::delete('/events/{id}', [EventController::class, 'destroy']);

    Route::post('/stadiums', [StadiumController::class, 'store']);
    Route::post('/badges', [BadgeController::class, 'store']);
});
