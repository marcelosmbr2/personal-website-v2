import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import AuthLayout from '@/layouts/auth-layout';
import GuestLayout from '@/layouts/guest-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name.startsWith('guest/'):
                return GuestLayout;
            case name.startsWith('auth/'):
                return AuthLayout;
            default:
                return null;
        }
    },
    strictMode: true,
    resolve: (name) => {
        const pages = import.meta.glob('./pages/{auth,guest}/**/*.tsx', {
            eager: true,
        });
        return pages[`./pages/${name}.tsx`];
    },
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
});
