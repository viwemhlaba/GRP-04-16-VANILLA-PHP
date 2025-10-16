import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    const pillars = [
        {
            role: 'Pharmacists',
            blurb: 'Fast, accurate dispensing with allergy safeguards and stock insight.',
            points: ['Allergy overrides logged', 'Real‑time stock + expiries', 'Repeat handling & alerts'],
        },
        {
            role: 'Managers',
            blurb: 'Operational visibility, compliance confidence, and exportable reports.',
            points: ['Workflow & audit trails', 'Inventory + ordering signals', 'Structured reporting'],
        },
        {
            role: 'Patients',
            blurb: 'Transparent prescription progress and safer medication history.',
            points: ['Repeat request tracking', 'Allergy aware records', 'Clear pickup notifications'],
        },
    ];

    const workflow = [
        {
            t: 'Capture',
            d: 'Prescription created, repeats unified, instant allergy scan.',
        },
        {
            t: 'Verify & prep',
            d: 'Stock + safety surfaced; conflicts resolved with explicit override.',
        },
        {
            t: 'Dispense',
            d: 'Quantities validated; repeats and audit trail updated atomically.',
        },
        {
            t: 'Notify',
            d: 'Ready‑for‑collection email (final repeat flagged) sent to patient.',
        },
    ];

    const security = [
        {
            t: 'Data protection',
            pts: ['Encryption in transit/at rest', 'Principle of least privilege', 'Scoped role access'],
        },
        { t: 'Compliance posture', pts: ['POPIA aligned patterns', 'Full audit on overrides', 'Retention + export ready'] },
        { t: 'Operational safety', pts: ['Allergy pre‑checks', 'Override reason capture', 'Tamper‑evident changes'] },
    ];

    const testimonials = [
        { n: 'Thandi M.', r: 'Pharmacist', q: 'Allergy prompts + repeat clarity made dispensing calmer.' },
        { n: 'Dr. Patel', r: 'GP', q: 'I sign scripts with confidence—conflicts surface instantly.' },
        { n: 'Sibusiso N.', r: 'Manager', q: 'Override logging simplified our last compliance review.' },
    ];

    return (
        <>
            <Head title="iBhayi E‑Prescription — Safe, consistent, modern dispensing" />

            {/* Navigation */}
            <nav className="bg-background/80 supports-[backdrop-filter]:bg-background/60 fixed top-0 z-50 w-full border-b backdrop-blur">
                <div className="container mx-auto flex h-14 items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <AppLogo />
                        <span className="text-muted-foreground text-xs">E‑Prescription</span>
                    </div>
                    <div className="hidden gap-6 text-sm font-medium md:flex">
                        <a href="#pillars" className="text-muted-foreground hover:text-foreground transition-colors">
                            Platform
                        </a>
                        <a href="#workflow" className="text-muted-foreground hover:text-foreground transition-colors">
                            Workflow
                        </a>
                        <a href="#security" className="text-muted-foreground hover:text-foreground transition-colors">
                            Security
                        </a>
                        <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                            Stories
                        </a>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" asChild>
                            <Link href={route('login')}>Sign in</Link>
                        </Button>
                        <Button asChild>
                            <Link href={route('register')}>Get started</Link>
                        </Button>
                    </div>
                </div>
            </nav>

            <main className="text-foreground min-h-screen pt-20">
                {/* Hero */}
                <section className="relative overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.55] [background:radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.18),transparent_55%),radial-gradient(circle_at_70%_65%,hsl(var(--accent)/0.18),transparent_60%)]" />
                    <div className="container mx-auto px-4 py-28">
                        <div className="mx-auto max-w-3xl text-center">
                            <h1 className="mb-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                                Safer digital prescriptions. Less friction. More clarity.
                            </h1>
                            <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
                                A focused e‑prescription platform for real‑world pharmacy operations: allergy awareness, unified repeats, atomic
                                dispensing, and branded patient communication—out of the box.
                            </p>
                            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <Button size="lg" asChild>
                                    <Link href={route('register')}>Create an account</Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href={route('login')}>Sign in</Link>
                                </Button>
                            </div>
                            <div className="mt-10 grid grid-cols-2 gap-4 text-left sm:grid-cols-4">
                                {[
                                    { k: 'Uptime', v: '99.9%' },
                                    { k: 'Avg. time saved', v: '32%' },
                                    { k: 'Prescriptions processed', v: '250K+' },
                                    { k: 'Pharmacies', v: '1.2K+' },
                                ].map((m) => (
                                    <div key={m.k} className="bg-card/60 rounded-lg border p-3 text-center">
                                        <div className="text-sm font-medium">{m.v}</div>
                                        <div className="text-muted-foreground mt-1 text-[10px] tracking-wide uppercase">{m.k}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <Separator />

                {/* Pillars / Roles */}
                <section id="pillars" className="container mx-auto px-4 py-16">
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built for every participant</h2>
                        <p className="text-muted-foreground mt-3 text-lg">Role‑aware workflows without bloated menus or guesswork.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {pillars.map((p) => (
                            <div key={p.role} className="bg-card relative flex flex-col gap-4 rounded-xl border p-6 shadow-sm">
                                <h3 className="text-lg font-semibold">{p.role}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{p.blurb}</p>
                                <ul className="text-muted-foreground ml-4 list-disc space-y-1 text-xs">
                                    {p.points.map((pt) => (
                                        <li key={pt}>{pt}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <Separator />

                {/* Workflow */}
                <section id="workflow" className="container mx-auto px-4 py-16">
                    <div className="mx-auto mb-12 max-w-xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight">Clear operational flow</h2>
                        <p className="text-muted-foreground mt-3">Each stage is explicit, logged, and patient‑safe.</p>
                    </div>
                    <ol className="relative mx-auto max-w-5xl border-l pl-6 [counter-reset:step] md:grid md:grid-cols-4 md:gap-6 md:border-l-0 md:pl-0">
                        {workflow.map((w, i) => (
                            <li key={w.t} className="group relative mb-10 md:mb-0 md:rounded-xl md:border md:p-5 md:pt-8 md:shadow-sm">
                                <div className="bg-background absolute top-0 -left-3 flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold md:static md:mx-auto md:mb-4 md:h-10 md:w-10 md:text-sm">
                                    {i + 1}
                                </div>
                                <h3 className="mt-2 mb-2 text-sm font-semibold md:text-base">{w.t}</h3>
                                <p className="text-muted-foreground text-xs leading-relaxed md:text-sm">{w.d}</p>
                            </li>
                        ))}
                    </ol>
                </section>

                <Separator />

                {/* Security / Compliance */}
                <section id="security" className="container mx-auto px-4 py-16">
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Trust & assurance by design</h2>
                        <p className="text-muted-foreground mt-3 text-lg">Security and compliance patterns embedded in everyday use.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {security.map((s) => (
                            <div key={s.t} className="bg-card relative flex flex-col gap-3 rounded-xl border p-6">
                                <h3 className="font-semibold">{s.t}</h3>
                                <ul className="text-muted-foreground ml-4 list-disc space-y-1 text-xs">
                                    {s.pts.map((p) => (
                                        <li key={p}>{p}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <Separator />

                {/* Testimonials */}
                <section id="testimonials" className="container mx-auto px-4 py-16">
                    <div className="mx-auto mb-12 max-w-xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight">Field feedback</h2>
                        <p className="text-muted-foreground mt-3">Real wins from daily users.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {testimonials.map((t) => (
                            <div key={t.n} className="bg-card flex flex-col gap-4 rounded-xl border p-6 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold">
                                        {t.n
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')
                                            .slice(0, 2)}
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium">{t.n}</div>
                                        <div className="text-muted-foreground text-[11px]">{t.r}</div>
                                    </div>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">“{t.q}”</p>
                            </div>
                        ))}
                    </div>
                </section>

                <Separator />

                {/* Final CTA */}
                <section className="container mx-auto px-4 py-24">
                    <div className="bg-card mx-auto max-w-3xl rounded-2xl border p-10 text-center shadow-sm">
                        <h3 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">Ready to modernise dispensing?</h3>
                        <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-sm sm:text-base">
                            Create a free account and experience streamlined, audit‑ready e‑prescriptions in minutes.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Button size="lg" asChild>
                                <Link href={route('register')}>Get started</Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link href={route('login')}>Sign in</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
