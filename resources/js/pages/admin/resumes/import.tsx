import { Form, Head } from '@inertiajs/react';
import ResumesController from '@/actions/App/Http/Controllers/Admin/ResumesController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { importMethod, index as resumesIndex } from '@/routes/admin/resumes';

export default function ImportResume() {
    return (
        <>
            <Head title="Importar Currículo" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <h1 className="text-xl font-semibold">Importar Currículo</h1>

                <Form
                    {...ResumesController.storeImport.form()}
                    options={{ preserveScroll: true }}
                    encType="multipart/form-data"
                    className="mx-auto w-full max-w-2xl space-y-4"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-1.5">
                                <Label htmlFor="name">Nome</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    required
                                    placeholder="Ex: Currículo PT-BR 2025"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="language">Idioma</Label>
                                <Select name="language" defaultValue="">
                                    <SelectTrigger id="language" className="w-full">
                                        <SelectValue placeholder="Selecione o idioma" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pt-BR">Português</SelectItem>
                                        <SelectItem value="en">English</SelectItem>
                                        <SelectItem value="es">Español</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.language} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="status">Status</Label>
                                <Select name="status" defaultValue="draft">
                                    <SelectTrigger id="status" className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Rascunho</SelectItem>
                                        <SelectItem value="active">Ativo</SelectItem>
                                        <SelectItem value="archived">Arquivado</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="file">Arquivo PDF</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept=".pdf"
                                    required
                                />
                                <InputError message={errors.file} />
                            </div>

                            <Button type="submit" disabled={processing}>
                                Importar
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

ImportResume.layout = {
    breadcrumbs: [
        { title: 'Currículos', href: resumesIndex() },
        { title: 'Importar Currículo', href: importMethod() },
    ],
};
