<?php

namespace App\Http\Controllers\Api\Role;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Illuminate\Database\Query\Builder;

use App\User;
use Illuminate\Support\Facades\Auth;
// use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\Paginator;
class RoleController extends Controller
{
    public function getAll(Type $var = null)
    {
        # code...
    }

    public function getAllPermission()
    {
        $result = [
            'items'=>Permission::all(),
            'message'=>'Bạn đã thêm mới thành công',
            'messageType'=>1,
        ];

        return response()->json($result);
    }

    public function filter(Request $request)
    {
        $roles = Role::query();
        //set count mặc định
        $itemsCount = $roles->count();
        $query = $roles;
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

    public function add(Request $request)
    {
        $validator = $this->validate($request, [
            'name' => 'required',
            'guard_name'=>'required',

        ]);
        $result = $validator;
        $role = Role::create([
            'name' => $request->name,
            'guard_name'=>$request->guard_name,
            'id_user' => Auth::user()->id,
        ]);

        foreach($request->namePermisson as $item ){
            $role->givePermissionTo($item);
        };
        if($role){
            $result = [
                'message'=>'Bạn đã thêm mới thành công',
                'messageType'=>1,
            ];
        }

        return  response()->json($request->namePermisson);
    }

    public function edit(Request $request){

        $validator = $this->validate($request, [
            'name' => 'required',
            'guard_name' => 'required',
        ]);

        $reponse = $validator;

        $user = Role::whereId($request->id)->update([
            'name' => $request->name,
            'guard_name'=>$request->guard_name,
            'id_user' => Auth::user()->id,
        ]);

        if($user){
            $reponse = [
                'message' => 'Update thành công',
                'messageType'=> 1,
            ];
        }

        return response()->json($reponse);
    }

    public function getById($id)
    {
        $lastUser = Role::where('id',$id)->first();
        return  response()->json($lastUser);
    }

    public function delete($id)
    {
        $delete = Role::where('id', $id)->delete();
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
        $deleteRange = Role::whereIn('id', $ids)->delete();
        if($deleteRange){
            $result = [
                'message'=>'Xóa thành công',
                'messageType'=>1,
            ];
        }
        return response()->json($result);
    }
}
