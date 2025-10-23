<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="{{ asset('Favicon-Friendflix.ico') }}">

    <link rel="preload" as="image" href="{{ asset('images/Principal-1.webp') }}"
        fetchpriority="high">

    <!-- Fonts -->

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
