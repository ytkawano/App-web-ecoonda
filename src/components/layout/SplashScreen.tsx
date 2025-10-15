'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Oculta o splash screen após 2 segundos
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500"
            style={{ opacity: isVisible ? 1 : 0 }}
        >
            <div className="transition-transform duration-800 ease-out scale-100">
                <Image
                    src="/logo%20ecconda.png"
                    alt="Logo Ecconda"
                    width={250}
                    height={62}
                    priority
                />
            </div>
        </div>
    );
}
