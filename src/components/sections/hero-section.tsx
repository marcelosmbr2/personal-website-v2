import { Button } from "@/components/ui/button";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandYoutube,
  IconDownload,
  IconMail,
  type TablerIcon,
} from "@/components/icons";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ownerData from "@/utils/owner.json";
import resumesData from "@/utils/resumes.json";

interface SocialLink {
  icon: string;
  name: string;
  link: string;
}

interface Profile {
  avatar: string;
  name: string;
  role: string;
  bio: string;
  socialLinks: SocialLink[];
}

interface Resume {
  name: string;
  language: string;
  file_path: string;
}

const owner = ownerData as Profile;
const resumes = resumesData as Resume[];

const LANGUAGE_LABEL: Record<string, string> = {
  "pt-BR": "Português",
  en: "English",
  es: "Español",
};

const socialIconMap: Record<string, TablerIcon> = {
  IconMail,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandYoutube,
};

export function HeroSection() {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <img
          src="/images/hero-transparent.png"
          alt=""
          className="hidden w-full lg:block"
        />
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-4 pt-4 pb-16 sm:px-6 lg:px-8">
        {/* Profile */}
        <div className="flex items-center gap-x-3">
          <div className="shrink-0">
            <img
              className="size-16 shrink-0 rounded-full"
              src={owner.avatar}
              alt={`Avatar de ${owner.name}`}
            />
          </div>

          <div className="grow">
            <h1 className="text-lg font-medium text-gray-800 dark:text-neutral-200">
              {owner.name}
            </h1>

            <p className="text-sm text-gray-600 dark:text-neutral-400">
              {owner.role}
            </p>
          </div>

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

              <div className="space-y-2 p-2">
                {resumes.map((resume) => (
                  <div
                    key={resume.name}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="text-sm font-medium">{resume.name}</p>

                      <p className="text-xs text-muted-foreground">
                        {LANGUAGE_LABEL[resume.language] ?? resume.language}
                      </p>
                    </div>

                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={resume.file_path}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Baixar currículo ${resume.name}`}
                      >
                        <IconDownload className="size-4" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* About */}
        <div className="mt-8">
          {owner.bio?.split("\n\n").map((paragraph, i) => (
            <p
              key={i}
              className={`${i > 0 ? "mt-3" : ""}text-sm text-gray-600 dark:text-neutral-400`}
            >
              {paragraph}
            </p>
          ))}

          {/* Social Links */}
          <div className="mt-5 flex items-center gap-x-4">
            {owner.socialLinks.map((link) => {
              const Icon = socialIconMap[link.icon];

              if (!Icon) return null;

              const isExternal = !link.link.startsWith("mailto:");

              return (
                <a
                  key={link.name}
                  href={link.link}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="inline-flex size-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                  aria-label={link.name}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
