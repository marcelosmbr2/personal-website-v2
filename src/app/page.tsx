import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandYoutube,
  IconDownload,
  IconMail,
} from "@tabler/icons-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Articles } from "@/components/articles/articles";
import coursesData from "@/utils/courses.json";
import experiencesData from "@/utils/experiences.json";
import projectsData from "@/utils/projects.json";
import skillsData from "@/utils/skills.json";

import { ArticlesSection } from "@/components/sections/articles-section";
import { CoursesSection } from "@/components/sections/courses-section";
import { ExperiencesSection } from "@/components/sections/experiences-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { HeroSection } from "@/components/sections/hero-section";

export default function WelcomePage() {
  return (
    <>
      <Head>
        <title>Welcome</title>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <div id="home" className="relative">
        <HeroSection />
        {/* Skills */}
        <SkillsSection />
        {/* Projects */}
        <ProjectsSection />
        {/* Work Experience */}
        <ExperiencesSection />
        {/* Courses */}
        <CoursesSection />
        {/* Blog */}
        <ArticlesSection />
      </div>
    </>
  );
}
