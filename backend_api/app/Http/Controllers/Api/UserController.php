<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request) { return User::latest()->limit(min((int) $request->input('limit', 100), 1000))->get(); }
    public function show(User $user) { return $user; }
    public function update(Request $request, User $user) { $user->update($request->validate(['role' => 'sometimes|in:customer,staff,admin', 'is_active' => 'sometimes|boolean', 'full_name' => 'sometimes|nullable|string|max:255'])); return $user; }
    public function destroy(Request $request, User $user) { abort_if($request->user()->is($user), 422, 'You cannot delete your own account.'); $user->delete(); return response()->json(['message' => 'User deleted.']); }
}
