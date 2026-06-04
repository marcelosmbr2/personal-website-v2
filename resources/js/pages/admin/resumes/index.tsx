import { useState } from 'react';
import { Form, Head, Link } from '@inertiajs/react';
import { IconEye, IconPencil, IconPlus, IconTrash, IconUpload } from '@tabler/icons-react';
import ResumesController from '@/actions/App/Http/Controllers/Admin/ResumesController';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { create as resumesCreate, edit as resumesEdit, importMethod as resumesImport, index as resumesIndex, show as resumesShow } from '@/routes/admin/resumes';

interface Resume {
    id: number;
    name: string;
    language: string;
    status: string;
    file_path: string | null;
    updated_at: string;
}

interface Props {
    resumes: Resume[];
}

const LANGUAGE_LABEL: Record<string, string> = {
    'pt-BR': 'Português',
    en: 'English',
    es: 'Español',
};

const STATUS_BADGE: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    active: 'bg-green-100 text-green-800',
    archived: 'bg-red-100 text-red-700',
};

const STATUS_LABEL: Record<string, string> = {
    draft: 'Rascunho',
    active: 'Ativo',
    archived: 'Arquivado',
};

export default function Resumes({ resumes }: Props) {
    const [deleteResume, setDeleteResume] = useState<Resume | null>(null);
    const [search, setSearch] = useState('');
    const [filterLanguage, setFilterLanguage] = useState('todas');
    const [filterStatus, setFilterStatus] = useState('todos');
    const filteredResumes = resumes.filter((resume) => {
        const matchesSearch = resume.name.toLowerCase().includes(search.toLowerCase());
        const matchesLanguage = filterLanguage === 'todas' || resume.language === filterLanguage;
        const matchesStatus = filterStatus === 'todos' || resume.status === filterStatus;
        return matchesSearch && matchesLanguage && matchesStatus;
    });

    return (
        <>
            <Head title="Currículos" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Currículos</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={resumesImport()}>
                                <IconUpload />
                                Importar Currículo
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={resumesCreate()}>
                                <IconPlus />
                                Criar Currículo
                            </Link>
                        </Button>
                    </div>
                </div>

                <Input
                    placeholder="Pesquisar por nome..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="flex gap-2">
                    <Select value={filterLanguage} onValueChange={setFilterLanguage}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todas">Todos os idiomas</SelectItem>
                            <SelectItem value="pt-BR">Português</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Todos os status</SelectItem>
                            <SelectItem value="draft">Rascunho</SelectItem>
                            <SelectItem value="active">Ativo</SelectItem>
                            <SelectItem value="archived">Arquivado</SelectItem>
                        </SelectContent>
                    </Select>

                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Idioma</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Atualizado em</TableHead>
                            <TableHead className="w-28">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredResumes.map((resume) => (
                            <TableRow key={resume.id}>
                                <TableCell className="font-medium">{resume.name}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{LANGUAGE_LABEL[resume.language] ?? resume.language}</Badge>
                                </TableCell>
                                <TableCell>
                                    <span
                                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_BADGE[resume.status] ?? 'bg-gray-100 text-gray-700'}`}
                                    >
                                        {STATUS_LABEL[resume.status] ?? resume.status}
                                    </span>
                                </TableCell>
                                <TableCell className="text-muted-foreground text-sm">
                                    {new Date(resume.updated_at).toLocaleDateString('pt-BR')}
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="icon" asChild>
                                            <a href={resumesShow({ resume: resume.id })} target="_blank" rel="noopener noreferrer">
                                                <IconEye className="size-4" />
                                            </a>
                                        </Button>
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={resumesEdit({ resume: resume.id })}>
                                                <IconPencil className="size-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setDeleteResume(resume)}
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

            <Dialog open={!!deleteResume} onOpenChange={() => setDeleteResume(null)}>
                <DialogContent>
                    <DialogTitle>Excluir currículo</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir{' '}
                        <span className="font-medium text-foreground">{deleteResume?.name}</span>? Essa ação não
                        pode ser desfeita.
                    </DialogDescription>
                    {deleteResume && (
                        <Form
                            {...ResumesController.destroy.form({ resume: deleteResume.id })}
                            onSuccess={() => setDeleteResume(null)}
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

Resumes.layout = {
    breadcrumbs: [
        {
            title: 'Currículos',
            href: resumesIndex(),
        },
    ],
};
