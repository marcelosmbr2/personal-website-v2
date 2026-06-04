import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    IconBug,
    IconBriefcase,
    IconEye,
    IconMail,
    IconMailbox,
} from '@tabler/icons-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { dashboard } from '@/routes';
import { show as messagesShow } from '@/routes/admin/messages';

interface Message {
    id: number;
    type: 'bug' | 'contato' | 'emprego';
    subject: string;
    sender_email: string;
    created_at: string;
}

interface DashboardProps {
    messagesTotal: number;
    messagesBugCount: number;
    messagesContatoCount: number;
    messagesEmpregoCount: number;
    recentMessages: Message[];
}

const TIPO_VARIANT: Record<
    Message['type'],
    'default' | 'secondary' | 'destructive' | 'outline'
> = {
    contato: 'default',
    bug: 'destructive',
    emprego: 'outline',
};

const TIPO_LABEL: Record<Message['type'], string> = {
    contato: 'Contato',
    bug: 'Bug',
    emprego: 'Emprego',
};

export default function Dashboard({
    messagesTotal,
    messagesBugCount,
    messagesContatoCount,
    messagesEmpregoCount,
    recentMessages,
}: DashboardProps) {
    const [search, setSearch] = useState('');
    const [filterTipo, setFilterTipo] = useState('todas');
    const [filterData, setFilterData] = useState('mes');

    const filteredMessages = recentMessages.filter((msg) => {
        const matchesSearch =
            msg.subject.toLowerCase().includes(search.toLowerCase()) ||
            msg.sender_email.toLowerCase().includes(search.toLowerCase());

        const matchesTipo = filterTipo === 'todas' || msg.type === filterTipo;

        const createdAt = new Date(msg.created_at);
        const now = new Date();
        const diffMs = now.getTime() - createdAt.getTime();
        const matchesData =
            filterData === 'semana'
                ? diffMs <= 7 * 24 * 60 * 60 * 1000
                : filterData === '24h'
                  ? diffMs <= 24 * 60 * 60 * 1000
                  : diffMs <= 30 * 24 * 60 * 60 * 1000;

        return matchesSearch && matchesTipo && matchesData;
    });

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <Card className="shadow-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Mensagens
                            </CardTitle>
                            <IconMailbox className="size-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">
                                {messagesTotal}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Contato
                            </CardTitle>
                            <IconMail className="size-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">
                                {messagesContatoCount}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Bug
                            </CardTitle>
                            <IconBug className="size-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">
                                {messagesBugCount}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Emprego
                            </CardTitle>
                            <IconBriefcase className="size-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">
                                {messagesEmpregoCount}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex-1 space-y-3">
                    <h2 className="text-base font-semibold">
                        Mensagens recentes
                    </h2>

                    <Input
                        placeholder="Pesquisar por assunto ou remetente..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="flex gap-2">
                        <Select
                            value={filterTipo}
                            onValueChange={setFilterTipo}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todas">Todas</SelectItem>
                                <SelectItem value="bug">Bug</SelectItem>
                                <SelectItem value="contato">Contato</SelectItem>
                                <SelectItem value="emprego">Emprego</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={filterData}
                            onValueChange={setFilterData}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mes">Último mês</SelectItem>
                                <SelectItem value="semana">
                                    Última semana
                                </SelectItem>
                                <SelectItem value="24h">Há 24 horas</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Assunto</TableHead>
                                <TableHead>Remetente</TableHead>
                                <TableHead>Enviado em</TableHead>
                                <TableHead className="w-12"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredMessages.map((msg) => (
                                <TableRow key={msg.id}>
                                    <TableCell>
                                        <Badge variant={TIPO_VARIANT[msg.type]}>
                                            {TIPO_LABEL[msg.type]}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{msg.subject}</TableCell>
                                    <TableCell>{msg.sender_email}</TableCell>
                                    <TableCell>{msg.created_at}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                        >
                                            <Link href={messagesShow(msg)}>
                                                <IconEye className="size-4" />
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
