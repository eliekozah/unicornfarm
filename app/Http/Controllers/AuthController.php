<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //
    public function login(Request $req) {
        try {
            if(Auth::attempt($req->only('email', 'password'))) {

                /** @var User $user */
                $user = Auth::user();
                $token = $user->createToken('app')->accessToken;

                return response([
                    'message' => 'success',
                    'token' => $token,
                    'user' => $user]);
            } 

        }
        catch (\Exception $exception){
            return response([
                'message' => $exception->getMessage()
            ], 400);
        }

        return response([
            'message' => 'Invalid username/password'
        ], 401);
    }

    public function user() {
        return Auth::user();
    }

    public function register(RegisterRequest $req) {
        
        try {
        $user = User::create([
            'first_name' => $req->input('first_name'),
            'last_name' => $req->input('last_name'),
            'email' => $req->input('email'),
            'password' => Hash::make($req->input('password'))
            ]);

            return $user;
        }
        catch(\Exception $exception){
            return response([
                'message' => $exception->getMessage()
            ], 400);
        }

        
    }

}
