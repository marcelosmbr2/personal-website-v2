import { useState } from 'react';
import { Form, Head } from '@inertiajs/react';
import { IconPencil, IconPlus, IconStar, IconStarFilled, IconTrash } from '@tabler/icons-react';
import ProjectsController from '@/actions/App/Http/Controllers/Admin/ProjectsController';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { index as projectsIndex } from '@/routes/admin/projects';

interface Project {
    id: number;
    name: string;
    description: string;
    status: string;
    technologies: string[];
    link: string | null;
    image: string | null;
    is_favorite: boolean;
    order: number;
}

interface Props {
    projects: Project[];
}

const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'outline'> = {
    completed: 'default',
    'in progress': 'secondary',
    planned: 'outline',
};

const STATUS_LABEL: Record<string, string> = {
    completed: 'Concluído',
    'in progress': 'Em Andamento',
    planned: 'Planejado',
};

export default function Projects({ projects }: Props) {
    const [sheetOpen, setSheetOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [deleteProject, setDeleteProject] = useState<Project | null>(null);

    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('todos');
    const [filterTech, setFilterTech] = useState('todas');

    const allTechnologies = [...new Set(projects.flatMap((p) => p.technologies ?? []))].sort();

    const filteredProjects = projects.filter((project) => {
        const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = filterStatus === 'todos' || project.status === filterStatus;
        const matchesTech = filterTech === 'todas' || (project.technologies ?? []).includes(filterTech);
        return matchesSearch && matchesStatus && matchesTech;
    });

    function openCreate() {
        setEditingProject(null);
        setSheetOpen(true);
    }

    function openEdit(project: Project) {
        setEditingProject(project);
        setSheetOpen(true);
    }

    return (
        <>
            <Head title="Projetos" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Projetos</h1>
                    <Button onClick={openCreate}>
                        <IconPlus />
                        Novo Projeto
                    </Button>
                </div>

                <Input
                    placeholder="Pesquisar por nome..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="flex gap-2">
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Todos os status</SelectItem>
                            <SelectItem value="completed">Concluído</SelectItem>
                            <SelectItem value="in progress">Em Andamento</SelectItem>
                            <SelectItem value="planned">Planejado</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={filterTech} onValueChange={setFilterTech}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todas">Todas as tecnologias</SelectItem>
                            {allTechnologies.map((tech) => (
                                <SelectItem key={tech} value={tech}>
                                    {tech}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Tecnologias</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Destaque</TableHead>
                            <TableHead>Ordem</TableHead>
                            <TableHead className="w-20">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProjects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell className="font-medium">{project.name}</TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {project.technologies?.slice(0, 3).map((tech) => (
                                            <Badge key={tech} variant="outline" className="text-xs">
                                                {tech}
                                            </Badge>
                                        ))}
                                        {project.technologies?.length > 3 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{project.technologies.length - 3}
                                            </Badge>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={STATUS_VARIANT[project.status] ?? 'outline'}>
                                        {STATUS_LABEL[project.status] ?? project.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {project.is_favorite ? (
                                        <IconStarFilled className="size-4 text-yellow-500" />
                                    ) : (
                                        <IconStar className="size-4 text-muted-foreground" />
                                    )}
                                </TableCell>
                                <TableCell>{project.order}</TableCell>
                                <TableCell>
                                    <div className="flex gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => openEdit(project)}
                                        >
                                            <IconPencil className="size-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setDeleteProject(project)}
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

            {/* Create / Edit Sheet */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent className="flex flex-col overflow-hidden">
                    <Form
                        key={editingProject?.id ?? 'new'}
                        className="flex flex-1 flex-col overflow-hidden"
                        {...(editingProject
                            ? ProjectsController.update.form({ project: editingProject.id })
                            : ProjectsController.store.form())}
                        options={{ preserveScroll: true }}
                        onSuccess={() => setSheetOpen(false)}
                    >
                        {({ processing, errors }) => (
                            <>
                                <SheetHeader>
                                    <SheetTitle>
                                        {editingProject ? 'Editar Projeto' : 'Novo Projeto'}
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="flex-1 space-y-4 overflow-y-auto px-4 py-2">
                                    <div className="grid gap-1.5">
                                        <Label htmlFor="name">Nome</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            required
                                            defaultValue={editingProject?.name}
                                            placeholder="Ex: Portfolio pessoal"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="description">Descrição</Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            required
                                            defaultValue={editingProject?.description}
                                            placeholder="Descreva o projeto..."
                                        />
                                        <InputError message={errors.description} />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="status">Status</Label>
                                        <Select
                                            name="status"
                                            defaultValue={editingProject?.status ?? 'in progress'}
                                        >
                                            <SelectTrigger id="status" className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="completed">Concluído</SelectItem>
                                                <SelectItem value="in progress">Em Andamento</SelectItem>
                                                <SelectItem value="planned">Planejado</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.status} />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="technologies">Tecnologias</Label>
                                        <Input
                                            id="technologies"
                                            name="technologies"
                                            defaultValue={editingProject?.technologies?.join(', ')}
                                            placeholder="Ex: Laravel, React, TypeScript"
                                        />
                                        <p className="text-muted-foreground text-xs">
                                            Separe as tecnologias por vírgula
                                        </p>
                                        <InputError message={errors.technologies} />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="link">Link</Label>
                                        <Input
                                            id="link"
                                            name="link"
                                            type="url"
                                            defaultValue={editingProject?.link ?? ''}
                                            placeholder="https://..."
                                        />
                                        <InputError message={errors.link} />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="image">Imagem</Label>
                                        <Input
                                            id="image"
                                            name="image"
                                            defaultValue={editingProject?.image ?? ''}
                                            placeholder="URL ou caminho da imagem"
                                        />
                                        <InputError message={errors.image} />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="order">Ordem</Label>
                                        <Input
                                            id="order"
                                            name="order"
                                            type="number"
                                            min={0}
                                            defaultValue={editingProject?.order ?? 0}
                                        />
                                        <InputError message={errors.order} />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="is_favorite"
                                            name="is_favorite"
                                            defaultChecked={editingProject?.is_favorite ?? false}
                                        />
                                        <Label htmlFor="is_favorite">Marcar como destaque</Label>
                                    </div>
                                </div>

                                <SheetFooter>
                                    <Button type="submit" disabled={processing} className="w-full">
                                        Salvar
                                    </Button>
                                </SheetFooter>
                            </>
                        )}
                    </Form>
                </SheetContent>
            </Sheet>

            {/* Delete Dialog */}
            <Dialog open={!!deleteProject} onOpenChange={() => setDeleteProject(null)}>
                <DialogContent>
                    <DialogTitle>Excluir projeto</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir{' '}
                        <span className="font-medium text-foreground">{deleteProject?.name}</span>?
                        Essa ação não pode ser desfeita.
                    </DialogDescription>
                    {deleteProject && (
                        <Form
                            {...ProjectsController.destroy.form({ project: deleteProject.id })}
                            onSuccess={() => setDeleteProject(null)}
                        >
                            {({ processing }) => (
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="secondary" type="button">
                                            Cancelar
                                        </Button>
                                    </DialogClose>
                                    <Button variant="destructive" disabled={processing}>
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

Projects.layout = {
    breadcrumbs: [
        {
            title: 'Projetos',
            href: projectsIndex(),
        },
    ],
};
