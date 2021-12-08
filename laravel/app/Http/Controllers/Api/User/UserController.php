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
            'fullName' => 'required',
            'email' => 'required',
            // 'name' => 'required',
            // 'dateBirth' => 'required|date_format:Y-m-d',
        ]);

        $result = $validator;

        $result = User::create([
            'fullName' => $request->fullName,
            'email' => $request->email,
            // 'fullName' => $request->fullName,
        ]);

        //$result = $result->get();
        return response()->json('sang');
    }
}
