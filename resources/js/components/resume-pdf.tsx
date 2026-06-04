import {
    Document,
    Font,
    Link,
    Page,
    Path,
    StyleSheet,
    Svg,
    Text,
    View,
} from '@react-pdf/renderer';

const ICONS = {
    location:
        'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
    email: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
    phone: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
    linkedin:
        'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z',
    link: 'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z',
    github: 'M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z',
} as const;

Font.register({
    family: 'Alegreya',
    fonts: [
        {
            src: '/fonts/Alegreya-Regular.ttf',
            fontWeight: 400,
            fontStyle: 'normal',
        },
        {
            src: '/fonts/Alegreya-Regular.ttf',
            fontWeight: 700,
            fontStyle: 'normal',
        },
        {
            src: '/fonts/Alegreya-Italic.ttf',
            fontWeight: 400,
            fontStyle: 'italic',
        },
    ],
});

export interface ResumeHeader {
    name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    website: string;
    github: string;
}

export interface ResumeSkill {
    category: string;
    items: string;
}

export interface ResumeExperience {
    title: string;
    company: string;
    period: string;
    location: string;
    description: string;
    tags: string;
}

export interface ResumeEducation {
    degree: string;
    institution: string;
    period: string;
    location: string;
    description: string;
}

export interface ResumeCourse {
    name: string;
    platform: string;
    period: string;
    link: string;
    description: string;
    tags: string;
}

export interface ResumePublication {
    title: string;
    publisher: string;
    period: string;
    description: string;
    link: string;
}

export interface ResumeProject {
    name: string;
    link: string;
    period: string;
    description: string;
    tags: string;
}

export interface ResumeContent {
    header: ResumeHeader;
    summary: string;
    skills: ResumeSkill[];
    experiences: ResumeExperience[];
    education: ResumeEducation[];
    courses: ResumeCourse[];
    publications?: ResumePublication[] | null;
    projects?: ResumeProject[] | null;
}

const s = StyleSheet.create({
    page: {
        fontFamily: 'Alegreya',
        fontSize: 11,
        paddingTop: 40,
        paddingBottom: 40,
        paddingLeft: 40,
        paddingRight: 40,
        color: '#111',
        lineHeight: 1.5,
    },
    // Header
    headerName: { fontSize: 22, fontWeight: 700, marginBottom: 8.78 },
    headerTitle: {
        fontSize: 17,
        fontWeight: 400,
        marginLeft: 8,
        color: '#333',
    },
    headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    headerMeta: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        columnGap: 14,
        rowGap: 5,
        marginBottom: 5,
        color: '#333',
        fontSize: 11,
        fontWeight: 400,
        lineHeight: 1.333,
    },
    headerMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
    // Section
    section: { marginTop: 10 },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 700,
        marginBottom: 4,
    },
    hr: { borderBottomWidth: 1.5, borderBottomColor: '#111', marginBottom: 6 },
    // Skills
    skillsGrid: { flexDirection: 'row', alignItems: 'flex-start' },
    skillsLeftCol: { width: '52%', paddingRight: 16 },
    skillsRightCol: { width: '48%' },
    skillCategory: { fontWeight: 700, marginBottom: 1 },
    skillItems: { color: '#333' },
    // Experience / Education / Course items
    entryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 1,
    },
    entryTitle: { fontWeight: 700 },
    entryRight: { textAlign: 'right', color: '#333' },
    entryCompany: { fontStyle: 'italic', color: '#333', marginBottom: 2 },
    entryDescription: { color: '#333', marginBottom: 3 },
    entryTags: { color: '#555', fontSize: 10, marginBottom: 6 },
    entryItem: { marginBottom: 8 },
});

function ContactIcon({ icon }: { icon: string }) {
    return (
        <Svg
            width={9}
            height={9}
            viewBox="0 0 24 24"
            style={{ marginRight: 2, marginTop: 1 }}
        >
            <Path d={icon} fill="#444" />
        </Svg>
    );
}

