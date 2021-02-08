<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Unicorn;

class UnicornController extends Controller
{
    public function get() {
        $res = [
 
            'data' => [],
        ];

        $unicorns = Unicorn::get();
        foreach ($unicorns as $key => $unicorn) {
            //getting owner name through join query
            $owner = Unicorn::join('users', 'unicorns.user_id', '=', 'users.id')->select('users.id', 'users.first_name', 'users.last_name')->where('users.id', $unicorn->user_id)->get()->first();
            $res['data'][$key] = [
                'id' => $unicorn->id,
                'name' => $unicorn->name,
                'owner' => $owner
            
            ];
        }
        
        return response()->json($res);
    }

    public function delete($id) {
        return response()->json(Unicorn::destroy($id));
    }

    public function put(Request $request, $id) {
        $unicorn = Unicorn::find($id);
        $unicorn->name = $request->input('name');
        $unicorn->save();
        return response()->json($unicorn);
    }

    public function post(Request $request) {
        $unicorn = new Unicorn();
        $unicorn->name = $request->input('name');
        $unicorn->user_id = auth('api')->user()->id;
        $unicorn->save();
        return response()->json($unicorn);
    }
}

