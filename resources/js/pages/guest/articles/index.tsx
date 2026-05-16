import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { setLayoutProps } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { Articles } from '@/components/articles';
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/ui/input-group';
import { IconArrowLeft, IconSearch } from '@/components/icons';
import { Button } from '@/components/ui/button';

type Article = {
    id: number;
    name: string;
    description: string;
    external_link: string | null;
    image_url: string | null;
    is_from_medium: boolean;
    created_at: string;
};

export default function ArticlesIndex({ articles }: { articles: Article[] }) {
    const [search, setSearch] = useState('');

    setLayoutProps({ layout: GuestLayout });

    const filtered = search.trim()
        ? articles.filter(
              (a) =>
                  a.name.toLowerCase().includes(search.toLowerCase()) ||
                  a.description.toLowerCase().includes(search.toLowerCase()),
          )
        : articles;

    return (
        <>
            <Head title="Blog" />
            <div className="w-full max-w-3xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="mb-5">
                    <div className="flex items-center justify-between mb-3">
                        <h1 className="font-medium text-gray-800 dark:text-neutral-200">Blog</h1>
                        <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
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
