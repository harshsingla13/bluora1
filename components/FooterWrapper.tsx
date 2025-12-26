'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function FooterWrapper() {
    const pathname = usePathname();

    // Do not render footer on the home page ('/')
    if (pathname === '/') {
        return null;
    }

    return <Footer />;
}
