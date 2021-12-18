<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\Hash;
use App\User;
use Illuminate\Support\Facades\Auth;
// use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\Paginator;
class UserController extends Controller
{
    public function filter(Request $request)
    {
        $users = User::query();
        //set count mặc định
        $itemsCount = $users->count();
        $query = $users;
        if(isset($request->filter)){
            $query = $query->where('name', 'like', '%'.$request->filter.'%')->orWhere('fullname', 'like', '%'.$request->filter.'%');

        } else if(isset($request->orderByDesc) && $request->orderByDesc == true){
            $query = $query->orderBy('id', 'DESC');
        }

        $itemsCount = $query->count();
        $lists = $query->skip(($request->pageIndex-1) * $request->pageSize)->take($request->pageSize)->get();
        $result = [
            'items'=>$lists,
            'itemsCount'=>$itemsCount,
            'pageIndex'=>((int) ceil( $itemsCount / $request->pageSize ) > 1 ) ? $request->pageIndex : 1,
            //'pageIndex'=>((int) ceil( $itemsCount / $request->pageSize )
            'pagesCount'=>(int) ceil( $itemsCount / $request->pageSize ),
            'pageSize'=>$request->pageSize,
        ];

        return response()->json($result);
    }

    public function getById($id)
    {
        $lastUser = User::where('id',$id)->first();
        return  response()->json($lastUser);
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
        $userW = Auth::user();
        $user = User::create([
            'email' => $request->email,
            'name' => $request->name,
            'fullName' => $request->fullName,
            'password'=> Hash::make($request->password),
            'id_user' => Auth::user()->id,
        ]);
        if($user){
            $result = [
                'message'=>'Bạn đã thêm mới thành công',
                'messageType'=>1,
            ];
        }
        return response()->json($request);
    }

    public function edit(Request $request){

        $validator = $this->validate($request, [
            'email' => 'required',
            'name' => 'required',
            'fullName' => 'required',
        ]);

        $reponse = $validator;

        $user = User::whereId($request->id)->update([
            'fullName' => $request->fullName,
            'email' => $request->email,
            'name' =>  $request->name,
        ]);

        if($user){
            $reponse = [
                'message' => 'Update thành công',
                'type'=> 2,
            ];
        }

        return response()->json($reponse);
    }
    public function delete($id)
    {
        $delete = User::where('id', $id)->delete();
        $result = [];
        if($delete){
            $result = [
                'message'=>'Xóa thành công',
                'messageType'=>1,
            ];
        }

        return response()->json($result);
    }

    public function deleterange(Request $request)
    {
        $ids = $request->ids;
        $deleteRange = User::whereIn('id', $ids)->delete();
        if($deleteRange){
            $result = [
                'message'=>'Xóa thành công',
                'messageType'=>1,
            ];
        }
        return response()->json($result);
    }
}
