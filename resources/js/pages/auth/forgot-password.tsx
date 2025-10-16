// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Mail } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Removed layout; page now uses standalone themed auth card like login/register

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot password" />
            <div className="bg-background fixed inset-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_35%_25%,oklch(0.95_0.02_270)_0%,transparent_55%),radial-gradient(circle_at_80%_70%,oklch(0.60_0.20_277/.25)_0%,transparent_70%)]" />
            <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
                <div className="mx-auto w-full max-w-md">
                    <div className="border-border/60 bg-card/80 supports-[backdrop-filter]:bg-card/60 relative overflow-hidden rounded-xl border shadow-xl backdrop-blur">
                        <div className="from-primary via-accent to-primary pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r" />
                        <div className="p-8">
                            <div className="mb-8 text-center">
                                <h1 className="text-foreground text-3xl font-bold tracking-tight">Forgot Password</h1>
                                <div className="text-muted-foreground mt-2 text-sm">Enter your email to receive a reset link</div>
                            </div>
                            {status && (
                                <div className="border-primary/30 bg-primary/10 text-primary mb-6 rounded-md border p-4 text-sm">
                                    <span className="font-medium">{status}</span>
                                </div>
                            )}
                            <form onSubmit={submit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-foreground/80 text-sm font-medium">
                                        Email address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            autoComplete="off"
                                            value={data.email}
                                            autoFocus
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="email@example.com"
                                            className="focus-visible:ring-ring h-12 pl-10"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring h-12 w-full font-semibold shadow-sm transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2"
                                >
                                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                    Email password reset link
                                </Button>
                                <div className="text-muted-foreground text-center text-sm">
                                    Remember your password?{' '}
                                    <TextLink href={route('login')} className="text-primary font-medium hover:underline">
                                        Log in
                                    </TextLink>
                                </div>
                            </form>
                        </div>
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
