import { useState } from 'react';
import { Form, Head } from '@inertiajs/react';
import ArticlesController from '@/actions/App/Http/Controllers/Admin/ArticlesController';
import InputError from '@/components/input-error';
import QuillEditor from '@/components/quill-editor';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
    create as articlesCreate,
    index as articlesIndex,
} from '@/routes/admin/articles';

export default function CreateArticle() {
    const [isFromMedium, setIsFromMedium] = useState(false);

    return (
        <>
            <Head title="Novo Artigo" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <h1 className="text-xl font-semibold">Novo Artigo</h1>

                <Form
                    {...ArticlesController.store.form()}
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
                                    placeholder="Ex: Como usar o Laravel Wayfinder"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="description">Descrição</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    required
                                    placeholder="Descreva o artigo..."
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="category">Categoria</Label>
                                <Select name="category" defaultValue="">
                                    <SelectTrigger
                                        id="category"
                                        className="w-64"
                                    >
                                        <SelectValue placeholder="Sem categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Tecnologia">
                                            Tecnologia
                                        </SelectItem>
                                        <SelectItem value="Filosofia">
                                            Filosofia
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.category} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="external_link">
                                    Link Externo
                                </Label>
                                <Input
                                    id="external_link"
                                    name="external_link"
                                    type="url"
                                    placeholder="https://..."
                                />
                                <InputError message={errors.external_link} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="image_url">URL da Imagem</Label>
                                <Input
                                    id="image_url"
                                    name="image_url"
                                    placeholder="https://..."
                                />
                                <InputError message={errors.image_url} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="published_at">
                                    Data de Publicação
                                </Label>
                                <Input
                                    id="published_at"
                                    name="published_at"
                                    type="datetime-local"
                                />
                                <InputError message={errors.published_at} />
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="is_from_medium"
                                    name="is_from_medium"
                                    checked={isFromMedium}
                                    onCheckedChange={(checked) =>
                                        setIsFromMedium(!!checked)
                                    }
                                />
                                <Label htmlFor="is_from_medium">
                                    Publicado no Medium
                                </Label>
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox id="is_favorite" name="is_favorite" />
                                <Label htmlFor="is_favorite">
                                    Marcar como destaque
                                </Label>
                            </div>

                            {!isFromMedium && (
                                <div className="grid gap-1.5">
                                    <Label>Conteúdo</Label>
                                    <QuillEditor name="content" />
                                    <InputError message={errors.content} />
                                </div>
                            )}

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

CreateArticle.layout = {
    breadcrumbs: [
        {
            title: 'Artigos',
            href: articlesIndex(),
        },
        {
            title: 'Novo Artigo',
            href: articlesCreate(),
        },
    ],
};
