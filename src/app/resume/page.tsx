import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { FileDown, Mail } from "lucide-react";
import { resumeData } from "@/data/resume";

export default function ResumePage() {
    return (
        <main className="min-h-screen pt-10 pb-20 bg-background">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-border pb-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">Resume</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl">
                            Specialized in building high-scale backend systems and intuitive frontend experiences.
                        </p>
                    </div>
                    <div className="mt-6 md:mt-0 flex gap-4">
                        <a
                            href={`mailto:${resumeData.personalInfo.email}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
                        >
                            <Mail size={18} />
                            Contact
                        </a>
                        <a
                            href="/Meghana_Alaparthy_Resume.pdf"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-sm"
                        >
                            <FileDown size={18} />
                            Download PDF
                        </a>
                    </div>
                </div>

                <Experience />
                <Skills />
                <Projects />
            </div>
        </main>
    );
}
