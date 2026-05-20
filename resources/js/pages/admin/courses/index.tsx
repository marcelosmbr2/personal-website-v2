import { useState } from 'react';
import { Form, Head, Link } from '@inertiajs/react';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import CoursesController from '@/actions/App/Http/Controllers/Admin/CoursesController';
import InputError from '@/components/input-error';
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
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { create as coursesCreate, index as coursesIndex } from '@/routes/admin/courses';

interface Course {
    id: number;
    name: string;
    description: string;
    platform: string;
    link: string | null;
    status: string;
    order: number;
}

interface Props {
    courses: Course[];
}

const STATUS_BADGE: Record<string, string> = {
    Completed: 'bg-green-100 text-green-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    Planned: 'bg-gray-100 text-gray-700',
};

export default function Courses({ courses }: Props) {
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [deleteCourse, setDeleteCourse] = useState<Course | null>(null);

    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('todos');
    const [filterPlatform, setFilterPlatform] = useState('todas');

    const filteredCourses = courses.filter((course) => {
        const matchesSearch = course.name.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = filterStatus === 'todos' || course.status === filterStatus;
        const matchesPlatform = filterPlatform === 'todas' || course.platform === filterPlatform;
        return matchesSearch && matchesStatus && matchesPlatform;
    });

    return (
        <>
            <Head title="Cursos" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Cursos</h1>
                    <Button asChild>
                        <Link href={coursesCreate()}>
                            <IconPlus />
                            Novo Curso
                        </Link>
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
                            <SelectItem value="todos">Todos os Status</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Planned">Planned</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={filterPlatform} onValueChange={setFilterPlatform}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todas">Todas as Plataformas</SelectItem>
                            <SelectItem value="Udemy">Udemy</SelectItem>
                            <SelectItem value="Coursera">Coursera</SelectItem>
                            <SelectItem value="YouTube">YouTube</SelectItem>
                            <SelectItem value="Alura">Alura</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Plataforma</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Ordem</TableHead>
                            <TableHead className="w-20">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCourses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell className="font-medium">{course.name}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{course.platform}</Badge>
                                </TableCell>
                                <TableCell>
                                    <span
                                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_BADGE[course.status] ?? 'bg-gray-100 text-gray-700'}`}
                                    >
                                        {course.status}
                                    </span>
                                </TableCell>
                                <TableCell>{course.order}</TableCell>
                                <TableCell>
                                    <div className="flex gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setEditingCourse(course)}
                                        >
                                            <IconPencil className="size-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setDeleteCourse(course)}
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

            {/* Edit Sheet */}
            <Sheet open={!!editingCourse} onOpenChange={() => setEditingCourse(null)}>
                <SheetContent className="flex flex-col overflow-hidden">
                    {editingCourse && (
                        <Form
                            key={editingCourse.id}
                            className="flex flex-1 flex-col overflow-hidden"
                            {...CoursesController.update.form({ course: editingCourse.id })}
                            options={{ preserveScroll: true }}
                            onSuccess={() => setEditingCourse(null)}
                        >
                            {({ processing, errors }) => (
                                <>
                                    <SheetHeader>
                                        <SheetTitle>Editar Curso</SheetTitle>
                                    </SheetHeader>

                                    <div className="flex-1 space-y-4 overflow-y-auto px-4 py-2">
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="name">Nome</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                required
                                                defaultValue={editingCourse.name}
                                                placeholder="Ex: React do Zero ao Avançado"
                                            />
                                            <InputError message={errors.name} />
                                        </div>

                                        <div className="grid gap-1.5">
                                            <Label htmlFor="description">Descrição</Label>
                                            <Textarea
                                                id="description"
                                                name="description"
                                                required
                                                defaultValue={editingCourse.description}
                                                placeholder="Descreva o curso..."
                                            />
                                            <InputError message={errors.description} />
                                        </div>

                                        <div className="grid gap-1.5">
                                            <Label htmlFor="platform">Plataforma</Label>
                                            <Select
                                                name="platform"
                                                defaultValue={editingCourse.platform}
                                            >
                                                <SelectTrigger id="platform" className="w-full">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Udemy">Udemy</SelectItem>
                                                    <SelectItem value="Coursera">Coursera</SelectItem>
                                                    <SelectItem value="YouTube">YouTube</SelectItem>
                                                    <SelectItem value="Alura">Alura</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.platform} />
                                        </div>

                                        <div className="grid gap-1.5">
                                            <Label htmlFor="status">Status</Label>
                                            <Select
                                                name="status"
                                                defaultValue={editingCourse.status}
                                            >
                                                <SelectTrigger id="status" className="w-full">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Completed">Completed</SelectItem>
                                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                                    <SelectItem value="Planned">Planned</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.status} />
                                        </div>

                                        <div className="grid gap-1.5">
                                            <Label htmlFor="link">Link</Label>
                                            <Input
                                                id="link"
                                                name="link"
                                                type="url"
                                                defaultValue={editingCourse.link ?? ''}
                                                placeholder="https://..."
                                            />
                                            <InputError message={errors.link} />
                                        </div>

                                        <div className="grid gap-1.5">
                                            <Label htmlFor="order">Ordem</Label>
                                            <Input
                                                id="order"
                                                name="order"
                                                type="number"
                                                min={0}
                                                defaultValue={editingCourse.order}
                                            />
                                            <InputError message={errors.order} />
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
                    )}
                </SheetContent>
            </Sheet>

            {/* Delete Dialog */}
            <Dialog open={!!deleteCourse} onOpenChange={() => setDeleteCourse(null)}>
                <DialogContent>
                    <DialogTitle>Excluir curso</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir{' '}
                        <span className="font-medium text-foreground">{deleteCourse?.name}</span>?
                        Essa ação não pode ser desfeita.
                    </DialogDescription>
                    {deleteCourse && (
                        <Form
                            {...CoursesController.destroy.form({ course: deleteCourse.id })}
                            onSuccess={() => setDeleteCourse(null)}
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

Courses.layout = {
    breadcrumbs: [
        {
            title: 'Cursos',
            href: coursesIndex(),
        },
    ],
};
