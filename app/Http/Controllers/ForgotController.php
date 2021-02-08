<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgotRequest;
use App\Http\Requests\ResetRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class ForgotController extends Controller
{
    //
    public function forgot(ForgotRequest $req) {
        $email = $req->input('email');

        if(User::where('email', $email)->doesntExist()){
            return response([
                'message' => 'User doesn\'t exist !'
            ], 404);
        }

        $token = Str::random(10);

        try {
            DB::table('password_resets')->insert([
                'email' => $email,
                'token' => $token
            ]);

            Mail::send('Mails.forgot', ['token' => $token], 
            function (Message $message) use ($email) {
                $message->to($email);
                $message->subject('Reset Your Password');

            });

            //send email
            return response([
                'message' => 'Check your email !'
            ]);

        } catch (\Exception $exception) {
            return response([
            'message' => $exception->getMessage()
            ], 400);
        }
    }

    function reset(ResetRequest $req) {
        $token = $req->input('token');

        if(!$passwordResets = DB::table('password_resets')->where('token', $token)->first()){
            return response([
                'message' => 'Invalid Token'
                ], 400);
        }

        if(!$user = User::where('email', $passwordResets->email)->first()){
            return response([
                'message' => 'User doesn\'t exist !'
            ], 404);
        }

        $user->password = Hash::make($req->input('password'));
        $user->save();

        return response([
            'message' => 'success'
        ]);

    }
}
