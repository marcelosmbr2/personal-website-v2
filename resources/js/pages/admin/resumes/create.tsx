import { Head } from '@inertiajs/react';
import ResumeBuilder from './resume-builder';
import {
    create as resumesCreate,
    index as resumesIndex,
    store,
} from '@/routes/admin/resumes';

export default function CreateResume() {
    return (
        <>
            <Head title="Novo Currículo" />
            <ResumeBuilder
                initialContent={null}
                submitUrl={store.url()}
                submitMethod="post"
            />
        </>
    );
}

CreateResume.layout = {
    breadcrumbs: [
        { title: 'Currículos', href: resumesIndex() },
        { title: 'Novo Currículo', href: resumesCreate() },
    ],
};
