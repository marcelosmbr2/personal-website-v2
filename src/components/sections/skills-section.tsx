import skillsData from "@/utils/skills.json";

type Skill = {
  name: string;
  category: string;
  icon: string;
  order: number;
};

const categoryLabels: Record<string, string> = {
  frontend: "Frontend:",
  backend: "Backend:",
  cms: "CMS:",
  devops: "DevOps:",
  soft: "Soft Skills:",
};

const categoryOrder = ["frontend", "backend", "cms", "devops", "soft"];

export function SkillsSection() {
  const groupedSkills = (skillsData as Skill[]).reduce<Record<string, Skill[]>>(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }

      acc[skill.category].push(skill);

      return acc;
    },
    {},
  );

  return (
    <div
      id="skills"
      className="relative mx-auto w-full max-w-3xl px-4 pt-4 pb-16 sm:px-6 lg:px-8"
    >
      <h2 className="mb-5 font-medium text-gray-800 dark:text-neutral-200">
        Skills
      </h2>

      <div className="space-y-3">
        {categoryOrder.map((category) => {
          const items = groupedSkills[category];

          if (!items?.length) {
            return null;
          }

          const sortedItems = [...items].sort((a, b) => a.order - b.order);

          return (
            <dl key={category} className="flex flex-col gap-1 sm:flex-row">
              <dt className="min-w-40">
                <span className="block text-sm text-gray-500 dark:text-neutral-500">
                  {categoryLabels[category] ?? category}
                </span>
              </dt>

              <dd>
                <ul>
                  {sortedItems.map((skill, index) => (
                    <li
                      key={`${skill.category}-${skill.name}`}
                      className={`me-1 ${
                        index < sortedItems.length - 1
                          ? 'after:content-[","]'
                          : ""
                      } inline-flex items-center text-sm text-gray-800 dark:text-neutral-200`}
                    >
                      {skill.icon && (
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="me-1 size-4 shrink-0"
                        />
                      )}

                      {skill.name}
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
          );
        })}
      </div>
    </div>
  );
}
