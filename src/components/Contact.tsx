"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";

export function Contact() {
    // Simple state for form demo
    const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState("submitting");
        // Simulate submission
        setTimeout(() => setFormState("success"), 1500);
    };

    return (
        <section id="contact" className="py-20 px-4 bg-secondary/20">
            <div className="max-w-xl mx-auto text-center font-sans">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
                    <p className="text-muted-foreground mb-12">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4 text-left">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                required
                                className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                            <textarea
                                id="message"
                                required
                                rows={4}
                                className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                                placeholder="Hello! I'd like to discuss..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={formState !== "idle"}
                            className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {formState === "idle" && (
                                <>
                                    Send Message <Send size={18} />
                                </>
                            )}
                            {formState === "submitting" && "Sending..."}
                            {formState === "success" && "Message Sent!"}
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-border">
                        <p className="text-sm text-muted-foreground mb-4">Or reach out directly:</p>
                        <a
                            href={`mailto:${resumeData.personalInfo.email}`}
                            className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors"
                        >
                            <Mail size={20} />
                            {resumeData.personalInfo.email}
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
