import { Link } from '@inertiajs/react';
import { IconBrandMedium } from '@/components/icons';

type Article = {
    id: number;
    name: string;
    description: string;
    external_link?: string | null;
    image_url?: string | null;
    is_from_medium?: boolean;
    published_at: string | null;
    created_at: string;
};

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

export function Articles({ articles = [] }: { articles?: Article[] }) {
    if (articles.length === 0) return null;

    return (
        <div className="space-y-6">
            {articles.map((post) => (
                <article key={post.id} className="group">
                    {post.external_link ? (
                        <a
                            href={post.external_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                        >
                            <ArticleCard post={post} />
                        </a>
                    ) : (
                        <Link href={`/articles/${post.id}`} className="block">
                            <ArticleCard post={post} />
                        </Link>
                    )}
                </article>
            ))}
        </div>
    );
}

function ArticleCard({ post }: { post: Article }) {
    return (
        <div className="flex gap-4">
            {post.image_url && (
                <div className="shrink-0">
                    <img
                        className="h-40 w-40 rounded-lg bg-gray-100 object-cover dark:bg-neutral-800"
                        src={post.image_url}
                        alt={post.name}
                        width={160}
                        height={160}
                    />
                </div>
            )}
            <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-2">
                    <time className="text-xs text-gray-500 dark:text-neutral-500">
                        {formatDate(post.published_at ?? post.created_at)}
                    </time>
                    {post.is_from_medium && (
                        <IconBrandMedium className="size-3.5 text-gray-500 dark:text-neutral-500" />
                    )}
                </div>
                <h3 className="line-clamp-2 text-sm font-semibold text-gray-800 transition-colors group-hover:text-blue-600 dark:text-neutral-200 dark:group-hover:text-blue-400">
                    {post.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-neutral-400">
                    {post.description}
                </p>
            </div>
        </div>
    );
}
