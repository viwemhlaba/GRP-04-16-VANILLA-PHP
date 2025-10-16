<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RequirePasswordChange
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        // Skip for password change routes to avoid infinite redirect
        // The defined routes in routes/settings.php are named: password.edit & password.update
        if ($request->routeIs('password.*')) {
            return $next($request);
        }

        // Check if user needs to change password (password_changed_at is null)
        if ($user && is_null($user->password_changed_at)) {
            // Allow customers to proceed to their dashboard without forced redirect.
            if ($user->role !== 'customer') {
                return redirect()->route('password.edit')
                    ->with('warning', 'You must change your password before continuing.');
            }
            // Optionally could flash a reminder here instead of redirect.
        }

        return $next($request);
    }
}
