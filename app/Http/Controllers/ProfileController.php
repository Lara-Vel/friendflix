<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function updateAvatar(Request $request)
    {
    $request->validate([
    'avatar' => ['required','image','mimes:jpeg,png,webp,jpg','max:2048'],
    ]);

    $user = $request->user();

    if ($request->hasFile('avatar')) {

    $path = $request->file('avatar')->store('avatars', 'public');

    if ($user->avatar && $user->avatar !== 'avatars/default.webp' && Storage::disk('public')->exists($user->avatar)) {
    Storage::disk('public')->delete($user->avatar);
    }

    $user->avatar = $path;
    $user->save();
    }

    return back(303)->with('success', 'Avatar actualizado');
    }

    public function deleteAvatar(Request $request)
    {

        $user = $request->user();

        if ($user->avatar && $user->avatar !== 'avatars/default.webp') {

            if (\Storage::disk('public')->exists($user->avatar)) {
                \Storage::disk('public')->delete($user->avatar);
            }

            $user->avatar = 'avatars/default.webp';
            $user->save();
        }

        return back(303)->with('success', 'Avatar eliminado y restablecido al predeterminado.');
    }


}
