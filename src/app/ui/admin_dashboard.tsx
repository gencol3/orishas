'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
    const router = useRouter();

    const handleSignOut = () => {
        // Perform sign-out logic here
        // For example: Clear authentication tokens, remove user session data, etc.
        
        // Redirect the user to the sign-in page or home page
        router.push('/signin'); // Adjust the path accordingly
    };
    return (
        <header>
            <nav className="flex justify-center flex-row">
                <ul className="flex flex-row gap-4">
                    <li>
                        <Link href="/">Articles</Link>
                    </li>
                    <li>
                        <Link href="/create">Create</Link>
                    </li>
                    <li>
                        <button onClick={handleSignOut}>Sign Out</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}