import * as React from 'react';
import { Form, Head } from '@inertiajs/react';
import ExperiencesController from '@/actions/App/Http/Controllers/Admin/ExperiencesController';
import { DevIconPicker } from '@/components/dev-icon-picker';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { create as experiencesCreate, index as experiencesIndex } from '@/routes/admin/experiences';

type IconMode = 'devicon' | 'upload';

export default function CreateExperience() {
    const [iconMode, setIconMode] = React.useState<IconMode>('devicon');

    return (
        <>
            <Head title="Nova Experiência" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <h1 className="text-xl font-semibold">Nova Experiência</h1>

                <Form
                    {...ExperiencesController.store.form()}
                    options={{ preserveScroll: true }}
                    encType="multipart/form-data"
                    className="mx-auto w-full max-w-5xl space-y-4"
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
                                <Label>Ícone</Label>
                                <RadioGroup
                                    value={iconMode}
                                    onValueChange={(v) => setIconMode(v as IconMode)}
                                    className="flex gap-6"
                                >
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="devicon" id="icon-devicon" />
                                        <Label htmlFor="icon-devicon">DevIcons</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="upload" id="icon-upload" />
                                        <Label htmlFor="icon-upload">Upload</Label>
                                    </div>
                                </RadioGroup>
                                <input type="hidden" name="icon_type" value={iconMode} />
                                {iconMode === 'devicon' && (
                                    <>
                                        <DevIconPicker name="icon_name" />
                                        <InputError message={errors.icon_name} />
                                    </>
                                )}
                                {iconMode === 'upload' && (
                                    <>
                                        <Input type="file" name="icon_file" accept="image/*" />
                                        <InputError message={errors.icon_file} />
                                    </>
                                )}
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
