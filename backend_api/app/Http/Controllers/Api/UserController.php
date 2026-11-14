<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function permissions()
    {
        return User::availablePermissions();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'username' => 'required|string|max:50|unique:users',
            'email' => 'required|email|max:255|unique:users',
            'full_name' => 'nullable|string|max:255',
            'password' => 'required|string|min:6',
            'role' => 'required|in:customer,staff,admin',
            'permissions' => 'sometimes|array',
            'permissions.*' => 'string|in:'.implode(',', array_keys(User::availablePermissions())),
        ]);
        if ($data['role'] === 'admin') {
            $data['permissions'] = [];
        }
        $data['password'] = Hash::make($data['password']);

        return response()->json(User::create($data), 201);
    }

    public function index(Request $request) { return User::latest()->limit(min((int) $request->input('limit', 100), 1000))->get(); }
    public function show(User $user) { return $user; }
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'role' => 'sometimes|in:customer,staff,admin',
            'is_active' => 'sometimes|boolean',
            'full_name' => 'sometimes|nullable|string|max:255',
            'permissions' => 'sometimes|array',
            'permissions.*' => 'string|in:'.implode(',', array_keys(User::availablePermissions())),
        ]);
        if ($request->user()->is($user) && isset($data['role']) && $data['role'] !== 'admin') {
            abort(422, 'You cannot remove your own admin role.');
        }
        if (($data['role'] ?? $user->role) === 'admin') {
            $data['permissions'] = [];
        }
        $user->update($data);
        return $user->fresh();
    }
    public function destroy(Request $request, User $user) { abort_if($request->user()->is($user), 422, 'You cannot delete your own account.'); $user->delete(); return response()->json(['message' => 'User deleted.']); }
}
