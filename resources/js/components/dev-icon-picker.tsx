import * as React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface DevIcon {
    name: string;
    versions: { svg: string[] };
    color: string;
}

interface DevIconPickerProps {
    name: string;
    defaultValue?: string;
}

function iconUrl(icon: DevIcon): string {
    const variant = icon.versions.svg.includes('original')
        ? 'original'
        : (icon.versions.svg[0] ?? 'plain');
    return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon.name}/${icon.name}-${variant}.svg`;
}

export function DevIconPicker({ name, defaultValue }: DevIconPickerProps) {
    const [icons, setIcons] = React.useState<DevIcon[]>([]);
    const [search, setSearch] = React.useState('');
    const [selected, setSelected] = React.useState(defaultValue ?? '');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('https://raw.githubusercontent.com/devicons/devicon/master/devicon.json')
            .then((res) => res.json())
            .then((data: DevIcon[]) => {
                setIcons(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filtered = React.useMemo(
        () => icons.filter((icon) => icon.name.toLowerCase().includes(search.toLowerCase())),
        [icons, search],
    );

    return (
        <div className="flex flex-col gap-2">
            <input type="hidden" name={name} value={selected} />

            <Input
                placeholder="Buscar ícone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="border-border rounded-md border">
                {loading ? (
                    <div className="text-muted-foreground flex h-48 items-center justify-center text-sm">
                        Carregando ícones...
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-muted-foreground flex h-48 items-center justify-center text-sm">
                        Nenhum ícone encontrado.
                    </div>
                ) : (
                    <div className="grid max-h-64 grid-cols-6 gap-1 overflow-y-auto p-2 sm:grid-cols-8 md:grid-cols-10">
                        {filtered.map((icon) => (
                            <button
                                key={icon.name}
                                type="button"
                                title={icon.name}
                                onClick={() => setSelected(icon.name)}
                                className={cn(
                                    'hover:bg-accent flex flex-col items-center gap-1 rounded p-1.5 transition-colors',
                                    selected === icon.name && 'bg-accent ring-ring ring-2',
                                )}
                            >
                                <img
                                    src={iconUrl(icon)}
                                    alt={icon.name}
                                    className="size-7"
                                    loading="lazy"
                                />
                                <span className="text-muted-foreground w-full truncate text-center text-[10px]">
                                    {icon.name}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {selected && (
                <p className="text-muted-foreground text-xs">
                    Selecionado: <strong>{selected}</strong>
                </p>
            )}
        </div>
    );
}
