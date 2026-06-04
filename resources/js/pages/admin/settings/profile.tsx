import { Form, Head, usePage } from '@inertiajs/react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import SocialLinksController from '@/actions/App/Http/Controllers/Settings/SocialLinksController';
import DeleteUser from '@/components/delete-user';
import Heading from '@/components/heading';
import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandWhatsapp,
    IconBrandYoutube,
    IconMail,
    type TablerIcon,
} from '@/components/icons';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { edit } from '@/routes/profile';

const socialIconMap: Record<string, TablerIcon> = {
    IconMail,
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandWhatsapp,
    IconBrandYoutube,
};

type SocialLink = {
    id: number;
    name: string;
    link: string;
    icon: string;
};

export default function Profile() {
    const { auth, socialLinks } = usePage<{ socialLinks: SocialLink[] }>()
        .props;

    return (
        <>
            <Head title="Profile settings" />

            <h1 className="sr-only">Profile settings</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Profile information"
                    description="Update your name, email address and profile info"
                />

                <Form
                    {...ProfileController.update.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="avatar">Foto</Label>

                                <div className="flex items-center gap-4">
                                    <img
                                        src={
                                            auth.user.avatar ??
                                            '/images/avatar.webp'
                                        }
                                        alt="Avatar"
                                        className="size-16 rounded-full object-cover"
                                    />

                                    <Input
                                        id="avatar"
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        className="mt-1 block w-full"
                                    />
                                </div>

                                <InputError
                                    className="mt-2"
                                    message={errors.avatar}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    defaultValue={auth.user.name}
                                    name="name"
                                    required
                                    autoComplete="name"
                                    placeholder="Full name"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    defaultValue={auth.user.email}
                                    name="email"
                                    required
                                    autoComplete="username"
                                    placeholder="Email address"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.email}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="cv">Currículo (PDF)</Label>

                                {auth.user.cv_path && (
                                    <p className="text-sm text-muted-foreground">
                                        Arquivo atual:{' '}
                                        <a
                                            href={auth.user.cv_path}
                                            target="_blank"
                                            className="underline"
                                        >
                                            ver CV
                                        </a>
                                    </p>
                                )}

                                <Input
                                    id="cv"
                                    type="file"
                                    name="cv"
                                    accept=".pdf"
                                    className="mt-1 block w-full"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.cv}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="role">Cargo</Label>

                                <Input
                                    id="role"
                                    className="mt-1 block w-full"
                                    defaultValue={auth.user.role ?? ''}
                                    name="role"
                                    placeholder="e.g. Full Stack Developer"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.role}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="bio">Descrição</Label>

                                <Textarea
                                    id="bio"
                                    className="mt-1 block w-full"
                                    defaultValue={auth.user.bio ?? ''}
                                    name="bio"
                                    rows={4}
                                    placeholder="A brief description about yourself"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.bio}
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button
                                    disabled={processing}
                                    data-test="update-profile-button"
                                >
                                    Save
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Redes Sociais"
                    description="Update your social media links"
                />

                <Form
                    {...SocialLinksController.update.form()}
                    options={{ preserveScroll: true }}
                    className="space-y-4"
                >
                    {({ processing, errors }) => (
                        <>
                            {socialLinks.map((link) => {
                                const Icon = socialIconMap[link.icon];

                                return (
                                    <div key={link.id} className="grid gap-2">
                                        <Label htmlFor={`link-${link.id}`}>
                                            {link.name}
                                        </Label>

                                        <InputGroup>
                                            <InputGroupInput
                                                id={`link-${link.id}`}
                                                type="text"
                                                name={`links[${link.id}]`}
                                                defaultValue={link.link}
                                                placeholder="https://..."
                                            />
                                            <InputGroupAddon>
                                                {Icon && <Icon size={16} />}
                                            </InputGroupAddon>
                                        </InputGroup>

                                        <InputError
                                            message={errors[`links.${link.id}`]}
                                        />
                                    </div>
                                );
                            })}

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>Save</Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>

            <DeleteUser />
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: 'Profile settings',
            href: edit(),
        },
    ],
};
