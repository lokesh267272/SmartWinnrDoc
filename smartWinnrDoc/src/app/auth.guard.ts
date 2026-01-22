import { inject, PLATFORM_ID } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const platformId = inject(PLATFORM_ID);

    // Allow access during server-side rendering to prevent premature redirects
    // This is crucial for SSR; otherwise, the server (which has no localStorage)
    // will always redirect to login during the initial page load.
    if (!isPlatformBrowser(platformId)) {
        return true;
    }

    // Check for token in localStorage (Browser only)
    const token = localStorage.getItem('token');

    if (token) {
        return true;
    } else {
        // Redirect to login if not authenticated
        return router.parseUrl('/login');
    }
};
