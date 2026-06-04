import { Head } from '@inertiajs/react';
import { PDFViewer } from '@react-pdf/renderer';
import type { ResumeContent } from '@/components/resume-pdf';
import { ResumePDF } from '@/components/resume-pdf';

interface Props {
    resume: {
        id: number;
        name: string;
        content: ResumeContent | null;
    };
}

export default function ShowResume({ resume }: Props) {
    return (
        <>
            <Head title={resume.name} />
            <PDFViewer
                style={{
                    width: '100vw',
                    height: '100vh',
                    border: 'none',
                    display: 'block',
                }}
            >
                <ResumePDF data={resume.content!} />
            </PDFViewer>
        </>
    );
}
