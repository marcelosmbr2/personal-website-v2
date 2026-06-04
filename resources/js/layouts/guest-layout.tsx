import { NavigationHeader } from '@/components/navigation-header';
import type { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col bg-white text-gray-900 transition-colors dark:bg-neutral-900 dark:text-white">
            <NavigationHeader />
            <main id="content">{children}</main>
            <footer className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:px-8">
                <div className="border-t border-gray-200 py-6 dark:border-neutral-700">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs text-gray-600 dark:text-neutral-400">
                            © 2025 Marcelosmbr
                        </p>
                        <span className="text-xs text-gray-600 dark:text-neutral-400">
                            Laravel 13 + Inertia.js + React
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
