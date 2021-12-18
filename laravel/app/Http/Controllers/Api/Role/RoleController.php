<?php

namespace App\Http\Controllers\Api\Role;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;
use App\Role;
// use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\Paginator;
class RoleController extends Controller
{
    public function getAll(Request $request)
    {
        $result = Role::query()->get();
        return response()->json($result);
    }
}
