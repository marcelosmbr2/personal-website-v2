import { useEffect, useState } from 'react';
import { GuestMobileSidebar } from '@/components/guest-mobile-sidebar';
import { ThemeToggle } from '@/components/theme-toggle';

const navLinks = [
    { label: 'Home', href: '#home', section: 'home' },
    { label: 'Skills', href: '#skills', section: 'skills' },
    { label: 'Projetos', href: '#projects', section: 'projects' },
    { label: 'Experiência', href: '#experiencia', section: 'experiencia' },
    { label: 'Cursos', href: '#cursos', section: 'cursos' },
    { label: 'Blog', href: '#blog', section: 'blog' },
];

export function NavigationHeader() {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const atBottom =
                window.innerHeight + scrollY >=
                document.documentElement.scrollHeight - 10;

            if (atBottom) {
                setActiveSection(navLinks[navLinks.length - 1].section);
                return;
            }

            let current = navLinks[0].section;
            const trigger = window.innerHeight * 0.4;

            for (const { section } of navLinks) {
                const el = document.getElementById(section);
                if (!el) continue;
                const top = el.getBoundingClientRect().top + scrollY;
                if (top - trigger <= scrollY) {
                    current = section;
                }
            }

            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="sticky inset-x-0 top-0 z-50 flex w-full flex-wrap text-sm md:flex-nowrap md:justify-start">
            <nav className="relative mx-2 mt-4 flex w-full max-w-3xl flex-wrap items-center justify-between rounded-[24px] border border-gray-200 bg-white p-1 ps-4 sm:mx-auto md:flex-nowrap md:py-0 dark:border-neutral-700 dark:bg-neutral-900">
                <h1 className="text-xl font-bold">SMBR</h1>
                <div className="flex items-center gap-1 md:order-4 md:ms-4">
                    <ThemeToggle />
                    <GuestMobileSidebar />
                </div>
                <div className="hidden grow basis-full overflow-hidden transition-all duration-300 md:block">
                    <div className="mt-3 flex flex-col gap-2 py-2 md:mt-0 md:flex-row md:items-center md:justify-end md:gap-3 md:py-0 md:ps-7">
                        {navLinks.map(({ label, href, section }) => (
                            <a
                                key={href}
                                href={href}
                                className={`border-s-2 px-4 py-0.5 transition-colors focus:outline-hidden md:border-s-0 md:border-b-2 md:px-1 md:py-3 ${
                                    activeSection === section
                                        ? 'border-gray-800 font-medium text-gray-800 dark:border-neutral-200 dark:text-neutral-200'
                                        : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200'
                                }`}
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
