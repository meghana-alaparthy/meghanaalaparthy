import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";

export default function Home() {
    return (
        <main className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary-foreground">
            <Hero />
            <Experience />
            <Skills />
            <Projects />
            <Blog />
            <Contact />

            {/* Footer */}
            <footer className="py-8 text-center text-muted-foreground text-sm border-t border-border mt-20">
                <p>© {new Date().getFullYear()} Meghana Alaparthy. All rights reserved.</p>
            </footer>
        </main>
    );
}
