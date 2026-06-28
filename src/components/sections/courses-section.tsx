import coursesData from "@/utils/courses.json";

interface Course {
  name: string;
  description: string;
  platform: string;
  link: string;
  status: "pending" | "completed";
  order: number;
}

export function CoursesSection() {
  return (
    <div
      id="cursos"
      className="relative mx-auto w-full max-w-3xl px-4 pt-4 pb-16 sm:px-6 lg:px-8"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-medium text-gray-800 dark:text-neutral-200">
          Cursos
        </h2>
      </div>
      <div className="space-y-6">
        {coursesData.map((course) => (
          <article key={course.name} className="group">
            <a
              href={course.link ?? "#"}
              className="block"
              target={course.link ? "_blank" : undefined}
              rel={course.link ? "noopener noreferrer" : undefined}
            >
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-neutral-500">
                    {course.platform}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-neutral-600">
                    •
                  </span>
                  <span className="text-xs text-gray-500 dark:text-neutral-500">
                    {course.status === "completed"
                      ? "Concluído"
                      : "Em andamento"}
                  </span>
                </div>
                <h3 className="line-clamp-2 text-sm font-semibold text-gray-800 transition-colors group-hover:text-blue-600 dark:text-neutral-200 dark:group-hover:text-blue-400">
                  {course.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-neutral-400">
                  {course.description}
                </p>
              </div>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
