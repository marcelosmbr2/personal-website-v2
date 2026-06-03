import { useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { IconChevronDown, IconChevronUp, IconPlus, IconTrash } from '@tabler/icons-react';
import { router } from '@inertiajs/react';
import type { ResumeContent, ResumeSkill, ResumeExperience, ResumeEducation, ResumeCourse, ResumePublication, ResumeProject } from '@/components/resume-pdf';
import { ResumePDF } from '@/components/resume-pdf';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useDebounce } from '@/hooks/use-debounce';
import { store as resumesStore } from '@/routes/admin/resumes';

const DEFAULT_CONTENT: ResumeContent = {
    header: {
        name: 'Marcelo Moreira',
        title: 'Desenvolvedor PHP',
        location: 'Caxias do Sul, RS',
        email: 'marcelosmbr.dev@outlook.com',
        phone: '(53) 991082653',
        linkedin: 'https://www.linkedin.com/in/marcelosmbr/',
        website: 'https://marcelosmbr.vercel.app/',
        github: 'https://github.com/Marcelosmbr2',
    },
    summary:
        'Desenvolvedor full-stack especializado em PHP/Laravel e React/TypeScript. Tenho formação em Licenciatura em Computação e hoje também atuo como professor técnico no Senac RS.',
    skills: [
        { category: 'Interpessoais', items: 'Escrita, resolução de problemas, proatividade, comunicação, trabalho em equipe.' },
        { category: 'Linguagens', items: 'Português Nativo, Inglês B1.' },
        { category: 'Linguagens de Programação', items: 'PHP, Javascript, Typescript, Python, Java.' },
        { category: 'Frontend', items: 'HTML5, CSS3, Tailwind CSS, React, Next.js, Vue.js.' },
        { category: 'Backend', items: 'Laravel, Node.js, Express.js, Nest.js, MySQL, PostgreSQL, MongoDB, Redis.' },
        { category: 'DevOps', items: 'Git, Github, Docker, CI/CD, Testes Automatizados, AWS.' },
        { category: 'Inteligência Artificial', items: 'Agentes de LLM (ex. Claude Code), n8n.' },
        { category: 'Outros', items: 'Wordpress, Microsoft Office.' },
    ],
    experiences: [
        {
            title: 'Orientador de Educação Profissional',
            company: 'Senac RS',
            period: '03/2026 – presente',
            location: 'Caxias do Sul, RS',
            description:
                'Atuo como instrutor de TI no curso Técnico em Desenvolvimento de Sistemas (TDS) e Informática Básica, sendo responsável pelo ensino de programação, desenvolvimento web e demais disciplinas da área. Além disso, estou atuando como treinador de alunos selecionados para as competições regionais promovidas pelo SENAC.',
            tags: 'Docência, Informática Básica, Desenvolvimento de Sistemas',
        },
        {
            title: 'Desenvolvedor PHP',
            company: 'Voleyo',
            period: '11/2024 – Presente',
            location: 'Remoto',
            description:
                'Desenvolvimento de uma plataforma de gestão esportiva que conecta clubes e atletas em um único ambiente digital, eliminando intermediários e simplificando a comunicação entre as partes.\nA solução oferece ferramentas completas para administração de clubes, gestão de atletas, partidas, comandas, torneios, facilitação de interações diretas entre diversas outras funcionalidades.',
            tags: 'PHP, Laravel, Inertia, React, Typescript, HTML5, CSS3, TailwindCSS, MySQL, Github, Docker, CI/CD, Laravel Cloud',
        },
        {
            title: 'Bolsista Residência Pedagógica',
            company: 'Capes - Colégio Municipal Pelotense',
            period: '11/2022 – 04/2024',
            location: 'Pelotas, RS',
            description:
                'Atuei como instrutor de inclusão digital para adultos em processo de requalificação profissional, ajudando pessoas a conquistarem autonomia no ambiente digital e ampliarem suas oportunidades no mercado de trabalho.',
            tags: 'Docência, Informática Básica',
        },
        {
            title: 'Desenvolvedor PHP',
            company: 'BirdView Drone BioControl',
            period: '07/2023 – 02/2024',
            location: 'Remoto',
            description:
                'A arquitetura da aplicação foi aprimorada, melhorando significativamente a confiabilidade, performance e organização do código.\nO sistema de planejamento de missões de drones e o software de rotas de voo foi redesenhado, tornando as interfaces mais intuitivas e reduzindo a curva de aprendizado para os operadores. Também fui responsável pela gestão da infraestrutura em produção, garantindo estabilidade e disponibilidade contínua enquanto desenvolvia e otimizava funcionalidades conforme as demandas do time evoluíam.',
            tags: 'PHP, Laravel, Inertia, React, Typescript, HTML5, CSS3, TailwindCSS, MySQL, Github, Docker, CI/CD, DigitalOcean',
        },
        {
            title: 'Bolsista de Desenvolvimento Tecnológico',
            company: 'IFSUL',
            period: '08/2021 – 07/2023',
            location: 'Remoto',
            description:
                'Participei do desenvolvimento de uma plataforma especializada em gestão de missões de drones para controle biológico de pragas na agricultura.\nFui responsável pelo planejamento interativo de rotas de voo, controle de acesso por perfil de usuário, separando permissões entre administradores, pilotos e clientes, além de todo o ciclo de cadastro de equipamentos, atribuição de missões e geração automatizada de relatórios a partir dos logs de voo.\nA arquitetura foi projetada para suportar múltiplos clientes de forma isolada, garantindo segurança e independência dos dados entre as operações.',
            tags: 'PHP, Laravel, React, Javascript, HTML5, CSS3, MySQL, Github',
        },
        {
            title: 'Desenvolvedor PHP',
            company: 'Escola Mario Quintana',
            period: '04/2021 – 08/2021',
            location: 'Pelotas, RS',
            description:
                'Na Escola Mario Quintana, colaborei com a equipe interna de TI no desenvolvimento e expansão da plataforma de gestão de ordens de serviço da instituição.\nTrabalhei na construção de novos módulos dentro de uma arquitetura MVC da aplicação, implementando tanto a lógica de negócio no backend quanto as interfaces de uso no frontend. Também fui responsável pela criação de documentação técnica detalhada, garantindo a manutenibilidade e a continuidade dos módulos desenvolvidos a longo prazo.',
            tags: 'PHP, SQL, Javascript, Jquery, HTML5, CSS3, Bootstrap',
        },
        {
            title: 'Bolsista PIBID',
            company: 'Capes - IFSUL',
            period: '08/2018 – 01/2020',
            location: 'Pelotas',
            description: 'Desenvolvimento de jogos com scratch para o ensino de algoritmos e lógica de programação.',
            tags: 'Docência, Informática Básica, Scratch',
        },
    ],
    education: [
        {
            degree: 'Licenciatura em Computação',
            institution: 'IFSUL - Instituto Federal Sul-rio-grandense',
            period: '2018 – 2025',
            location: 'Pelotas, RS',
            description:
                'Formação destinada ao exercício da docência em escolas públicas (estaduais, municipais e federais) e particulares. O currículo abrange a área tecnológica em computação acompanhada dos saberes pedagógicos.',
        },
    ],
    courses: [
        {
            name: 'Pós Graduação em Engenharia e Arquitetura de Software',
            platform: 'UCPel',
            period: '05/2026 – Presente',
            link: '',
            description:
                'A pós-graduação em Engenharia e Arquitetura de Software é um curso EAD voltado à formação de profissionais capazes de projetar, desenvolver e estruturar sistemas modernos, escaláveis e alinhados às boas práticas da engenharia de software.',
            tags: '',
        },
        {
            name: 'Engenharia de Agentes de IA',
            platform: 'Alura',
            period: '05/2026 – presente',
            link: '',
            description:
                'Essa formação prepara profissionais para desenvolver agentes de IA utilizando Python, LangChain, APIs de LLMs, RAG, machine learning, MLOps e cloud computing.',
            tags: '',
        },
        {
            name: 'Carreira Desenvolvimento Back-End PHP',
            platform: 'Alura',
            period: '',
            link: '',
            description: '',
            tags: 'PHP, Orientação a Objetos, Laravel, Symfony, Arquitetura de Software, Padrões de Projeto, Testes, DevOps',
        },
        {
            name: 'Formação Engenharia de software',
            platform: 'Alura',
            period: '',
            link: '',
            description: '',
            tags: 'Gestão de Requisitos, Arquitetura e Design de Sistemas, Padrões de Projeto, Banco de Dados, Testes de Software, Gestão de Projetos, Infraestrutura e Deploy',
        },
        {
            name: 'Formação DevOps',
            platform: 'Alura',
            period: '',
            link: '',
            description: '',
            tags: 'Virtualização e Provisionamento, Containerização, Integração e Entrega Contínua (CI/CD), Monitoramento',
        },
    ],
    publications: null,
    projects: null,
};

