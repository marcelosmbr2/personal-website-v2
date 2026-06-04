import { NavigationHeader } from '@/components/navigation-header';
import type { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-900 dark:bg-neutral-900 dark:text-white transition-colors">
            <NavigationHeader />
            <main id="content">{children}</main>
            <footer className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-6 border-t border-gray-200 dark:border-neutral-700">
                    <div className="flex flex-wrap justify-between items-center gap-2">
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
