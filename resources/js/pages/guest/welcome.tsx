import { Head, Link } from '@inertiajs/react';
import { lazy, Suspense } from 'react';
import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandWhatsapp,
    IconBrandYoutube,
    IconDownload,
    IconMail,
    type TablerIcon,
} from '@/components/icons';
import { Articles } from '@/components/articles';
import type { ResumeContent } from '@/components/resume-pdf';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const ResumePdfDownloadButton = lazy(() =>
    import('@/components/resume-pdf-download-button').then((m) => ({ default: m.ResumePdfDownloadButton })),
);

type Owner = {
    name: string;
    role: string | null;
    bio: string | null;
    avatar: string | null;
    cv_path: string | null;
};

type SocialLink = {
    id: number;
    name: string;
    link: string;
    icon: string;
};

type Skill = {
    id: number;
    name: string;
    category: string;
    icon: string;
};

type Experience = {
    id: number;
    title: string;
    company: string;
    period: string;
    icon: string;
    description: string;
    technologies: string[];
};

type Project = {
    id: number;
    name: string;
    image: string | null;
    description: string;
    technologies: string[];
    link: string | null;
    status: string;
};

type Course = {
    id: number;
    name: string;
    description: string;
    platform: string;
    link: string | null;
    status: string;
};

type Article = {
    id: number;
    name: string;
    description: string;
    external_link: string | null;
    image_url: string | null;
    created_at: string;
};

type Resume = {
    id: number;
    name: string;
    language: string;
    file_path: string | null;
    content: ResumeContent | null;
};

const LANGUAGE_LABEL: Record<string, string> = {
    'pt-BR': 'Português',
    en: 'English',
    es: 'Español',
};

const socialIconMap: Record<string, TablerIcon> = {
    IconMail,
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandWhatsapp,
    IconBrandYoutube,
};

const categoryLabels: Record<string, string> = {
    frontend: 'Frontend:',
    backend: 'Backend:',
    cms: 'CMS:',
    devops: 'DevOps:',
    soft: 'Soft Skills:',
};

const arrowRight = (
    <svg
        className="shrink-0 size-4"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </svg>
);

