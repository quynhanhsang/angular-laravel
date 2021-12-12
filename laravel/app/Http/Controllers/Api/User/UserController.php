<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;
use App\User;
// use Illuminate\Database\Eloquent\Model;

class UserController extends Controller
{
    public function search(Request $request)
    {
        $result = User::query();
        // $text = 'Ad';
        if(!empty( $request->name )){
            $result = $result->where('name', 'like', '%'.$request->name.'%');
        }

        $result = $result->get();
        return response()->json($result);
    }

    public function add(Request $request)
    {
        $validator = $this->validate($request, [
            'email' => 'required',
            'name' => 'required',
            'fullName' => 'required',
            'password'=> 'required',
        ]);

        $result = $validator;

        $user = User::create([
            'email' => $request->email,
            'name' => $request->name,
            'fullName' => $request->fullName,
            'password'=> $request->password,
        ]);
        if($user){
            $result = [
                'message'=>'Bạn đã thêm mới thành công',
                'messageType'=>1,
            ];
        }
        return response()->json($result);
    }

    public function edit(Request $request){

        $validator = $this->validate($request, [
            'email' => 'required',
            'name' => 'required',
            'fullName' => 'required',
            'password'=> 'required',
        ]);

        $reponse = $validator;

        $user = Profile::whereId($request->id)->update([
            'fullName' => $request->fullName,
            'email' => $request->email,
            'name' =>  $request->name,
            'password'=> $request->password,
        ]);

        if($user){
            $reponse = [
                'message' => 'Update thành công',
                'type'=> 2,
            ];
        }

        return response($reponse);
    }
}
