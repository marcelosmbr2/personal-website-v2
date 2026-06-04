import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface Props {
    name: string;
    defaultValue?: string;
}

export default function QuillEditor({ name, defaultValue = '' }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const hiddenRef = useRef<HTMLInputElement>(null);
    const quillRef = useRef<Quill | null>(null);

    useEffect(() => {
        if (!containerRef.current || quillRef.current) return;

        const quill = new Quill(containerRef.current, { theme: 'snow' });

        quill.root.innerHTML = defaultValue;

        if (hiddenRef.current) {
            hiddenRef.current.value = defaultValue;
        }

        quill.on('text-change', () => {
            if (hiddenRef.current) {
                hiddenRef.current.value = quill.root.innerHTML;
            }
        });

        quillRef.current = quill;
    }, []);

    return (
        <>
            <div ref={containerRef} className="w-full" />
            <input
                type="hidden"
                name={name}
                ref={hiddenRef}
                defaultValue={defaultValue}
            />
        </>
    );
}
