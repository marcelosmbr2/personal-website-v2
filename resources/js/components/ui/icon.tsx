import type { TablerIcon } from '@/components/icons';

interface IconProps {
    iconNode?: TablerIcon | null;
    className?: string;
}

export function Icon({ iconNode: IconComponent, className }: IconProps) {
    if (!IconComponent) {
        return null;
    }

    return <IconComponent className={className} />;
}
