import { Link } from '@inertiajs/react';
import { Pill } from 'lucide-react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthLayout({ title, description, children }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <Link href={route('home')} className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
                            <Pill className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                                Ibhayi
                            </span>
                            <div className="text-sm leading-none text-gray-500">E-Prescription</div>
                        </div>
                    </Link>
                </div>
                <h2 className="mt-8 text-center text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
                <p className="mt-2 text-center text-sm text-gray-600">{description}</p>
            </div>

            {/* Main Content */}
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="border border-gray-200 bg-white px-4 py-8 shadow-xl sm:rounded-2xl sm:px-10">{children}</div>
            </div>
        </div>
    );
}
