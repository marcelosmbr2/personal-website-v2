import { useState } from 'react';
import { Form, Head, Link } from '@inertiajs/react';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import CoursesController from '@/actions/App/Http/Controllers/Admin/CoursesController';
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    create as coursesCreate,
    edit as coursesEdit,
    index as coursesIndex,
} from '@/routes/admin/courses';

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
    completed: 'bg-green-100 text-green-800',
    'in progress': 'bg-blue-100 text-blue-800',
    planned: 'bg-gray-100 text-gray-700',
    pending: 'bg-yellow-100 text-yellow-800',
};

export default function Courses({ courses }: Props) {
    const [deleteCourse, setDeleteCourse] = useState<Course | null>(null);

    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('todos');
    const [filterPlatform, setFilterPlatform] = useState('todas');

    const filteredCourses = courses.filter((course) => {
        const matchesSearch = course.name
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesStatus =
            filterStatus === 'todos' || course.status === filterStatus;
        const matchesPlatform =
            filterPlatform === 'todas' || course.platform === filterPlatform;
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
                    <Select
                        value={filterStatus}
                        onValueChange={setFilterStatus}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">
                                Todos os Status
                            </SelectItem>
                            <SelectItem value="completed">completed</SelectItem>
                            <SelectItem value="in progress">
                                in progress
                            </SelectItem>
                            <SelectItem value="planned">planned</SelectItem>
                            <SelectItem value="pending">pending</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select
                        value={filterPlatform}
                        onValueChange={setFilterPlatform}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todas">
                                Todas as Plataformas
                            </SelectItem>
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
                                <TableCell className="font-medium">
                                    {course.name}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">
                                        {course.platform}
                                    </Badge>
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
                                            asChild
                                        >
                                            <Link
                                                href={coursesEdit({
                                                    course: course.id,
                                                })}
                                            >
                                                <IconPencil className="size-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                setDeleteCourse(course)
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
                open={!!deleteCourse}
                onOpenChange={() => setDeleteCourse(null)}
            >
                <DialogContent>
                    <DialogTitle>Excluir curso</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir{' '}
                        <span className="font-medium text-foreground">
                            {deleteCourse?.name}
                        </span>
                        ? Essa ação não pode ser desfeita.
                    </DialogDescription>
                    {deleteCourse && (
                        <Form
                            {...CoursesController.destroy.form({
                                course: deleteCourse.id,
                            })}
                            onSuccess={() => setDeleteCourse(null)}
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

Courses.layout = {
    breadcrumbs: [
        {
            title: 'Cursos',
            href: coursesIndex(),
        },
    ],
};
