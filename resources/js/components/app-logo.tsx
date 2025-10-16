import { HeartPulse } from 'lucide-react';

export default function AppLogo() {
    return (
        <div className="flex items-center gap-2">
            <div className="border-border/60 flex items-center gap-2 rounded-md border bg-gradient-to-br from-white to-slate-50 px-3 py-1.5 shadow-sm dark:border-slate-600/70 dark:from-slate-900 dark:to-slate-800">
                <HeartPulse className="h-5 w-5 text-red-600 dark:text-red-400" strokeWidth={2} />
                <span className="text-[12px] font-bold tracking-wide text-blue-900 uppercase dark:text-blue-200">iBhayi</span>
                <span className="text-[12px] font-semibold tracking-wide text-slate-600 dark:text-slate-300">Prescription</span>
            </div>
        </div>
    );
}
