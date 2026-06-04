import { useState } from 'react';
import { Form, Head, Link } from '@inertiajs/react';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import ExperiencesController from '@/actions/App/Http/Controllers/Admin/ExperiencesController';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    create as experiencesCreate,
    edit as experiencesEdit,
    index as experiencesIndex,
} from '@/routes/admin/experiences';

interface Experience {
    id: number;
    title: string;
    company: string;
    period: string;
    icon: string;
    description: string;
    technologies: string[] | null;
    order: number;
}

interface Props {
    experiences: Experience[];
}

export default function Experiences({ experiences }: Props) {
    const [deleteExperience, setDeleteExperience] = useState<Experience | null>(
        null,
    );
    const [search, setSearch] = useState('');

    const filteredExperiences = experiences.filter((experience) => {
        const term = search.toLowerCase();
        return (
            experience.title.toLowerCase().includes(term) ||
            experience.company.toLowerCase().includes(term)
        );
    });

    return (
        <>
            <Head title="Experiências" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Experiências</h1>
                    <Button asChild>
                        <Link href={experiencesCreate()}>
                            <IconPlus />
                            Nova Experiência
                        </Link>
                    </Button>
                </div>

                <Input
                    placeholder="Pesquisar por cargo ou empresa..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Cargo</TableHead>
                            <TableHead>Empresa</TableHead>
                            <TableHead>Período</TableHead>
                            <TableHead>Tecnologias</TableHead>
                            <TableHead>Ordem</TableHead>
                            <TableHead className="w-20">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredExperiences.map((experience) => (
                            <TableRow key={experience.id}>
                                <TableCell className="font-medium">
                                    {experience.title}
                                </TableCell>
                                <TableCell>{experience.company}</TableCell>
                                <TableCell>{experience.period}</TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {experience.technologies?.map(
                                            (tech) => (
                                                <Badge
                                                    key={tech}
                                                    variant="secondary"
                                                >
                                                    {tech}
                                                </Badge>
                                            ),
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>{experience.order}</TableCell>
                                <TableCell>
                                    <div className="flex gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                        >
                                            <Link
                                                href={experiencesEdit({
                                                    experience: experience.id,
                                                })}
                                            >
                                                <IconPencil className="size-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                setDeleteExperience(experience)
                                            }
                                        >
                                            <IconTrash className="size-4 text-destructive" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Delete Dialog */}
            <Dialog
                open={!!deleteExperience}
                onOpenChange={() => setDeleteExperience(null)}
            >
                <DialogContent>
                    <DialogTitle>Excluir experiência</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir{' '}
                        <span className="font-medium text-foreground">
                            {deleteExperience?.title}
                        </span>{' '}
                        em{' '}
                        <span className="font-medium text-foreground">
                            {deleteExperience?.company}
                        </span>
                        ? Essa ação não pode ser desfeita.
                    </DialogDescription>
                    {deleteExperience && (
                        <Form
                            {...ExperiencesController.destroy.form({
                                experience: deleteExperience.id,
                            })}
                            onSuccess={() => setDeleteExperience(null)}
                        >
                            {({ processing }) => (
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button
                                            variant="secondary"
                                            type="button"
                                        >
                                            Cancelar
                                        </Button>
                                    </DialogClose>
                                    <Button
                                        variant="destructive"
                                        disabled={processing}
                                    >
                                        Excluir
                                    </Button>
                                </DialogFooter>
                            )}
                        </Form>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

Experiences.layout = {
    breadcrumbs: [
        {
            title: 'Experiências',
            href: experiencesIndex(),
        },
    ],
};
