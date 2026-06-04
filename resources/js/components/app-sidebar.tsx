import { Link } from '@inertiajs/react';
import {
    IconBriefcase,
    IconBuilding,
    IconDatabase,
    IconFileText,
    IconLayoutGrid,
    IconNews,
    IconSchool,
} from '@/components/icons';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index as articlesIndex } from '@/routes/admin/articles';
import { index as backupIndex } from '@/routes/admin/backup';
import { index as coursesIndex } from '@/routes/admin/courses';
import { index as experiencesIndex } from '@/routes/admin/experiences';
import { index as projectsIndex } from '@/routes/admin/projects';
import { index as resumesIndex } from '@/routes/admin/resumes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: IconLayoutGrid,
    },
    {
        title: 'Projetos',
        href: projectsIndex(),
        icon: IconBriefcase,
    },
    {
        title: 'Artigos',
        href: articlesIndex(),
        icon: IconNews,
    },
    {
        title: 'Cursos',
        href: coursesIndex(),
        icon: IconSchool,
    },
    {
        title: 'Experiências',
        href: experiencesIndex(),
        icon: IconBuilding,
    },
    {
        title: 'Currículos',
        href: resumesIndex(),
        icon: IconFileText,
    },
    {
        title: 'Backup',
        href: backupIndex(),
        icon: IconDatabase,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
