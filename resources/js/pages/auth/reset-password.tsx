import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, LoaderCircle, Lock, Mail } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Standalone themed auth card (layout removed)

interface ResetPasswordProps {
    token: string;
    email: string;
}

type ResetPasswordForm = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ResetPasswordForm>>({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <>
            <Head title="Reset password" />
            <div className="bg-background fixed inset-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_40%_25%,oklch(0.95_0.02_270)_0%,transparent_55%),radial-gradient(circle_at_80%_75%,oklch(0.60_0.20_277/.25)_0%,transparent_70%)]" />
            <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
                <div className="mx-auto w-full max-w-md">
                    <div className="border-border/60 bg-card/80 supports-[backdrop-filter]:bg-card/60 relative overflow-hidden rounded-xl border shadow-xl backdrop-blur">
                        <div className="from-primary via-accent to-primary pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r" />
                        <form onSubmit={submit} className="space-y-6 p-8">
                            <div className="mb-2 text-center">
                                <h1 className="text-foreground text-3xl font-bold tracking-tight">Reset Password</h1>
                                <div className="text-muted-foreground mt-2 text-sm">Enter your new password below</div>
                            </div>
                            <input type="hidden" name="token" value={data.token} />
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
                                        autoComplete="email"
                                        value={data.email}
                                        readOnly
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="focus-visible:ring-ring h-12 pl-10"
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-foreground/80 text-sm font-medium">
                                    New Password
                                </Label>
                                <div className="relative">
                                    <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                        placeholder="••••••••"
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
                                        autoComplete="new-password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                        placeholder="••••••••"
                                        className="focus-visible:ring-ring h-12 pr-10 pl-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transform transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                <InputError message={errors.password_confirmation} />
                            </div>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring h-12 w-full font-semibold shadow-sm transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2"
                            >
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                Reset password
                            </Button>
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
