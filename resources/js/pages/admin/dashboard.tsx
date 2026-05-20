import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { IconBug, IconBriefcase, IconMail, IconMailbox } from '@tabler/icons-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { dashboard } from '@/routes';

interface DashboardProps {
    messagesTotal: number;
    messagesBugCount: number;
    messagesContatoCount: number;
    messagesEmpregoCount: number;
}

interface MockMessage {
    id: number;
    tipo: 'Bug' | 'Contato' | 'Emprego';
    assunto: string;
    remetente: string;
    enviadoEm: string;
}

const MOCK_MESSAGES: MockMessage[] = [
    { id: 1, tipo: 'Contato', assunto: 'Proposta de projeto', remetente: 'ana@example.com', enviadoEm: '2026-05-19 14:32' },
    { id: 2, tipo: 'Bug', assunto: 'Erro na página de artigos', remetente: 'joao@example.com', enviadoEm: '2026-05-15 09:15' },
    { id: 3, tipo: 'Emprego', assunto: 'Vaga de desenvolvedor sênior', remetente: 'rh@empresa.com', enviadoEm: '2026-05-14 18:00' },
    { id: 4, tipo: 'Contato', assunto: 'Feedback do portfólio', remetente: 'pedro@example.com', enviadoEm: '2026-04-25 11:45' },
    { id: 5, tipo: 'Bug', assunto: 'Imagens não carregam no mobile', remetente: 'clara@example.com', enviadoEm: '2026-04-22 08:20' },
];

const TIPO_VARIANT: Record<MockMessage['tipo'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
    Contato: 'default',
    Bug: 'destructive',
    Emprego: 'outline',
};

export default function Dashboard({ messagesTotal, messagesBugCount, messagesContatoCount, messagesEmpregoCount }: DashboardProps) {
    const [search, setSearch] = useState('');
    const [filterTipo, setFilterTipo] = useState('todas');
    const [filterData, setFilterData] = useState('mes');

    const filteredMessages = MOCK_MESSAGES.filter((msg) => {
        const matchesSearch =
            msg.assunto.toLowerCase().includes(search.toLowerCase()) ||
            msg.remetente.toLowerCase().includes(search.toLowerCase());

        const matchesTipo = filterTipo === 'todas' || msg.tipo.toLowerCase() === filterTipo;

        const enviadoEm = new Date(msg.enviadoEm);
        const now = new Date();
        const diffMs = now.getTime() - enviadoEm.getTime();
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
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Mensagens
                            </CardTitle>
                            <IconMailbox className="size-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{messagesTotal}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Contato
                            </CardTitle>
                            <IconMail className="size-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{messagesContatoCount}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Bug
                            </CardTitle>
                            <IconBug className="size-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{messagesBugCount}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Emprego
                            </CardTitle>
                            <IconBriefcase className="size-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{messagesEmpregoCount}</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex-1 space-y-3">
                    <h2 className="text-base font-semibold">Mensagens recentes</h2>

                    <Input
                        placeholder="Pesquisar por assunto ou remetente..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="flex gap-2">
                        <Select value={filterTipo} onValueChange={setFilterTipo}>
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

                        <Select value={filterData} onValueChange={setFilterData}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mes">Último mês</SelectItem>
                                <SelectItem value="semana">Última semana</SelectItem>
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
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredMessages.map((msg) => (
                                <TableRow key={msg.id}>
                                    <TableCell>
                                        <Badge variant={TIPO_VARIANT[msg.tipo]}>{msg.tipo}</Badge>
                                    </TableCell>
                                    <TableCell>{msg.assunto}</TableCell>
                                    <TableCell>{msg.remetente}</TableCell>
                                    <TableCell>{msg.enviadoEm}</TableCell>
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
