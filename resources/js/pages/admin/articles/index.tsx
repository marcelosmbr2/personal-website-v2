import { useState } from 'react';
import { Form, Head, Link } from '@inertiajs/react';
import { IconPencil, IconPlus, IconStar, IconStarFilled, IconTrash } from '@tabler/icons-react';
import ArticlesController from '@/actions/App/Http/Controllers/Admin/ArticlesController';
import InputError from '@/components/input-error';
import QuillEditor from '@/components/quill-editor';
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
import { create as articlesCreate, index as articlesIndex } from '@/routes/admin/articles';

interface Article {
    id: number;
    name: string;
    description: string;
    content: string | null;
    external_link: string | null;
    image_url: string | null;
    is_favorite: boolean;
    is_from_medium: boolean;
    category: string | null;
    created_at: string;
}

interface Props {
    articles: Article[];
}

export default function Articles({ articles }: Props) {
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);
    const [editIsFromMedium, setEditIsFromMedium] = useState(false);
    const [deleteArticle, setDeleteArticle] = useState<Article | null>(null);

    const [search, setSearch] = useState('');
    const [filterMedium, setFilterMedium] = useState('todos');
    const [filterFavorite, setFilterFavorite] = useState('todos');
    const [filterCategory, setFilterCategory] = useState('todas');

    const filteredArticles = articles.filter((article) => {
        const matchesSearch = article.name.toLowerCase().includes(search.toLowerCase());
        const matchesMedium =
            filterMedium === 'todos' ||
            (filterMedium === 'sim' ? article.is_from_medium : !article.is_from_medium);
        const matchesFavorite =
            filterFavorite === 'todos' ||
            (filterFavorite === 'sim' ? article.is_favorite : !article.is_favorite);
        const matchesCategory =
            filterCategory === 'todas' || article.category === filterCategory;
        return matchesSearch && matchesMedium && matchesFavorite && matchesCategory;
    });

    function openEdit(article: Article) {
        setEditingArticle(article);
        setEditIsFromMedium(article.is_from_medium);
    }

    return (
        <>
            <Head title="Artigos" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Artigos</h1>
                    <Button asChild>
                        <Link href={articlesCreate()}>
                            <IconPlus />
                            Novo Artigo
                        </Link>
                    </Button>
                </div>

                <Input
                    placeholder="Pesquisar por nome..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="flex gap-2">
                    <Select value={filterMedium} onValueChange={setFilterMedium}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Todos (Medium)</SelectItem>
                            <SelectItem value="sim">Do Medium</SelectItem>
                            <SelectItem value="não">Não é do Medium</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={filterFavorite} onValueChange={setFilterFavorite}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Todos (Destaque)</SelectItem>
                            <SelectItem value="sim">Em Destaque</SelectItem>
                            <SelectItem value="não">Sem Destaque</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todas">Todas as Categorias</SelectItem>
                            <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                            <SelectItem value="Filosofia">Filosofia</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Destaque</TableHead>
                            <TableHead>Medium</TableHead>
                            <TableHead className="w-20">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredArticles.map((article) => (
                            <TableRow key={article.id}>
                                <TableCell className="font-medium">{article.name}</TableCell>
                                <TableCell>
                                    {article.category && (
                                        <Badge variant="outline">{article.category}</Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {article.is_favorite ? (
                                        <IconStarFilled className="size-4 text-yellow-500" />
                                    ) : (
                                        <IconStar className="size-4 text-muted-foreground" />
                                    )}
                                </TableCell>
                                <TableCell>
                                    {article.is_from_medium && (
                                        <Badge variant="secondary">Medium</Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => openEdit(article)}
                                        >
                                            <IconPencil className="size-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setDeleteArticle(article)}
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
            <Sheet open={!!editingArticle} onOpenChange={() => setEditingArticle(null)}>
                <SheetContent className="flex flex-col overflow-hidden">
                    {editingArticle && (
                        <Form
                            key={editingArticle.id}
                            className="flex flex-1 flex-col overflow-hidden"
                            {...ArticlesController.update.form({ article: editingArticle.id })}
                            options={{ preserveScroll: true }}
                            onSuccess={() => setEditingArticle(null)}
                        >
                            {({ processing, errors }) => (
                                <>
                                    <SheetHeader>
                                        <SheetTitle>Editar Artigo</SheetTitle>
                                    </SheetHeader>

                                    <div className="flex-1 space-y-4 overflow-y-auto px-4 py-2">
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="name">Nome</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                required
                                                defaultValue={editingArticle.name}
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
                                                defaultValue={editingArticle.description}
                                                placeholder="Descreva o artigo..."
                                            />
                                            <InputError message={errors.description} />
                                        </div>

                                        <div className="grid gap-1.5">
                                            <Label htmlFor="category">Categoria</Label>
                                            <Select
                                                name="category"
                                                defaultValue={editingArticle.category ?? ''}
                                            >
                                                <SelectTrigger id="category" className="w-full">
                                                    <SelectValue placeholder="Sem categoria" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                                                    <SelectItem value="Filosofia">Filosofia</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.category} />
                                        </div>

                                        <div className="grid gap-1.5">
                                            <Label htmlFor="external_link">Link Externo</Label>
                                            <Input
                                                id="external_link"
                                                name="external_link"
                                                type="url"
                                                defaultValue={editingArticle.external_link ?? ''}
                                                placeholder="https://..."
                                            />
                                            <InputError message={errors.external_link} />
                                        </div>

                                        <div className="grid gap-1.5">
                                            <Label htmlFor="image_url">URL da Imagem</Label>
                                            <Input
                                                id="image_url"
                                                name="image_url"
                                                defaultValue={editingArticle.image_url ?? ''}
                                                placeholder="https://..."
                                            />
                                            <InputError message={errors.image_url} />
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                id="is_from_medium"
                                                name="is_from_medium"
                                                checked={editIsFromMedium}
                                                onCheckedChange={(checked) =>
                                                    setEditIsFromMedium(!!checked)
                                                }
                                            />
                                            <Label htmlFor="is_from_medium">
                                                Publicado no Medium
                                            </Label>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                id="is_favorite"
                                                name="is_favorite"
                                                defaultChecked={editingArticle.is_favorite}
                                            />
                                            <Label htmlFor="is_favorite">Marcar como destaque</Label>
                                        </div>

                                        {!editIsFromMedium && (
                                            <div className="grid gap-1.5">
                                                <Label>Conteúdo</Label>
                                                <QuillEditor
                                                    name="content"
                                                    defaultValue={editingArticle.content ?? ''}
                                                />
                                                <InputError message={errors.content} />
                                            </div>
                                        )}
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
            <Dialog open={!!deleteArticle} onOpenChange={() => setDeleteArticle(null)}>
                <DialogContent>
                    <DialogTitle>Excluir artigo</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir{' '}
                        <span className="font-medium text-foreground">{deleteArticle?.name}</span>?
                        Essa ação não pode ser desfeita.
                    </DialogDescription>
                    {deleteArticle && (
                        <Form
                            {...ArticlesController.destroy.form({ article: deleteArticle.id })}
                            onSuccess={() => setDeleteArticle(null)}
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

Articles.layout = {
    breadcrumbs: [
        {
            title: 'Artigos',
            href: articlesIndex(),
        },
    ],
};
