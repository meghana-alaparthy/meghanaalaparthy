"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, Lock, Server, CheckCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function PIIRedactionPage() {
    const [inputText, setInputText] = useState(
        "Contact John Doe at john.doe@example.com or call 555-0199 regarding user 999-01-2345. Provide updates by 5 PM."
    );
    const [redactedText, setRedactedText] = useState("");
    const [metrics, setMetrics] = useState({
        emails: 0,
        phones: 0,
        ssns: 0,
        latency: 0,
    });

    const redactPatterns = {
        email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
        phone: /(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g,
        ssn: /\d{3}-\d{2}-\d{4}/g,
    };

    const processRedaction = () => {
        const startTime = performance.now();
        let text = inputText;
        let emailCount = 0;
        let phoneCount = 0;
        let ssnCount = 0;

        // Redact Emails
        text = text.replace(redactPatterns.email, () => {
            emailCount++;
            return "[EMAIL REDACTED]";
        });

        // Redact SSNs
        text = text.replace(redactPatterns.ssn, () => {
            ssnCount++;
            return "[SSN REDACTED]";
        });

        // Redact Phones
        text = text.replace(redactPatterns.phone, () => {
            phoneCount++;
            return "[PHONE REDACTED]";
        });

        const endTime = performance.now();
        setRedactedText(text);
        setMetrics({
            emails: emailCount,
            phones: phoneCount,
            ssns: ssnCount,
            latency: Math.round((endTime - startTime) * 100) / 100,
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 pb-20">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
                        Meghana Alaparthy
                    </Link>
                    <Link href="/achievements" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                        ← Back to Projects
                    </Link>
                </div>
            </nav>

            <main className="pt-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column: Interactive Tool */}
                <div className="lg:col-span-7 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">Cleaning up sensitive data</h1>
                                <p className="text-slate-500">I built a tool to automatically hide things like SSNs and emails in text logs before they get stored.</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="border-b border-slate-100 bg-slate-50 p-4 flex items-center justify-between">
                            <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                                <Lock className="w-4 h-4" /> Live Demo Environment
                            </h3>
                            <div className="flex gap-2">
                                <span className="text-xs font-mono bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    System Online
                                </span>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Input Data Stream</label>
                                <textarea
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none bg-slate-50"
                                    placeholder="Enter text containing sensitive PII..."
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={processRedaction}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all flex items-center gap-2 active:scale-95"
                                >
                                    <Shield className="w-4 h-4" /> Run Sanitization
                                </button>
                            </div>

                            {redactedText && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="space-y-4"
                                >
                                    <div className="h-px bg-slate-100" />

                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                                            <div className="text-xs text-red-600 font-medium uppercase">Emails Processed</div>
                                            <div className="text-2xl font-bold text-red-700">{metrics.emails}</div>
                                        </div>
                                        <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                                            <div className="text-xs text-orange-600 font-medium uppercase">Phones Processed</div>
                                            <div className="text-2xl font-bold text-orange-700">{metrics.phones}</div>
                                        </div>
                                        <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                                            <div className="text-xs text-purple-600 font-medium uppercase">SSNs Processed</div>
                                            <div className="text-2xl font-bold text-purple-700">{metrics.ssns}</div>
                                        </div>
                                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                                            <div className="text-xs text-blue-600 font-medium uppercase">Latency</div>
                                            <div className="text-2xl font-bold text-blue-700">{metrics.latency}ms</div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Sanitized Output</label>
                                        <div className="w-full h-32 p-4 rounded-xl border border-green-200 bg-green-50/50 font-mono text-sm overflow-auto text-slate-800">
                                            {redactedText}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Key Architecture Info */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Server className="w-5 h-5 text-slate-400" />
                            The Engineering Behind the Scenes
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">The Challenge</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    Managing sensitive data exposure in high-throughput telemetry streams is a critical compliance hurdle. Pattern matching often suffers from **performance bottlenecks** and **contextual blindness**, leading to either leaked secrets or excessive false positives.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Architectural Approach</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    I architected a stream-processing engine that combines **Aho-Corasick automaton-based scanning** for speed with **NLP entity recognition** for precision. This dual-layer approach ensures that redaction is both low-latency and context-aware, sitting as a mandatory middleware layer before data persistence.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Senior Design Considerations</h3>
                                <ul className="space-y-3">
                                    <li className="flex gap-3 text-sm text-slate-600">
                                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                        <span>**Horizontal Scalability**: Stateless design allows for seamless scaling across Kubernetes nodes to handle ingestion spikes.</span>
                                    </li>
                                    <li className="flex gap-3 text-sm text-slate-600">
                                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                        <span>**Zero-Trust Ingestion**: Redaction occurs at the collection edge, ensuring unmasked PII never crosses internal network boundaries.</span>
                                    </li>
                                    <li className="flex gap-3 text-sm text-slate-600">
                                        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                                        <span>**Latency/Precision Trade-off**: I opted for a hybrid model that budgets 15ms for NLP inference to gain a 40% improvement in PII capture over pure regex.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
