import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

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
        fontFamily: 'Times-Roman',
        fontSize: 9.5,
        paddingTop: 36,
        paddingBottom: 36,
        paddingLeft: 48,
        paddingRight: 48,
        color: '#111',
        lineHeight: 1.35,
    },
    // Header
    headerName: { fontSize: 16, fontFamily: 'Times-Bold', marginBottom: 2 },
    headerTitle: { fontSize: 11, marginLeft: 8, color: '#333' },
    headerRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 },
    headerMeta: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginBottom: 2, color: '#333' },
    headerMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
    // Section
    section: { marginTop: 10 },
    sectionTitle: {
        fontSize: 10,
        fontFamily: 'Times-Bold',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 3,
    },
    hr: { borderBottomWidth: 1, borderBottomColor: '#111', marginBottom: 6 },
    // Skills
    skillsGrid: { flexDirection: 'row', flexWrap: 'wrap' },
    skillsCol: { width: '50%', paddingRight: 12, marginBottom: 4 },
    skillCategory: { fontFamily: 'Times-Bold', marginBottom: 1 },
    skillItems: { color: '#333' },
    // Experience / Education / Course items
    entryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1 },
    entryTitle: { fontFamily: 'Times-Bold' },
    entryRight: { textAlign: 'right', color: '#333', fontSize: 9 },
    entryCompany: { fontFamily: 'Times-Italic', color: '#333', marginBottom: 2 },
    entryDescription: { color: '#333', marginBottom: 3 },
    entryTags: { color: '#555', fontSize: 8.5, marginBottom: 6 },
    entryItem: { marginBottom: 8 },
});

function SectionTitle({ children }: { children: string }) {
    return (
        <View style={s.section}>
            <Text style={s.sectionTitle}>{children}</Text>
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
    const { header, summary, skills, experiences, education, courses, publications, projects } = data;

    const leftSkills = skills.filter((_, i) => i % 2 === 0);
    const rightSkills = skills.filter((_, i) => i % 2 !== 0);
    const maxSkillRows = Math.max(leftSkills.length, rightSkills.length);

    return (
        <Document>
            <Page size="A4" style={s.page}>
                {/* Header */}
                <View style={s.headerRow}>
                    <Text style={s.headerName}>{header.name}</Text>
                    {!!header.title && <Text style={s.headerTitle}>{header.title}</Text>}
                </View>
                <View style={s.headerMeta}>
                    {!!header.location && (
                        <View style={s.headerMetaItem}>
                            <Text>{header.location}</Text>
                        </View>
                    )}
                    {!!header.email && (
                        <View style={s.headerMetaItem}>
                            <Text>{header.email}</Text>
                        </View>
                    )}
                    {!!header.phone && (
                        <View style={s.headerMetaItem}>
                            <Text>{header.phone}</Text>
                        </View>
                    )}
                </View>
                <View style={s.headerMeta}>
                    {!!header.linkedin && (
                        <View style={s.headerMetaItem}>
                            <Text>{header.linkedin}</Text>
                        </View>
                    )}
                    {!!header.website && (
                        <View style={s.headerMetaItem}>
                            <Text>{header.website}</Text>
                        </View>
                    )}
                    {!!header.github && (
                        <View style={s.headerMetaItem}>
                            <Text>{header.github}</Text>
                        </View>
                    )}
                </View>

                {/* Resumo */}
                {!!summary && (
                    <View>
                        <SectionTitle>Resumo</SectionTitle>
                        <Text style={{ color: '#333', marginBottom: 4 }}>{summary}</Text>
                    </View>
                )}

                {/* Habilidades */}
                {skills.length > 0 && (
                    <View>
                        <SectionTitle>Habilidades</SectionTitle>
                        <View style={s.skillsGrid}>
                            <View style={s.skillsCol}>
                                {leftSkills.map((skill, i) => (
                                    <View key={i} style={{ marginBottom: 5 }}>
                                        <Text style={s.skillCategory}>{skill.category}</Text>
                                        <Text style={s.skillItems}>{skill.items}</Text>
                                    </View>
                                ))}
                            </View>
                            <View style={s.skillsCol}>
                                {rightSkills.map((skill, i) => (
                                    <View key={i} style={{ marginBottom: 5 }}>
                                        <Text style={s.skillCategory}>{skill.category}</Text>
                                        <Text style={s.skillItems}>{skill.items}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        {maxSkillRows === 0 && null}
                    </View>
                )}

                {/* Experiência Profissional */}
                {experiences.length > 0 && (
                    <View>
                        <SectionTitle>Experiência Profissional</SectionTitle>
                        {experiences.map((exp, i) => (
                            <View key={i} style={s.entryItem}>
                                <View style={s.entryRow}>
                                    <Text style={s.entryTitle}>{exp.title}</Text>
                                    <Text style={s.entryRight}>{exp.period}</Text>
                                </View>
                                <View style={s.entryRow}>
                                    <Text style={s.entryCompany}>{exp.company}</Text>
                                    <Text style={s.entryRight}>{exp.location}</Text>
                                </View>
                                {!!exp.description && (
                                    <Text style={s.entryDescription}>{exp.description}</Text>
                                )}
                                <Tags value={exp.tags} />
                            </View>
                        ))}
                    </View>
                )}

                {/* Educação */}
                {education.length > 0 && (
                    <View>
                        <SectionTitle>Educação</SectionTitle>
                        {education.map((edu, i) => (
                            <View key={i} style={s.entryItem}>
                                <View style={s.entryRow}>
                                    <Text style={s.entryTitle}>{edu.degree}</Text>
                                    <Text style={s.entryRight}>{edu.period}</Text>
                                </View>
                                <View style={s.entryRow}>
                                    <Text style={s.entryCompany}>{edu.institution}</Text>
                                    <Text style={s.entryRight}>{edu.location}</Text>
                                </View>
                                {!!edu.description && (
                                    <Text style={s.entryDescription}>{edu.description}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* Cursos */}
                {courses.length > 0 && (
                    <View>
                        <SectionTitle>Cursos</SectionTitle>
                        {courses.map((course, i) => (
                            <View key={i} style={s.entryItem}>
                                <View style={s.entryRow}>
                                    <Text style={s.entryTitle}>{course.name}</Text>
                                    <Text style={s.entryRight}>{course.period}</Text>
                                </View>
                                {!!course.platform && (
                                    <Text style={s.entryCompany}>{course.platform}</Text>
                                )}
                                {!!course.description && (
                                    <Text style={s.entryDescription}>{course.description}</Text>
                                )}
                                <Tags value={course.tags} />
                            </View>
                        ))}
                    </View>
                )}

                {/* Publicações */}
                {!!publications && publications.length > 0 && (
                    <View>
                        <SectionTitle>Publicações</SectionTitle>
                        {publications.map((pub, i) => (
                            <View key={i} style={s.entryItem}>
                                <View style={s.entryRow}>
                                    <Text style={s.entryTitle}>{pub.title}</Text>
                                    <Text style={s.entryRight}>{pub.period}</Text>
                                </View>
                                {!!pub.publisher && (
                                    <Text style={s.entryCompany}>{pub.publisher}</Text>
                                )}
                                {!!pub.description && (
                                    <Text style={s.entryDescription}>{pub.description}</Text>
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
                                    <Text style={s.entryTitle}>{proj.name}</Text>
                                    <Text style={s.entryRight}>{proj.period}</Text>
                                </View>
                                {!!proj.description && (
                                    <Text style={s.entryDescription}>{proj.description}</Text>
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
