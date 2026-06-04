import { useState } from 'react';
import { IconMenu2 } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const navLinks = [
    { label: 'Home', href: '#home', section: 'home' },
    { label: 'Skills', href: '#skills', section: 'skills' },
    { label: 'Projetos', href: '#projects', section: 'projects' },
    { label: 'Experiência', href: '#experiencia', section: 'experiencia' },
    { label: 'Cursos', href: '#cursos', section: 'cursos' },
    { label: 'Blog', href: '#blog', section: 'blog' },
];

export function GuestMobileSidebar() {
    const isMobile = useIsMobile();
    const [activeSection, setActiveSection] = useState('home');
    const [open, setOpen] = useState(false);

    if (!isMobile) return null;

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="flex size-9.5 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-200 focus:bg-gray-200 focus:outline-hidden dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    aria-label="Toggle navigation"
                >
                    <IconMenu2 />
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[280px]">
                <SheetHeader>
                    <SheetTitle>SMBR</SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-4">
                    {navLinks.map(({ label, href, section }) => (
                        <a
                            key={section}
                            href={href}
                            onClick={() => {
                                setActiveSection(section);
                                setOpen(false);
                            }}
                            className={`border-s-2 px-4 py-2 transition-colors focus:outline-hidden ${
                                activeSection === section
                                    ? 'border-gray-800 font-medium text-gray-800 dark:border-neutral-200 dark:text-neutral-200'
                                    : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200'
                            }`}
                        >
                            {label}
                        </a>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}
