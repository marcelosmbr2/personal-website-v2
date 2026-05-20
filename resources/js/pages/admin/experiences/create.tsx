import { Form, Head } from '@inertiajs/react';
import ExperiencesController from '@/actions/App/Http/Controllers/Admin/ExperiencesController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { create as experiencesCreate, index as experiencesIndex } from '@/routes/admin/experiences';

export default function CreateExperience() {
    return (
        <>
            <Head title="Nova Experiência" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <h1 className="text-xl font-semibold">Nova Experiência</h1>

                <Form
                    {...ExperiencesController.store.form()}
                    options={{ preserveScroll: true }}
                    className="mx-auto w-full max-w-3xl space-y-4"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-1.5">
                                <Label htmlFor="title">Cargo</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    required
                                    placeholder="Ex: Engenheiro de Software"
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="company">Empresa</Label>
                                <Input
                                    id="company"
                                    name="company"
                                    required
                                    placeholder="Ex: Acme Corp"
                                />
                                <InputError message={errors.company} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="period">Período</Label>
                                <Input
                                    id="period"
                                    name="period"
                                    required
                                    placeholder="Ex: 2022 – Presente"
                                />
                                <InputError message={errors.period} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="icon">Ícone</Label>
                                <Input
                                    id="icon"
                                    name="icon"
                                    required
                                    placeholder="Ex: acme-corp"
                                />
                                <InputError message={errors.icon} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="description">Descrição</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    required
                                    placeholder="Descreva as responsabilidades..."
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="technologies">Tecnologias</Label>
                                <Input
                                    id="technologies"
                                    name="technologies"
                                    placeholder="Ex: React, TypeScript, Laravel"
                                />
                                <InputError message={errors.technologies} />
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

CreateExperience.layout = {
    breadcrumbs: [
        {
            title: 'Experiências',
            href: experiencesIndex(),
        },
        {
            title: 'Nova Experiência',
            href: experiencesCreate(),
        },
    ],
};
