import { Form, Head, setLayoutProps } from '@inertiajs/react';
import CoursesController from '@/actions/App/Http/Controllers/Admin/CoursesController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { index as coursesIndex } from '@/routes/admin/courses';

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
    course: Course;
}

export default function EditCourse({ course }: Props) {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Cursos', href: coursesIndex() },
            { title: course.name },
            { title: 'Editar' },
        ],
    });

    return (
        <>
            <Head title={`Editar — ${course.name}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <h1 className="text-xl font-semibold">Editar Curso</h1>

                <Form
                    {...CoursesController.update.form({ course: course.id })}
                    options={{ preserveScroll: true }}
                    className="mx-auto w-full max-w-5xl space-y-4"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-1.5">
                                <Label htmlFor="name">Nome</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    required
                                    defaultValue={course.name}
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
                                    defaultValue={course.description}
                                    placeholder="Descreva o curso..."
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="platform">Plataforma</Label>
                                <Select
                                    name="platform"
                                    defaultValue={course.platform}
                                >
                                    <SelectTrigger
                                        id="platform"
                                        className="w-full"
                                    >
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Udemy">
                                            Udemy
                                        </SelectItem>
                                        <SelectItem value="Coursera">
                                            Coursera
                                        </SelectItem>
                                        <SelectItem value="YouTube">
                                            YouTube
                                        </SelectItem>
                                        <SelectItem value="Alura">
                                            Alura
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.platform} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    name="status"
                                    defaultValue={course.status}
                                >
                                    <SelectTrigger
                                        id="status"
                                        className="w-full"
                                    >
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="completed">
                                            completed
                                        </SelectItem>
                                        <SelectItem value="in progress">
                                            in progress
                                        </SelectItem>
                                        <SelectItem value="planned">
                                            planned
                                        </SelectItem>
                                        <SelectItem value="pending">
                                            pending
                                        </SelectItem>
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
                                    defaultValue={course.link ?? ''}
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
                                    defaultValue={course.order}
                                />
                                <InputError message={errors.order} />
                            </div>

                            <Button type="submit" disabled={processing}>
                                Salvar
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}
