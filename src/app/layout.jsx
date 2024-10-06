"use client";
import "./globals.css";
import { useEffect } from 'react';

export default function RootLayout({ children }) {
    useEffect(() => {
        const link = document.createElement('link');
        link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css";
        link.rel = "stylesheet";
        link.integrity = "sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC";
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js";
        script.integrity = "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM";
        script.crossOrigin = "anonymous";
        document.body.appendChild(script);
    }, []);

    return (
        <html lang="en">
            <head>
                <title>Sales</title>
                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.css" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
