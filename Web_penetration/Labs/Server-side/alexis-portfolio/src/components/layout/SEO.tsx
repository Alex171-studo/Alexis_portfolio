import { Helmet, HelmetProvider } from "react-helmet-async";

interface SEOProps {
    title?: string;
    description?: string;
}

export const SEO = ({
    title = "Alexis - Pentester Portfolio",
    description = "Portfolio cybersécurité d'Alexis - Pentester & Ingénieur Sécurité"
}: SEOProps) => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                {/* Security Headers Simulation (META tags) */}
                <meta http-equiv="X-Content-Type-Options" content="nosniff" />
                <meta http-equiv="X-XSS-Protection" content="1; mode=block" />
                <meta name="referrer" content="strict-origin-when-cross-origin" />
                {/* CSP usually handled by server, but we can set a meta for demo */}
                <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self';" />
            </Helmet>
        </HelmetProvider>
    );
};
