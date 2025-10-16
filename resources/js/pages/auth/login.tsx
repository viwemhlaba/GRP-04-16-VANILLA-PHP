import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, LoaderCircle, Lock, Mail } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword?: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />
            {/* Background gradient using theme tokens + subtle pattern overlay */}
            <div className="bg-background fixed inset-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_30%_20%,oklch(0.93_0.03_273.66)_0%,transparent_60%),radial-gradient(circle_at_80%_70%,oklch(0.59_0.20_277.06/.25)_0%,transparent_70%)]" />
            <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
                <div className="mx-auto w-full max-w-md">
                    <div className="border-border/60 bg-card/80 supports-[backdrop-filter]:bg-card/60 relative overflow-hidden rounded-xl border shadow-xl backdrop-blur">
                        <div className="from-primary via-accent to-primary pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r" />
                        <div className="p-8">
                            <div className="mb-8 text-center">
                                <h1 className="text-foreground text-3xl font-bold tracking-tight">iBhayi E‑Prescription</h1>
                                <div className="text-muted-foreground mt-2 text-sm">Sign in to continue to your dashboard</div>
                            </div>
                            {status && (
                                <div className="border-primary/30 bg-primary/10 text-primary mb-6 rounded-md border p-4 text-sm">
                                    <span className="font-medium">{status}</span>
                                </div>
                            )}
                            <form className="space-y-6" onSubmit={submit}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-foreground/80 text-sm font-medium">
                                            Email address
                                        </Label>
                                        <div className="relative">
                                            <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="email@example.com"
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
                                            {canResetPassword && (
                                                <TextLink
                                                    href={route('password.request')}
                                                    className="text-primary text-sm hover:underline"
                                                    tabIndex={5}
                                                >
                                                    Forgot password?
                                                </TextLink>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                                            <Input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                required
                                                tabIndex={2}
                                                autoComplete="current-password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="Enter your password"
                                                className="focus-visible:ring-ring h-12 pr-10 pl-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transform transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                        <InputError message={errors.password} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                                checked={data.remember}
                                                onClick={() => setData('remember', !data.remember)}
                                                tabIndex={3}
                                            />
                                            <Label htmlFor="remember" className="text-foreground/80 text-sm">
                                                Remember me
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring h-12 w-full font-semibold shadow-sm transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2"
                                    tabIndex={4}
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        'Sign in'
                                    )}
                                </Button>
                                <div className="muted-foreground text-center text-sm">
                                    Don't have an account?{' '}
                                    <TextLink href={route('register')} tabIndex={6} className="text-primary font-medium hover:underline">
                                        Create account
                                    </TextLink>
                                </div>
                            </form>
                        </div>
                        {/* Decorative bottom border */}
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
