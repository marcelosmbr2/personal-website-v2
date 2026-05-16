import { GuestMobileSidebar } from '@/components/guest-mobile-sidebar';
import { ThemeToggle } from '@/components/theme-toggle';

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projetos', href: '#projects' },
    { label: 'Experiência', href: '#experiencia' },
    { label: 'Cursos', href: '#cursos' },
    { label: 'Blog', href: '#blog' },
];

export function NavigationHeader() {
    return (
        <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
            <nav className="mt-4 relative max-w-3xl w-full bg-white border border-gray-200 rounded-[24px] mx-2 flex flex-wrap md:flex-nowrap items-center justify-between p-1 ps-4 md:py-0 sm:mx-auto dark:bg-neutral-900 dark:border-neutral-700">
                <h1 className="font-bold text-xl">SMBR</h1>
                <div className="flex items-center gap-1 md:order-4 md:ms-4">
                    <ThemeToggle />
                    <GuestMobileSidebar />
                </div>
                <div className="hidden overflow-hidden transition-all duration-300 basis-full grow md:block">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-2 md:gap-3 mt-3 md:mt-0 py-2 md:py-0 md:ps-7">
                        {navLinks.map(({ label, href }) => (
                            <a
                                key={href}
                                href={href}
                                className="py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors focus:outline-hidden"
                            >
                                {label}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    );
}
