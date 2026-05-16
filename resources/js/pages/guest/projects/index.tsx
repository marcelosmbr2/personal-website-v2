import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { setLayoutProps } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/ui/input-group';
import { IconArrowLeft, IconSearch } from '@/components/icons';
import { Button } from '@/components/ui/button';

type Project = {
    id: number;
    name: string;
    image: string | null;
    description: string;
    technologies: string[];
    link: string | null;
    status: string;
};

export default function ProjectsIndex({ projects }: { projects: Project[] }) {
    const [search, setSearch] = useState('');

    setLayoutProps({ layout: GuestLayout });

    const filtered = search.trim()
        ? projects.filter(
              (p) =>
                  p.name.toLowerCase().includes(search.toLowerCase()) ||
                  p.description.toLowerCase().includes(search.toLowerCase()),
          )
        : projects;

    return (
        <>
            <Head title="Projetos" />
            <div className="w-full max-w-3xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="mb-5">
                    <div className="flex items-center justify-between mb-3">
                        <h1 className="font-medium text-gray-800 dark:text-neutral-200">Projetos</h1>
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
                        Nenhum projeto encontrado.
                    </p>
                ) : (
                    <div className="space-y-6">
                        {filtered.map((project) => (
                            <article key={project.id} className="group">
                                <a
                                    href={project.link ?? '#'}
                                    className="block"
                                    target={project.link ? '_blank' : undefined}
                                    rel={project.link ? 'noopener noreferrer' : undefined}
                                >
                                    <div className="flex gap-4">
                                        <div className="shrink-0">
                                            <img
                                                className="w-40 h-40 object-cover rounded-lg bg-gray-100 dark:bg-neutral-800"
                                                width={160}
                                                height={160}
                                                src={project.image ?? '/images/projects/laravel.webp'}
                                                alt={project.name}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs text-gray-500 dark:text-neutral-500">
                                                    {project.status === 'Completed' ? 'Concluído' : 'Em andamento'}
                                                </span>
                                            </div>
                                            <h3 className="font-semibold text-sm text-gray-800 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                                {project.name}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400 line-clamp-2">
                                                {project.description}
                                            </p>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {project.technologies?.map((tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md dark:bg-neutral-800 dark:text-neutral-300"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
