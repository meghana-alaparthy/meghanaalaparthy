import { Blog } from "@/components/Blog";

export default function BlogPage() {
    return (
        <main className="min-h-screen pt-10 pb-20 bg-background">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-12 border-b border-border pb-8 text-center md:text-left">
                    <h1 className="text-4xl font-bold mb-4">Engineering Blog</h1>
                    <p className="text-xl text-muted-foreground">
                        Sharing learnings from my journey in software engineering.
                    </p>
                </div>

                <Blog />
            </div>
        </main>
    );
}
