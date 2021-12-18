<?php

namespace App\Http\Controllers\Api\Permission;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;
use App\Permission;
// use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\Paginator;
class PermissionController extends Controller
{
    public function getAll(Request $request)
    {
        $result = Permission::query()->get();
        return response()->json($result);
    }
}
