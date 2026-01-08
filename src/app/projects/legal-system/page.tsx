"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Scale, Lock, ShieldCheck, FileText, UserCheck, AlertOctagon, Search } from "lucide-react";
import Link from "next/link";

export default function LegalSystemPage() {
    const [role, setRole] = useState<'admin' | 'lawyer' | 'intern'>('lawyer');
    const [searchQuery, setSearchQuery] = useState("");

    const documents = [
        { id: "CASE-2024-001", title: "Smith v. State - Evidence Log", level: "Top Secret", access: ["admin"] },
        { id: "CASE-2024-002", title: "Corporate Merger Agreement", level: "Confidential", access: ["admin", "lawyer"] },
        { id: "CASE-2024-003", title: "Public Court Records", level: "Public", access: ["admin", "lawyer", "intern"] },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-100 pb-20">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
                        Meghana Alaparthy
                    </Link>
                    <Link href="/achievements" className="text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors">
                        ← Back to Projects
                    </Link>
                </div>
            </nav>

            <main className="pt-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column: Interactive Dashboard */}
                <div className="lg:col-span-7 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                                <Scale className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">Keeping Legal Documents Safe</h1>
                                <p className="text-slate-500">I built a secure platform for law firms to manage their case files without worrying about leaks.</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="bg-white rounded-2xl shadow-xl shadow-amber-500/5 border border-amber-100 overflow-hidden">
                        <div className="border-b border-slate-100 bg-slate-50 p-4 flex items-center justify-between">
                            <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4" /> Security Context Simulation
                            </h3>
                        </div>

                        <div className="p-8 space-y-8">
                            {/* Role Switcher */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-3">Impersonate Role</label>
                                <div className="flex bg-slate-100 p-1 rounded-lg w-fit">
                                    {(['admin', 'lawyer', 'intern'] as const).map((r) => (
                                        <button
                                            key={r}
                                            onClick={() => setRole(r)}
                                            className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${role === r ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                                }`}
                                        >
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px bg-slate-100" />

                            {/* Document List */}
                            <div className="space-y-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search case files..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                                    />
                                </div>

                                <div className="space-y-3">
                                    {documents.map((doc) => {
                                        const hasAccess = doc.access.includes(role);
                                        return (
                                            <motion.div
                                                key={doc.id}
                                                layout
                                                initial={false}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className={`p-4 rounded-xl border flex items-center justify-between ${hasAccess ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-200 opacity-60'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-2 rounded-lg ${hasAccess ? 'bg-blue-50 text-blue-600' : 'bg-slate-200 text-slate-400'}`}>
                                                        <FileText className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-slate-900 flex items-center gap-2">
                                                            {doc.title}
                                                            {!hasAccess && <Lock className="w-3 h-3 text-red-500" />}
                                                        </div>
                                                        <div className="text-xs text-slate-500 font-mono mt-1 flex items-center gap-2">
                                                            <span>{doc.id}</span>
                                                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                                                            <span className={`uppercase font-bold ${doc.level === 'Top Secret' ? 'text-red-600' :
                                                                doc.level === 'Confidential' ? 'text-amber-600' :
                                                                    'text-green-600'
                                                                }`}>{doc.level}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-sm">
                                                    {hasAccess ? (
                                                        <button className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors">
                                                            View
                                                        </button>
                                                    ) : (
                                                        <span className="flex items-center gap-1 text-red-500 font-medium px-3 py-1.5 bg-red-50 rounded-lg">
                                                            <AlertOctagon className="w-3 h-3" /> Denied
                                                        </span>
                                                    )}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Architecture */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <UserCheck className="w-5 h-5 text-slate-400" />
                            How it's secured
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Who can see what?</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    Instead of just giving someone a 'Lawyer' role, I used **Attribute-Based Access Control (ABAC)**. This means access changes based on the document's sensitivity, the user's role, and even the time of day they're trying to view it.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Keeping data locked up</h3>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-xs font-mono space-y-2 text-slate-600">
                                    <div>At Rest: Everything is encrypted at the column level (AES-256)</div>
                                    <div>In Transit: Using TLS 1.3 to keep data safe while it moves</div>
                                    <div className="text-amber-700 font-bold">Audit: I built a ledger that tracks every single attempt to open a file.</div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">The Impact</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    The platform now handles over 10,000 sensitive legal documents. It even passed a professional penetration test without any critical security issues found.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