export default function Welcome({
    owner,
    socialLinks,
    skills,
    experiences,
    projects,
    courses,
    articles,
    resumes,
}: {
    owner: Owner;
    socialLinks: SocialLink[];
    skills: Record<string, Skill[]>;
    experiences: Experience[];
    projects: Project[];
    courses: Course[];
    articles: Article[];
    resumes: Resume[];
}) {
    return (
        <>
            <Head title={owner.name} />
            <div className="w-full max-w-3xl mx-auto pt-4 pb-16 px-4 sm:px-6 lg:px-8">
                {/* Profile */}
                <div id="home" className="flex items-center gap-x-3">
                    <div className="shrink-0">
                        <img
                            className="shrink-0 size-16 rounded-full"
                            src={owner.avatar ?? '/images/avatar.webp'}
                            alt="Avatar"
                        />
                    </div>
                    <div className="grow">
                        <h1 className="text-lg font-medium text-gray-800 dark:text-neutral-200">
                            {owner.name}
                        </h1>
                        {owner.role && (
                            <p className="text-sm text-gray-600 dark:text-neutral-400">
                                {owner.role}
                            </p>
                        )}
                    </div>
                    {resumes.length > 0 && (
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="sm" className="shrink-0">
                                    <IconDownload className="size-4" />
                                    Baixar Currículo
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <SheetHeader>
                                    <SheetTitle>Currículos Disponíveis</SheetTitle>
                                </SheetHeader>
                                <div className="p-2">
                                    {resumes.map((resume) => (
                                        <div
                                            key={resume.id}
                                            className="flex items-center justify-between rounded-lg border p-3"
                                        >
                                            <div>
                                                <p className="text-sm font-medium">{resume.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {LANGUAGE_LABEL[resume.language] ?? resume.language}
                                                </p>
                                            </div>
                                            {resume.file_path ? (
                                                <Button variant="ghost" size="sm" asChild>
                                                    <a
                                                        href={resume.file_path}
                                                        download
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <IconDownload className="size-4" />
                                                    </a>
                                                </Button>
                                            ) : resume.content ? (
                                                <Suspense fallback={null}>
                                                    <ResumePdfDownloadButton content={resume.content} name={resume.name} />
                                                </Suspense>
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    )}
                </div>

                {/* About */}
                <div className="mt-8">
                    {owner.bio?.split('\n\n').map((paragraph, i) => (
                        <p
                            key={i}
                            className={`${i > 0 ? 'mt-3 ' : ''}text-sm text-gray-600 dark:text-neutral-400`}
                        >
                            {paragraph}
                        </p>
                    ))}

                    {/* Social Links */}
                    <div className="mt-5 flex items-center gap-x-4">
                        {socialLinks.map((link) => {
                            const Icon = socialIconMap[link.icon];
                            if (!Icon) return null;
                            const isExternal =
                                link.link &&
                                !link.link.startsWith('mailto:');
                            return (
                                <a
                                    key={link.id}
                                    href={link.link || undefined}
                                    target={
                                        isExternal ? '_blank' : undefined
                                    }
                                    rel={
                                        isExternal
                                            ? 'noopener noreferrer'
                                            : undefined
                                    }
                                    className="inline-flex items-center justify-center size-10 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors dark:text-neutral-400 dark:hover:text-neutral-200 dark:hover:bg-neutral-800"
                                    aria-label={link.name}
                                >
                                    <Icon size={20} />
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Skills */}
                <div id="skills" className="my-10 sm:my-14">
                    <h2 className="mb-5 font-medium text-gray-800 dark:text-neutral-200">
                        Skills
                    </h2>
                    <div className="space-y-3">
                        {Object.entries(skills).map(([category, items]) => (
                            <dl
                                key={category}
                                className="flex flex-col sm:flex-row gap-1"
                            >
                                <dt className="min-w-40">
                                    <span className="block text-sm text-gray-500 dark:text-neutral-500">
                                        {categoryLabels[category] ?? category}
                                    </span>
                                </dt>
                                <dd>
                                    <ul>
                                        {items.map((skill, index) => (
                                            <li
                                                key={skill.id}
                                                className={`me-1 ${index < items.length - 1 ? 'after:content-[","]' : ''} inline-flex items-center text-sm text-gray-800 dark:text-neutral-200`}
                                            >
                                                {skill.icon && (
                                                    <img
                                                        src={skill.icon}
                                                        alt={skill.name}
                                                        className="shrink-0 size-4 me-1"
                                                    />
                                                )}
                                                {skill.name}
                                            </li>
                                        ))}
                                    </ul>
                                </dd>
                            </dl>
                        ))}
                    </div>
                </div>

                {/* Projects */}
                <div id="projects" className="my-10 sm:my-14">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="font-medium text-gray-800 dark:text-neutral-200">
                            Projetos
                        </h2>
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-x-1 text-sm text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
                        >
                            Ver todos
                            {arrowRight}
                        </Link>
                    </div>
                    {projects.length === 0 ? (
                        <p className="text-sm text-gray-500 dark:text-neutral-500">Nenhum projeto encontrado.</p>
                    ) : (
                    <div className="space-y-6">
                        {projects.map((project) => (
                            <article key={project.id} className="group">
                                <a
                                    href={project.link ?? '#'}
                                    className="block"
                                    target={
                                        project.link ? '_blank' : undefined
                                    }
                                    rel={
                                        project.link
                                            ? 'noopener noreferrer'
                                            : undefined
                                    }
                                >
                                    <div className="flex gap-4">
                                        <div className="shrink-0">
                                            <img
                                                className="w-40 h-40 object-cover rounded-lg bg-gray-100 dark:bg-neutral-800"
                                                width={160}
                                                height={160}
                                                src={
                                                    project.image ??
                                                    '/images/projects/laravel.webp'
                                                }
                                                alt={project.name}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs text-gray-500 dark:text-neutral-500">
                                                    {project.status ===
                                                    'Completed'
                                                        ? 'Concluído'
                                                        : 'Em andamento'}
                                                </span>
                                            </div>
                                            <h3 className="font-semibold text-sm text-gray-800 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                                {project.name}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400 line-clamp-2">
                                                {project.description}
                                            </p>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {project.technologies?.map(
                                                    (tech, techIndex) => (
                                                        <span
                                                            key={techIndex}
                                                            className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md dark:bg-neutral-800 dark:text-neutral-300"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </article>
                        ))}
                    </div>
                    )}
                </div>

                {/* Work Experience */}
                <div id="experiencia" className="mt-10 sm:mt-14">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="font-medium text-gray-800 dark:text-neutral-200">
                            Experiência
                        </h2>
                        {owner.cv_path && (
                            <a
                                href={owner.cv_path}
                                download
                                className="inline-flex items-center gap-x-1 text-sm text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
                            >
                                Currículo
                                <IconDownload className="shrink-0 size-4" />
                            </a>
                        )}
                    </div>
                    <div>
                        {experiences.map((experience) => (
                            <div
                                key={experience.id}
                                className="group relative flex gap-x-5"
                            >
                                <div className="relative group-last:after:hidden after:absolute after:top-8 after:bottom-2 after:inset-s-3 after:w-px after:translate-x-[-0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                                    <div className="relative z-10 size-6 flex justify-center items-center">
                                        <img
                                            src={experience.icon}
                                            alt={experience.company}
                                            className="shrink-0 size-6"
                                        />
                                    </div>
                                </div>
                                <div className="grow pb-8 group-last:pb-0">
                                    <h3 className="mb-1 text-xs text-gray-600 dark:text-neutral-400">
                                        {experience.period}
                                    </h3>
                                    <p className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                                        {experience.title} -{' '}
                                        {experience.company}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                        {experience.description}
                                    </p>
                                    {experience.technologies &&
                                        experience.technologies.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {experience.technologies.map(
                                                    (tech, techIndex) => (
                                                        <span
                                                            key={techIndex}
                                                            className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md dark:bg-neutral-800 dark:text-neutral-300"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Courses */}
                <div id="cursos" className="my-10 sm:my-14">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="font-medium text-gray-800 dark:text-neutral-200">
                            Cursos
                        </h2>
                    </div>
                    <div className="space-y-6">
                        {courses.map((course) => (
                            <article key={course.id} className="group">
                                <a
                                    href={course.link ?? '#'}
                                    className="block"
                                    target={
                                        course.link ? '_blank' : undefined
                                    }
                                    rel={
                                        course.link
                                            ? 'noopener noreferrer'
                                            : undefined
                                    }
                                >
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs text-gray-500 dark:text-neutral-500">
                                                {course.platform}
                                            </span>
                                            <span className="text-xs text-gray-400 dark:text-neutral-600">
                                                •
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-neutral-500">
                                                {course.status === 'Completed'
                                                    ? 'Concluído'
                                                    : 'Em andamento'}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-sm text-gray-800 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                            {course.name}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400 line-clamp-2">
                                            {course.description}
                                        </p>
                                    </div>
                                </a>
                            </article>
                        ))}
                    </div>
                </div>

                {/* Blog */}
                <div id="blog" className="my-10 sm:my-14">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="font-medium text-gray-800 dark:text-neutral-200">
                            Blog
                        </h2>
                        <Link
                            href="/articles"
                            className="inline-flex items-center gap-x-1 text-sm text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
                        >
                            Ver todos
                            {arrowRight}
                        </Link>
                    </div>
                    {articles.length === 0 ? (
                        <p className="text-sm text-gray-500 dark:text-neutral-500">Nenhum artigo encontrado.</p>
                    ) : (
                        <Articles articles={articles} />
                    )}
                </div>
            </div>
        </>
    );
}
