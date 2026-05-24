import { Head, setLayoutProps } from '@inertiajs/react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard } from '@/routes';

interface Message {
    id: number;
    type: 'bug' | 'contato' | 'emprego';
    subject: string;
    sender_email: string;
    body: string | null;
    created_at: string;
}

interface Props {
    message: Message;
}

const TIPO_VARIANT: Record<Message['type'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
    contato: 'default',
    bug: 'destructive',
    emprego: 'outline',
};

const TIPO_LABEL: Record<Message['type'], string> = {
    contato: 'Contato',
    bug: 'Bug',
    emprego: 'Emprego',
};

export default function ShowMessage({ message }: Props) {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: dashboard() },
            { title: message.subject },
        ],
    });

    return (
        <>
            <Head title={message.subject} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="mx-auto w-full max-w-3xl space-y-6">
                    <div className="flex items-center gap-3">
                        <Badge variant={TIPO_VARIANT[message.type]}>
                            {TIPO_LABEL[message.type]}
                        </Badge>
                        <h1 className="text-xl font-semibold">{message.subject}</h1>
                    </div>

                    <Card className="shadow-none">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Remetente
                            </CardTitle>
                        </CardHeader>
                        <CardContent>{message.sender_email}</CardContent>
                    </Card>

                    <Card className="shadow-none">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Enviado em
                            </CardTitle>
                        </CardHeader>
                        <CardContent>{message.created_at}</CardContent>
                    </Card>

                    <Card className="shadow-none">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Mensagem
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="whitespace-pre-wrap">{message.body}</CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
