import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, LoaderCircle, Lock, Mail, User } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />
            {/* Background gradient */}
            <div className="bg-background fixed inset-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_25%_25%,oklch(0.95_0.02_270)_0%,transparent_60%),radial-gradient(circle_at_80%_70%,oklch(0.60_0.20_277/.25)_0%,transparent_70%)]" />
            <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
                <div className="mx-auto w-full max-w-xl">
                    <div className="border-border/60 bg-card/80 supports-[backdrop-filter]:bg-card/60 relative overflow-hidden rounded-xl border shadow-xl backdrop-blur">
                        <div className="from-primary via-accent to-primary pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r" />
                        <form onSubmit={submit} className="p-8">
                            <div className="mb-8 text-center">
                                <h1 className="text-foreground text-3xl font-bold tracking-tight">Create Account</h1>
                                <div className="text-muted-foreground mt-2 text-sm">Join our e-prescription platform</div>
                            </div>
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-foreground/80 text-sm font-medium">
                                        Full Name
                                    </Label>
                                    <div className="relative">
                                        <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                                        <Input
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            autoComplete="name"
                                            autoFocus
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                            placeholder="Jane Doe"
                                            className="focus-visible:ring-ring h-12 pl-10"
                                        />
                                    </div>
                                    <InputError message={errors.name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-foreground/80 text-sm font-medium">
                                        Email
                                    </Label>
                                    <div className="relative">
                                        <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            autoComplete="username"
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                            placeholder="you@example.com"
                                            className="focus-visible:ring-ring h-12 pl-10"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-foreground/80 text-sm font-medium">
                                            Password
                                        </Label>
                                    </div>
                                    <div className="relative">
                                        <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={data.password}
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                            placeholder="••••••••"
                                            className="focus-visible:ring-ring h-12 pr-10 pl-10"
                                        />
                                        <button
                                            type="button"
                                            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transform transition-colors"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    <InputError message={errors.password} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation" className="text-foreground/80 text-sm font-medium">
                                        Confirm Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                                        <Input
                                            id="password_confirmation"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            required
                                            placeholder="••••••••"
                                            className="focus-visible:ring-ring h-12 pr-10 pl-10"
                                        />
                                        <button
                                            type="button"
                                            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transform transition-colors"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    <InputError message={errors.password_confirmation} />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring mt-8 h-12 w-full font-semibold shadow-sm transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2"
                            >
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                Create Account
                            </Button>
                            <div className="text-muted-foreground mt-6 text-center text-sm">
                                Already have an account?{' '}
                                <TextLink href={route('login')} className="text-primary font-medium hover:underline">
                                    Sign in
                                </TextLink>
                            </div>
                        </form>
                        <div className="via-primary/50 pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent" />
                    </div>
                </div>
                <footer className="text-muted-foreground/70 mt-8 text-center text-xs">
                    &copy; {new Date().getFullYear()} iBhayi E‑Prescription. All rights reserved.
                </footer>
            </div>
        </>
    );
}
