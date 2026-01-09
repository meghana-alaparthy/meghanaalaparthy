"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Twitter, MapPin } from "lucide-react";
import { resumeData } from "@/data/resume";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-b from-white to-indigo-50 border-t border-indigo-100 pt-16 pb-8 mt-auto">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    {/* Brand & Location */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold font-mono text-slate-900">
                                {resumeData.personalInfo.name}
                            </h3>
                            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                                Building scalable distributed systems and resilient microservices.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-white px-3 py-1.5 rounded-full w-fit border border-indigo-50 shadow-sm">
                            <MapPin size={14} className="text-indigo-500" />
                            <span>Dallas, TX · CST</span>
                        </div>
                    </div>

                    {/* Connect / Socials */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Connect</h4>
                        <div className="flex gap-4">
                            <a
                                href={resumeData.personalInfo.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white rounded-lg border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href={resumeData.personalInfo.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white rounded-lg border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                                aria-label="GitHub"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href={`mailto:${resumeData.personalInfo.email}`}
                                className="p-2 bg-white rounded-lg border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                                aria-label="Email"
                            >
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Explore</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li>
                                <Link href="/about" className="hover:text-indigo-600 hover:translate-x-1 transition-all inline-block">
                                    About Me
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-indigo-600 hover:translate-x-1 transition-all inline-block">
                                    Technical Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/achievements" className="hover:text-indigo-600 hover:translate-x-1 transition-all inline-block">
                                    Case Studies
                                </Link>
                            </li>
                            <li>
                                <Link href="/resume" className="hover:text-indigo-600 hover:translate-x-1 transition-all inline-block">
                                    Resume
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
            </div>
        </footer>
    );
}
