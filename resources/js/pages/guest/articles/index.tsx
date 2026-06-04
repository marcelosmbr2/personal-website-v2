import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { setLayoutProps } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { Articles } from '@/components/articles';
import {
    InputGroup,
    InputGroupInput,
    InputGroupAddon,
} from '@/components/ui/input-group';
import { IconArrowLeft, IconSearch } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type Category = 'Tecnologia' | 'Filosofia';

type Article = {
    id: number;
    name: string;
    description: string;
    external_link: string | null;
    image_url: string | null;
    is_from_medium: boolean;
    category: string | null;
    created_at: string;
};

export default function ArticlesIndex({ articles }: { articles: Article[] }) {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] =
        useState<Category>('Tecnologia');

    setLayoutProps({ layout: GuestLayout });

    const filtered = articles
        .filter((a) => a.category === selectedCategory)
        .filter(
            (a) =>
                !search.trim() ||
                a.name.toLowerCase().includes(search.toLowerCase()) ||
                a.description.toLowerCase().includes(search.toLowerCase()),
        );

    return (
        <>
            <Head title="Blog" />
            <div className="mx-auto w-full max-w-3xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
                <div className="mb-5">
                    <div className="mb-3 flex items-center justify-between">
                        <h1 className="font-medium text-gray-800 dark:text-neutral-200">
                            Blog
                        </h1>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => window.history.back()}
                        >
                            <IconArrowLeft />
                        </Button>
                    </div>
                    <InputGroup>
                        <InputGroupInput
                            type="search"
                            placeholder="Pesquisar..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <InputGroupAddon>
                            <IconSearch className="size-4" />
                        </InputGroupAddon>
                    </InputGroup>
                    <Select
                        value={selectedCategory}
                        onValueChange={(v) =>
                            setSelectedCategory(v as Category)
                        }
                    >
                        <SelectTrigger className="mt-3">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Tecnologia">
                                Tecnologia
                            </SelectItem>
                            <SelectItem value="Filosofia">Filosofia</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {filtered.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                        Nenhum artigo encontrado.
                    </p>
                ) : (
                    <Articles articles={filtered} />
                )}
            </div>
        </>
    );
}
