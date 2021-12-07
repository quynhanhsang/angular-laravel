<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Profile;
// use Illuminate\Database\Eloquent\Model;

class ProfileController extends Controller
{
    public function getById($id)
    {
        $lastUser = Profile::where('id',$id)->first();
        $reponse = [
            'id' => $lastUser->id,
            'email' => $lastUser->email,
            'fullName'=>$lastUser->fullName,
            'dateBirth'=>$lastUser->dateBirth,
        ];

        return response()->json($reponse);
    }

    public function edit(Request $request){

        $this->validate($request, [
            'fullName' => 'required',
            'email' => 'required',
            'dateBirth' => 'required|date_format:Y-m-d',
        ]);

        $reponse = [
            'message' => 'Xảy ra lỗi',
            'type'=> 1,
        ];

        $user = Profile::whereId($request->id)->update([
            'fullName' => $request->fullName,
            'email' => $request->email,
            'dateBirth' => date("Y-m-d", strtotime($request->dateBirth)),
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
