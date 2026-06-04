import { useState } from 'react';
import { Form, Head } from '@inertiajs/react';
import {
    IconCloudDownload,
    IconDatabase,
    IconFolder,
    IconTrash,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    index as backupIndex,
    destroy,
    download,
    runDatabase,
    runStorage,
} from '@/routes/admin/backup';

interface Backup {
    name: string;
    size: string;
    date: string;
}

interface Props {
    backups: Backup[];
}

export default function BackupPage({ backups }: Props) {
    const [deleteBackup, setDeleteBackup] = useState<Backup | null>(null);

    return (
        <>
            <Head title="Backup" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <h1 className="text-xl font-semibold">Backup</h1>

                <div className="grid gap-4 sm:grid-cols-2">
                    <Card className="shadow-none">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <IconDatabase className="size-5 text-muted-foreground" />
                                <CardTitle className="text-base">
                                    Banco de Dados
                                </CardTitle>
                            </div>
                            <CardDescription>
                                Gera um dump do banco de dados em formato ZIP.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form action={runDatabase()}>
                                {({ processing }) => (
                                    <Button disabled={processing}>
                                        {processing
                                            ? 'Executando...'
                                            : 'Executar Backup'}
                                    </Button>
                                )}
                            </Form>
                        </CardContent>
                    </Card>

                    <Card className="shadow-none">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <IconFolder className="size-5 text-muted-foreground" />
                                <CardTitle className="text-base">
                                    Storage
                                </CardTitle>
                            </div>
                            <CardDescription>
                                Compacta os arquivos do storage público
                                (uploads, avatares, CVs).
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form action={runStorage()}>
                                {({ processing }) => (
                                    <Button disabled={processing}>
                                        {processing
                                            ? 'Executando...'
                                            : 'Executar Backup'}
                                    </Button>
                                )}
                            </Form>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <h2 className="mb-3 text-base font-medium">
                        Backups existentes
                    </h2>
                    {backups.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            Nenhum backup encontrado.
                        </p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Arquivo</TableHead>
                                    <TableHead>Tamanho</TableHead>
                                    <TableHead>Data</TableHead>
                                    <TableHead className="w-24">
                                        Ações
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {backups.map((backup) => (
                                    <TableRow key={backup.name}>
                                        <TableCell className="font-mono text-xs">
                                            {backup.name}
                                        </TableCell>
                                        <TableCell>{backup.size}</TableCell>
                                        <TableCell>{backup.date}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    asChild
                                                >
                                                    <a
                                                        href={download.url({
                                                            file: backup.name,
                                                        })}
                                                    >
                                                        <IconCloudDownload className="size-4" />
                                                    </a>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        setDeleteBackup(backup)
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
                    )}
                </div>
            </div>

            <Dialog
                open={!!deleteBackup}
                onOpenChange={() => setDeleteBackup(null)}
            >
                <DialogContent>
                    <DialogTitle>Excluir backup</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir o arquivo{' '}
                        <span className="font-medium text-foreground">
                            {deleteBackup?.name}
                        </span>
                        ? Essa ação não pode ser desfeita.
                    </DialogDescription>
                    {deleteBackup && (
                        <Form
                            action={destroy({ file: deleteBackup.name })}
                            onSuccess={() => setDeleteBackup(null)}
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

BackupPage.layout = {
    breadcrumbs: [
        {
            title: 'Backup',
            href: backupIndex(),
        },
    ],
};
