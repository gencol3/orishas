'use client';

import Link from 'next/link';

export default function Header() {
    return (
        <header>
            <nav className="flex justify-center flex-row">
                <ul className="flex flex-row gap-4">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/login">Admin Login</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}