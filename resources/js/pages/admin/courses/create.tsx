import { Form, Head } from '@inertiajs/react';
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
import {
    create as coursesCreate,
    index as coursesIndex,
} from '@/routes/admin/courses';

export default function CreateCourse() {
    return (
        <>
            <Head title="Novo Curso" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <h1 className="text-xl font-semibold">Novo Curso</h1>

                <Form
                    {...CoursesController.store.form()}
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
                                    placeholder="Descreva o curso..."
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="platform">Plataforma</Label>
                                <Select name="platform" defaultValue="">
                                    <SelectTrigger
                                        id="platform"
                                        className="w-full"
                                    >
                                        <SelectValue placeholder="Selecione a plataforma" />
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
                                <Select name="status" defaultValue="planned">
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
                                    defaultValue={0}
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

CreateCourse.layout = {
    breadcrumbs: [
        {
            title: 'Cursos',
            href: coursesIndex(),
        },
        {
            title: 'Novo Curso',
            href: coursesCreate(),
        },
    ],
};
