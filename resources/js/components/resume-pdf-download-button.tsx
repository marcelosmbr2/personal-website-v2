import { PDFDownloadLink } from '@react-pdf/renderer';
import { IconDownload } from '@/components/icons';
import { ResumePDF, type ResumeContent } from '@/components/resume-pdf';
import { Button } from '@/components/ui/button';

export function ResumePdfDownloadButton({ content, name }: { content: ResumeContent; name: string }) {
    return (
        <PDFDownloadLink document={<ResumePDF data={content} />} fileName={`${name}.pdf`}>
            {({ loading }) => (
                <Button variant="ghost" size="sm" disabled={loading}>
                    <IconDownload className="size-4" />
                </Button>
            )}
        </PDFDownloadLink>
    );
}