interface Meta {
    id?: number;
    name: string;
    language: string;
    status: string;
    published: boolean;
}

interface Props {
    initialContent: ResumeContent | null;
    initialMeta?: Meta;
    submitUrl: string;
    submitMethod: 'post' | 'put';
}

function SectionCard({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="rounded-lg border bg-card">
            <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium"
                onClick={() => setOpen((v) => !v)}
            >
                {title}
                {open ? <IconChevronUp className="size-4" /> : <IconChevronDown className="size-4" />}
            </button>
            {open && <div className="border-t px-4 py-4 space-y-3">{children}</div>}
        </div>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="grid gap-1">
            <Label className="text-xs text-muted-foreground">{label}</Label>
            {children}
        </div>
    );
}

export default function ResumeBuilder({ initialContent, initialMeta, submitUrl, submitMethod }: Props) {
    const [meta, setMeta] = useState<Meta>(
        initialMeta ?? { name: '', language: 'pt-BR', status: 'draft', published: false },
    );
    const [content, setContent] = useState<ResumeContent>(initialContent ?? DEFAULT_CONTENT);
    const [saving, setSaving] = useState(false);
    const debouncedContent = useDebounce(content, 400);

    function updateHeader(field: keyof ResumeContent['header'], value: string) {
        setContent((c) => ({ ...c, header: { ...c.header, [field]: value } }));
    }

    // --- Skills ---
    function addSkill() {
        setContent((c) => ({ ...c, skills: [...c.skills, { category: '', items: '' }] }));
    }
    function updateSkill(i: number, field: keyof ResumeSkill, value: string) {
        setContent((c) => {
            const skills = [...c.skills];
            skills[i] = { ...skills[i], [field]: value };
            return { ...c, skills };
        });
    }
    function removeSkill(i: number) {
        setContent((c) => ({ ...c, skills: c.skills.filter((_, idx) => idx !== i) }));
    }

    // --- Experiences ---
    function addExp() {
        setContent((c) => ({ ...c, experiences: [...c.experiences, { title: '', company: '', period: '', location: '', description: '', tags: '' }] }));
    }
    function updateExp(i: number, field: keyof ResumeExperience, value: string) {
        setContent((c) => {
            const experiences = [...c.experiences];
            experiences[i] = { ...experiences[i], [field]: value };
            return { ...c, experiences };
        });
    }
    function removeExp(i: number) {
        setContent((c) => ({ ...c, experiences: c.experiences.filter((_, idx) => idx !== i) }));
    }

    // --- Education ---
    function addEdu() {
        setContent((c) => ({ ...c, education: [...c.education, { degree: '', institution: '', period: '', location: '', description: '' }] }));
    }
    function updateEdu(i: number, field: keyof ResumeEducation, value: string) {
        setContent((c) => {
            const education = [...c.education];
            education[i] = { ...education[i], [field]: value };
            return { ...c, education };
        });
    }
    function removeEdu(i: number) {
        setContent((c) => ({ ...c, education: c.education.filter((_, idx) => idx !== i) }));
    }

    // --- Courses ---
    function addCourse() {
        setContent((c) => ({ ...c, courses: [...c.courses, { name: '', platform: '', period: '', link: '', description: '', tags: '' }] }));
    }
    function updateCourse(i: number, field: keyof ResumeCourse, value: string) {
        setContent((c) => {
            const courses = [...c.courses];
            courses[i] = { ...courses[i], [field]: value };
            return { ...c, courses };
        });
    }
    function removeCourse(i: number) {
        setContent((c) => ({ ...c, courses: c.courses.filter((_, idx) => idx !== i) }));
    }

    // --- Publications ---
    function addPub() {
        setContent((c) => ({ ...c, publications: [...(c.publications ?? []), { title: '', publisher: '', period: '', description: '', link: '' }] }));
    }
    function updatePub(i: number, field: keyof ResumePublication, value: string) {
        setContent((c) => {
            const publications = [...(c.publications ?? [])];
            publications[i] = { ...publications[i], [field]: value };
            return { ...c, publications };
        });
    }
    function removePub(i: number) {
        setContent((c) => ({ ...c, publications: (c.publications ?? []).filter((_, idx) => idx !== i) }));
    }

    // --- Projects ---
    function addProj() {
        setContent((c) => ({ ...c, projects: [...(c.projects ?? []), { name: '', link: '', period: '', description: '', tags: '' }] }));
    }
    function updateProj(i: number, field: keyof ResumeProject, value: string) {
        setContent((c) => {
            const projects = [...(c.projects ?? [])];
            projects[i] = { ...projects[i], [field]: value };
            return { ...c, projects };
        });
    }
    function removeProj(i: number) {
        setContent((c) => ({ ...c, projects: (c.projects ?? []).filter((_, idx) => idx !== i) }));
    }

    function handleSave() {
        setSaving(true);
        const payload = { ...meta, content } as unknown as Parameters<typeof router.put>[1];
        if (submitMethod === 'put') {
            router.put(submitUrl, payload, { onFinish: () => setSaving(false) });
        } else {
            router.post(submitUrl, payload, { onFinish: () => setSaving(false) });
        }
    }

    const pdfDoc = <ResumePDF data={debouncedContent} />;

    return (
        <div className="flex h-full overflow-hidden">
            {/* Left panel — form */}
            <div className="w-1/2 overflow-y-auto border-r p-4 space-y-3">
                {/* Metadata */}
                <SectionCard title="Metadados do currículo">
                    <Field label="Nome do arquivo">
                        <Input
                            value={meta.name}
                            onChange={(e) => setMeta((m) => ({ ...m, name: e.target.value }))}
                            placeholder="Ex: Currículo PT-BR 2025"
                        />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Idioma">
                            <Select value={meta.language} onValueChange={(v) => setMeta((m) => ({ ...m, language: v }))}>
                                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pt-BR">Português</SelectItem>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="es">Español</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="Status">
                            <Select value={meta.status} onValueChange={(v) => setMeta((m) => ({ ...m, status: v }))}>
                                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Rascunho</SelectItem>
                                    <SelectItem value="active">Ativo</SelectItem>
                                    <SelectItem value="archived">Arquivado</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="published"
                            checked={meta.published}
                            onCheckedChange={(v) => setMeta((m) => ({ ...m, published: !!v }))}
                        />
                        <Label htmlFor="published" className="text-xs">Publicado</Label>
                    </div>
                </SectionCard>

                {/* Header */}
                <SectionCard title="Informações pessoais">
                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Nome completo">
                            <Input value={content.header.name} onChange={(e) => updateHeader('name', e.target.value)} placeholder="Marcelo Moreira" />
                        </Field>
                        <Field label="Cargo / Título">
                            <Input value={content.header.title} onChange={(e) => updateHeader('title', e.target.value)} placeholder="Desenvolvedor PHP" />
                        </Field>
                        <Field label="Localização">
                            <Input value={content.header.location} onChange={(e) => updateHeader('location', e.target.value)} placeholder="Caxias do Sul, RS" />
                        </Field>
                        <Field label="E-mail">
                            <Input type="email" value={content.header.email} onChange={(e) => updateHeader('email', e.target.value)} placeholder="email@exemplo.com" />
                        </Field>
                        <Field label="Telefone">
                            <Input value={content.header.phone} onChange={(e) => updateHeader('phone', e.target.value)} placeholder="(00) 000000000" />
                        </Field>
                        <Field label="LinkedIn">
                            <Input value={content.header.linkedin} onChange={(e) => updateHeader('linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." />
                        </Field>
                        <Field label="Website">
                            <Input value={content.header.website} onChange={(e) => updateHeader('website', e.target.value)} placeholder="https://..." />
                        </Field>
                        <Field label="GitHub">
                            <Input value={content.header.github} onChange={(e) => updateHeader('github', e.target.value)} placeholder="https://github.com/..." />
                        </Field>
                    </div>
                </SectionCard>

                {/* Summary */}
                <SectionCard title="Resumo">
                    <Textarea
                        rows={4}
                        value={content.summary}
                        onChange={(e) => setContent((c) => ({ ...c, summary: e.target.value }))}
                        placeholder="Descreva seu perfil profissional..."
                    />
                </SectionCard>

                {/* Skills */}
                <SectionCard title="Habilidades">
                    {content.skills.map((skill, i) => (
                        <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-start">
                            <Input
                                value={skill.category}
                                onChange={(e) => updateSkill(i, 'category', e.target.value)}
                                placeholder="Categoria"
                            />
                            <Input
                                value={skill.items}
                                onChange={(e) => updateSkill(i, 'items', e.target.value)}
                                placeholder="Item1, Item2..."
                            />
                            <Button variant="ghost" size="icon" onClick={() => removeSkill(i)}>
                                <IconTrash className="size-4 text-destructive" />
                            </Button>
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addSkill} className="w-full">
                        <IconPlus className="size-4 mr-1" /> Adicionar categoria
                    </Button>
                </SectionCard>

                {/* Experiences */}
                <SectionCard title="Experiência Profissional">
                    {content.experiences.map((exp, i) => (
                        <div key={i} className="rounded border p-3 space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-medium text-muted-foreground">Experiência {i + 1}</span>
                                <Button variant="ghost" size="icon" onClick={() => removeExp(i)}>
                                    <IconTrash className="size-4 text-destructive" />
                                </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Field label="Cargo"><Input value={exp.title} onChange={(e) => updateExp(i, 'title', e.target.value)} placeholder="Desenvolvedor PHP" /></Field>
                                <Field label="Empresa"><Input value={exp.company} onChange={(e) => updateExp(i, 'company', e.target.value)} placeholder="Acme Corp" /></Field>
                                <Field label="Período"><Input value={exp.period} onChange={(e) => updateExp(i, 'period', e.target.value)} placeholder="01/2023 – Presente" /></Field>
                                <Field label="Localização"><Input value={exp.location} onChange={(e) => updateExp(i, 'location', e.target.value)} placeholder="Remoto" /></Field>
                            </div>
                            <Field label="Descrição">
                                <Textarea rows={3} value={exp.description} onChange={(e) => updateExp(i, 'description', e.target.value)} placeholder="Descreva suas atividades..." />
                            </Field>
                            <Field label="Tags (separadas por vírgula)">
                                <Input value={exp.tags} onChange={(e) => updateExp(i, 'tags', e.target.value)} placeholder="PHP, Laravel, React" />
                            </Field>
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addExp} className="w-full">
                        <IconPlus className="size-4 mr-1" /> Adicionar experiência
                    </Button>
                </SectionCard>

                {/* Education */}
                <SectionCard title="Educação">
                    {content.education.map((edu, i) => (
                        <div key={i} className="rounded border p-3 space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-medium text-muted-foreground">Formação {i + 1}</span>
                                <Button variant="ghost" size="icon" onClick={() => removeEdu(i)}>
                                    <IconTrash className="size-4 text-destructive" />
                                </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Field label="Grau / Curso"><Input value={edu.degree} onChange={(e) => updateEdu(i, 'degree', e.target.value)} placeholder="Licenciatura em Computação" /></Field>
                                <Field label="Instituição"><Input value={edu.institution} onChange={(e) => updateEdu(i, 'institution', e.target.value)} placeholder="IFSUL" /></Field>
                                <Field label="Período"><Input value={edu.period} onChange={(e) => updateEdu(i, 'period', e.target.value)} placeholder="2018 – 2025" /></Field>
                                <Field label="Localização"><Input value={edu.location} onChange={(e) => updateEdu(i, 'location', e.target.value)} placeholder="Pelotas, RS" /></Field>
                            </div>
                            <Field label="Descrição">
                                <Textarea rows={2} value={edu.description} onChange={(e) => updateEdu(i, 'description', e.target.value)} placeholder="Descrição da formação..." />
                            </Field>
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addEdu} className="w-full">
                        <IconPlus className="size-4 mr-1" /> Adicionar formação
                    </Button>
                </SectionCard>

                {/* Courses */}
                <SectionCard title="Cursos">
                    {content.courses.map((course, i) => (
                        <div key={i} className="rounded border p-3 space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-medium text-muted-foreground">Curso {i + 1}</span>
                                <Button variant="ghost" size="icon" onClick={() => removeCourse(i)}>
                                    <IconTrash className="size-4 text-destructive" />
                                </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Field label="Nome"><Input value={course.name} onChange={(e) => updateCourse(i, 'name', e.target.value)} placeholder="Nome do curso" /></Field>
                                <Field label="Plataforma"><Input value={course.platform} onChange={(e) => updateCourse(i, 'platform', e.target.value)} placeholder="Udemy, Alura..." /></Field>
                                <Field label="Período"><Input value={course.period} onChange={(e) => updateCourse(i, 'period', e.target.value)} placeholder="05/2026" /></Field>
                                <Field label="Link"><Input value={course.link} onChange={(e) => updateCourse(i, 'link', e.target.value)} placeholder="https://..." /></Field>
                            </div>
                            <Field label="Descrição">
                                <Textarea rows={2} value={course.description} onChange={(e) => updateCourse(i, 'description', e.target.value)} placeholder="Descrição do curso..." />
                            </Field>
                            <Field label="Tags (separadas por vírgula)">
                                <Input value={course.tags} onChange={(e) => updateCourse(i, 'tags', e.target.value)} placeholder="PHP, Laravel" />
                            </Field>
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addCourse} className="w-full">
                        <IconPlus className="size-4 mr-1" /> Adicionar curso
                    </Button>
                </SectionCard>

                {/* Publications — optional */}
                <div className="rounded-lg border bg-card">
                    <div className="flex items-center justify-between px-4 py-3">
                        <span className="text-sm font-medium">Publicações</span>
                        <Checkbox
                            checked={content.publications !== null}
                            onCheckedChange={(v) =>
                                setContent((c) => ({ ...c, publications: v ? [] : null }))
                            }
                        />
                    </div>
                    {content.publications != null && (
                        <div className="border-t px-4 py-4 space-y-3">
                            {content.publications.map((pub, i) => (
                                <div key={i} className="rounded border p-3 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-medium text-muted-foreground">Publicação {i + 1}</span>
                                        <Button variant="ghost" size="icon" onClick={() => removePub(i)}>
                                            <IconTrash className="size-4 text-destructive" />
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Field label="Título"><Input value={pub.title} onChange={(e) => updatePub(i, 'title', e.target.value)} placeholder="Título" /></Field>
                                        <Field label="Publicadora"><Input value={pub.publisher} onChange={(e) => updatePub(i, 'publisher', e.target.value)} placeholder="Medium, Dev.to..." /></Field>
                                        <Field label="Período"><Input value={pub.period} onChange={(e) => updatePub(i, 'period', e.target.value)} placeholder="05/2025" /></Field>
                                        <Field label="Link"><Input value={pub.link} onChange={(e) => updatePub(i, 'link', e.target.value)} placeholder="https://..." /></Field>
                                    </div>
                                    <Field label="Descrição">
                                        <Textarea rows={2} value={pub.description} onChange={(e) => updatePub(i, 'description', e.target.value)} />
                                    </Field>
                                </div>
                            ))}
                            <Button variant="outline" size="sm" onClick={addPub} className="w-full">
                                <IconPlus className="size-4 mr-1" /> Adicionar publicação
                            </Button>
                        </div>
                    )}
                </div>

                {/* Projects — optional */}
                <div className="rounded-lg border bg-card">
                    <div className="flex items-center justify-between px-4 py-3">
                        <span className="text-sm font-medium">Projetos</span>
                        <Checkbox
                            checked={content.projects !== null}
                            onCheckedChange={(v) =>
                                setContent((c) => ({ ...c, projects: v ? [] : null }))
                            }
                        />
                    </div>
                    {content.projects != null && (
                        <div className="border-t px-4 py-4 space-y-3">
                            {content.projects.map((proj, i) => (
                                <div key={i} className="rounded border p-3 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-medium text-muted-foreground">Projeto {i + 1}</span>
                                        <Button variant="ghost" size="icon" onClick={() => removeProj(i)}>
                                            <IconTrash className="size-4 text-destructive" />
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Field label="Nome"><Input value={proj.name} onChange={(e) => updateProj(i, 'name', e.target.value)} placeholder="Nome do projeto" /></Field>
                                        <Field label="Link"><Input value={proj.link} onChange={(e) => updateProj(i, 'link', e.target.value)} placeholder="https://..." /></Field>
                                        <Field label="Período"><Input value={proj.period} onChange={(e) => updateProj(i, 'period', e.target.value)} placeholder="2024 – Presente" /></Field>
                                    </div>
                                    <Field label="Descrição">
                                        <Textarea rows={2} value={proj.description} onChange={(e) => updateProj(i, 'description', e.target.value)} placeholder="Descrição do projeto..." />
                                    </Field>
                                    <Field label="Tags (separadas por vírgula)">
                                        <Input value={proj.tags} onChange={(e) => updateProj(i, 'tags', e.target.value)} placeholder="React, TypeScript" />
                                    </Field>
                                </div>
                            ))}
                            <Button variant="outline" size="sm" onClick={addProj} className="w-full">
                                <IconPlus className="size-4 mr-1" /> Adicionar projeto
                            </Button>
                        </div>
                    )}
                </div>

                {/* Save + Download */}
                <div className="pb-4">
                    <Button onClick={handleSave} disabled={saving} className="w-full">
                        {saving ? 'Salvando...' : 'Salvar'}
                    </Button>
                </div>
            </div>

            {/* Right panel — PDF preview */}
            <div className="w-1/2 bg-muted/30">
                <PDFViewer width="100%" height="100%" showToolbar={false}>
                    {pdfDoc}
                </PDFViewer>
            </div>
        </div>
    );
}
