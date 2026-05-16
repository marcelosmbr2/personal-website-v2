import type { InertiaLinkProps } from '@inertiajs/react';
import type { TablerIcon } from '@/components/icons';

export type BreadcrumbItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
};

export type NavItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: TablerIcon | null;
    isActive?: boolean;
};