function SectionTitle({ children }: { children: string }) {
    return (
        <View style={s.section}>
            <Text style={s.sectionTitle}>{children.toUpperCase()}</Text>
            <View style={s.hr} />
        </View>
    );
}

function Tags({ value }: { value: string }) {
    if (!value.trim()) {
        return null;
    }
    const tags = value
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    return <Text style={s.entryTags}>{tags.join(' · ')}</Text>;
}

export function ResumePDF({ data }: { data: ResumeContent }) {
    const {
        header,
        summary,
        skills,
        experiences,
        education,
        courses,
        publications,
        projects,
    } = data;

    const leftSkills = skills.filter((_, i) => i % 2 === 0);
    const rightSkills = skills.filter((_, i) => i % 2 !== 0);

    return (
        <Document>
            <Page size="A4" style={s.page}>
                {/* Header */}
                <View style={s.headerRow}>
                    <Text style={s.headerName}>{header.name}</Text>
                    {!!header.title && (
                        <Text style={s.headerTitle}>{header.title}</Text>
                    )}
                </View>
                <View style={s.headerMeta}>
                    {!!header.location && (
                        <View style={s.headerMetaItem}>
                            <ContactIcon icon={ICONS.location} />
                            <Text>{header.location}</Text>
                        </View>
                    )}
                    {!!header.email && (
                        <View style={s.headerMetaItem}>
                            <ContactIcon icon={ICONS.email} />
                            <Text>{header.email}</Text>
                        </View>
                    )}
                    {!!header.phone && (
                        <View style={s.headerMetaItem}>
                            <ContactIcon icon={ICONS.phone} />
                            <Text>{header.phone}</Text>
                        </View>
                    )}
                </View>
                <View style={[s.headerMeta, { marginBottom: 0 }]}>
                    {!!header.linkedin && (
                        <View style={s.headerMetaItem}>
                            <ContactIcon icon={ICONS.linkedin} />
                            <Text>{header.linkedin}</Text>
                        </View>
                    )}
                    {!!header.website && (
                        <View style={s.headerMetaItem}>
                            <ContactIcon icon={ICONS.link} />
                            <Text>{header.website}</Text>
                        </View>
                    )}
                    {!!header.github && (
                        <View style={s.headerMetaItem}>
                            <ContactIcon icon={ICONS.github} />
                            <Text>{header.github}</Text>
                        </View>
                    )}
                </View>

                {/* Resumo */}
                <View>
                    <SectionTitle>Resumo</SectionTitle>
                    {!!summary && (
                        <Text style={{ color: '#333', marginBottom: 4 }}>
                            {summary}
                        </Text>
                    )}
                </View>

                {/* Habilidades */}
                <View>
                    <SectionTitle>Habilidades</SectionTitle>
                    <View style={s.skillsGrid}>
                        <View style={s.skillsLeftCol}>
                            {leftSkills.map((skill, i) => (
                                <View key={i} style={{ marginBottom: 10 }}>
                                    <Text style={s.skillCategory}>
                                        {skill.category}
                                    </Text>
                                    <Text style={s.skillItems}>
                                        {skill.items}
                                    </Text>
                                </View>
                            ))}
                        </View>
                        <View style={s.skillsRightCol}>
                            {rightSkills.map((skill, i) => (
                                <View key={i} style={{ marginBottom: 10 }}>
                                    <Text style={s.skillCategory}>
                                        {skill.category}
                                    </Text>
                                    <Text style={s.skillItems}>
                                        {skill.items}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Experiência Profissional */}
                <View>
                    <SectionTitle>Experiência Profissional</SectionTitle>
                    {experiences.map((exp, i) => (
                        <View key={i} style={s.entryItem}>
                            <View style={s.entryRow}>
                                <Text style={s.entryTitle}>{exp.title}</Text>
                                <Text style={s.entryRight}>{exp.period}</Text>
                            </View>
                            <View style={s.entryRow}>
                                <Text style={s.entryCompany}>
                                    {exp.company}
                                </Text>
                                <Text style={s.entryRight}>{exp.location}</Text>
                            </View>
                            {!!exp.description &&
                                exp.description
                                    .split('\n')
                                    .filter(Boolean)
                                    .map((para, pi, arr) => (
                                        <Text
                                            key={pi}
                                            style={[
                                                s.entryDescription,
                                                {
                                                    marginBottom:
                                                        pi < arr.length - 1
                                                            ? 6
                                                            : 3,
                                                },
                                            ]}
                                        >
                                            {para}
                                        </Text>
                                    ))}
                            <Tags value={exp.tags} />
                        </View>
                    ))}
                </View>

                {/* Educação */}
                <View>
                    <SectionTitle>Educação</SectionTitle>
                    {education.map((edu, i) => (
                        <View key={i} style={s.entryItem}>
                            <View style={s.entryRow}>
                                <Text style={s.entryTitle}>{edu.degree}</Text>
                                <Text style={s.entryRight}>{edu.period}</Text>
                            </View>
                            <View style={s.entryRow}>
                                <Text style={s.entryCompany}>
                                    {edu.institution}
                                </Text>
                                <Text style={s.entryRight}>{edu.location}</Text>
                            </View>
                            {!!edu.description && (
                                <Text style={s.entryDescription}>
                                    {edu.description}
                                </Text>
                            )}
                        </View>
                    ))}
                </View>

                {/* Cursos */}
                <View>
                    <SectionTitle>Cursos</SectionTitle>
                    {courses.map((course, i) => (
                        <View key={i} style={s.entryItem}>
                            <View style={s.entryRow}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 4,
                                    }}
                                >
                                    <Text style={s.entryTitle}>
                                        {course.name}
                                    </Text>
                                    {!!course.link && (
                                        <Link src={course.link}>
                                            <Svg
                                                width={9}
                                                height={9}
                                                viewBox="0 0 24 24"
                                            >
                                                <Path
                                                    d={ICONS.link}
                                                    fill="#777BB4"
                                                />
                                            </Svg>
                                        </Link>
                                    )}
                                </View>
                                <Text style={s.entryRight}>
                                    {course.period}
                                </Text>
                            </View>
                            {!!course.platform && (
                                <Text style={s.entryCompany}>
                                    {course.platform}
                                </Text>
                            )}
                            {!!course.description && (
                                <Text style={s.entryDescription}>
                                    {course.description}
                                </Text>
                            )}
                            <Tags value={course.tags} />
                        </View>
                    ))}
                </View>

                {/* Publicações */}
                {!!publications && publications.length > 0 && (
                    <View>
                        <SectionTitle>Publicações</SectionTitle>
                        {publications.map((pub, i) => (
                            <View key={i} style={s.entryItem}>
                                <View style={s.entryRow}>
                                    <Text style={s.entryTitle}>
                                        {pub.title}
                                    </Text>
                                    <Text style={s.entryRight}>
                                        {pub.period}
                                    </Text>
                                </View>
                                {!!pub.publisher && (
                                    <Text style={s.entryCompany}>
                                        {pub.publisher}
                                    </Text>
                                )}
                                {!!pub.description && (
                                    <Text style={s.entryDescription}>
                                        {pub.description}
                                    </Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* Projetos */}
                {!!projects && projects.length > 0 && (
                    <View>
                        <SectionTitle>Projetos</SectionTitle>
                        {projects.map((proj, i) => (
                            <View key={i} style={s.entryItem}>
                                <View style={s.entryRow}>
                                    <Text style={s.entryTitle}>
                                        {proj.name}
                                    </Text>
                                    <Text style={s.entryRight}>
                                        {proj.period}
                                    </Text>
                                </View>
                                {!!proj.description && (
                                    <Text style={s.entryDescription}>
                                        {proj.description}
                                    </Text>
                                )}
                                <Tags value={proj.tags} />
                            </View>
                        ))}
                    </View>
                )}
            </Page>
        </Document>
    );
}
