<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{

    /**
     * Home
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return response()->json([
            "user"    => new UserResource(auth()->user()),
            "success" => "Home Information Successfully",
        ], 200);
    }

    /**
     * User
     *
     * @return JsonResponse
     */
    public function user(): JsonResponse
    {
        return response()->json([
            "user"    => new UserResource(auth()->user()),
        ], 200);
    }

}
