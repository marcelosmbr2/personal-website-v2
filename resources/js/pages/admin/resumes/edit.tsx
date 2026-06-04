import { Head, setLayoutProps } from '@inertiajs/react';
import type { ResumeContent } from '@/components/resume-pdf';
import ResumeBuilder from './resume-builder';
import { index as resumesIndex, update } from '@/routes/admin/resumes';

interface Resume {
    id: number;
    name: string;
    language: string;
    status: string;
    content: ResumeContent | null;
}

interface Props {
    resume: Resume;
}

export default function EditResume({ resume }: Props) {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Currículos', href: resumesIndex() },
            { title: resume.name },
            { title: 'Editar' },
        ],
    });

    return (
        <>
            <Head title={`Editar — ${resume.name}`} />
            <ResumeBuilder
                initialContent={resume.content}
                initialMeta={{
                    id: resume.id,
                    name: resume.name,
                    language: resume.language,
                    status: resume.status,
                }}
                submitUrl={update.url({ resume: resume.id })}
                submitMethod="put"
            />
        </>
    );
}
