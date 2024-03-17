<?php

namespace App\Http\Controllers\Api;

use App\Helpers\CommonHelpers;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    /**
     * Login User
     *
     * @return JsonResponse
     */
    public function loginUser(): JsonResponse
    {
        $validator = Validator::make(request()->all(), [
            'email'    => 'required|email',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => CommonHelpers::error_processor($validator)], 401);
        }

        // Check email
        $user = User::where('email', request()->email)->first();

        if (!$user || !Hash::check(request()->password, $user->password)) {
            return response()->json([
                "error" => "Login Failed",
            ], 401);
        }

        $token = $user->createToken('MyApp')->plainTextToken;

        return response()->json([
            'user'  => new UserResource($user),
            'token' => $token,
        ], 201);
    }

    /**
     * Register User
     *
     * @return JsonResponse
     */
    public function registerUser(): JsonResponse
    {
        $validator = Validator::make(request()->all(), [
            'name'     => 'required|min:3',
            'email'    => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => CommonHelpers::error_processor($validator)], 401);
        }

        $data = [
            'name'           => request()->input('name'),
            'email'          => request()->input('email'),
            'password'       => bcrypt(request()->input('password')),
            'contact_number' => request()->input('contact_number'),
            'address'        => request()->input('address'),
        ];

        $user = User::create($data);

        if (!$user) {
            return response()->json([
                "error" => "Something is wrong",
            ], 401);
        }

        $token = $user->createToken('MyApp')->plainTextToken;

        return response()->json([
            'user'  => new UserResource($user),
            'token' => $token,
        ], 201);
    }

    /**
     * Logout User
     *
     * @return JsonResponse
     */
    public function logoutUser(): JsonResponse
    {

        auth()->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Customer Logout Successfully',
        ], 200);
    }

}
