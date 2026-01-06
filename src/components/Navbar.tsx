"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Resume", href: "/resume" },
    { name: "Achievements", href: "/achievements" },
    { name: "Blog", href: "/blog" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredPath, setHoveredPath] = useState(pathname);

    const { scrollY } = useScroll();

    // Transform scroll value to opacity/blur
    const bgOpacity = useTransform(scrollY, [0, 50], [0, 0.8]);
    const backdropBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"]);
    const borderOpacity = useTransform(scrollY, [0, 50], [0, 1]);

    useEffect(() => {
        setHoveredPath(pathname);
    }, [pathname]);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
                backgroundColor: useTransform(bgOpacity, (v) => `rgba(255, 255, 255, ${v})`),
                backdropFilter: backdropBlur,
                borderColor: useTransform(borderOpacity, (v) => `rgba(226, 232, 240, ${v})`), // slate-200
            }}
            className="sticky top-0 z-50 w-full border-b border-transparent transition-colors"
        >
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border shadow-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/HeadShot.jpg"
                                alt="MA"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-2 text-sm font-medium" onMouseLeave={() => setHoveredPath(pathname)}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "relative px-4 py-2 transition-colors rounded-full",
                                pathname === item.href ? "text-primary" : "text-foreground/70 hover:text-foreground"
                            )}
                            onMouseEnter={() => setHoveredPath(item.href)}
                        >
                            <span className="relative z-10">{item.name}</span>
                            {hoveredPath === item.href && (
                                <motion.div
                                    layoutId="navbar-pill"
                                    className="absolute inset-0 bg-secondary rounded-full -z-0"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Toggle */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="md:hidden p-2 text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden border-t border-border bg-background px-4 py-4 overflow-hidden"
                    >
                        <nav className="flex flex-col space-y-2">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "block px-4 py-2 text-base font-medium rounded-lg transition-colors",
                                            pathname === item.href
                                                ? "bg-secondary text-primary"
                                                : "text-foreground/70 hover:bg-secondary/50 hover:text-foreground"
                                        )}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
