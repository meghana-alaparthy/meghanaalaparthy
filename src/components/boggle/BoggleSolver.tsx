"use client";

import React, { useState, useEffect, useRef } from 'react';
import { BoggleSolver as SolverLogic } from '@/lib/boggle/BoggleSolver';
import { ChevronRight, Trash2, Zap, LayoutGrid, RotateCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BoggleSolver: React.FC = () => {
    const [size, setSize] = useState<4 | 5>(4);
    const [grid, setGrid] = useState<string[]>(Array(16).fill(''));
    const [results, setResults] = useState<{ word: string; score: number }[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSolving, setIsSolving] = useState(false);

    const solverRef = useRef<SolverLogic>(new SolverLogic());
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        const load = async () => {
            await solverRef.current.loadDictionary('/boggle/assets/dictionary.txt');
            setIsLoaded(true);
        };
        load();
    }, []);

    useEffect(() => {
        setGrid(Array(size * size).fill(''));
        setResults([]);
        inputRefs.current = Array(size * size).fill(null);
    }, [size]);

    const handleInputChange = (index: number, value: string) => {
        if (value.length > 1) value = value.slice(-1);
        if (value && !/[a-zA-Z]/.test(value)) return;

        const newGrid = [...grid];
        newGrid[index] = value.toLowerCase();
        setGrid(newGrid);

        // Auto focus next
        if (value && index < size * size - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !grid[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSolve = () => {
        if (!grid.every(cell => cell !== '')) {
            alert("Please fill all cells first!");
            return;
        }
        setIsSolving(true);
        // Small delay to show "solving" state
        setTimeout(() => {
            const solved = solverRef.current.solve(grid);
            setResults(solved);
            setIsSolving(false);
        }, 100);
    };

    const handleClear = () => {
        setGrid(Array(size * size).fill(''));
        setResults([]);
        inputRefs.current[0]?.focus();
    };

    const fillRandom = () => {
        const common = "eeeeeeeeaaaaaaaiiiooooooonnnnnrrrrrrtttttllllssssuuuuddddggg";
        const newGrid = grid.map(() => common.charAt(Math.floor(Math.random() * common.length)));
        setGrid(newGrid);
        setResults([]);
    };

    if (!isLoaded) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-gray-600 font-medium">Initializing Solver...</p>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-8 bg-white rounded-[40px] shadow-2xl border border-gray-100">
            <header className="text-center mb-8">
                <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
                    <Zap className="w-8 h-8 text-white fill-white" />
                </div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Boggle Solver</h1>
                <p className="text-gray-500 font-medium mt-1">Instant solutions for any grid</p>
            </header>

            <div className="flex gap-2 mb-8 bg-gray-100 p-1.5 rounded-2xl">
                <button
                    onClick={() => setSize(4)}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${size === 4 ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    4x4
                </button>
                <button
                    onClick={() => setSize(5)}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${size === 5 ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    5x5
                </button>
            </div>

            <div
                className={`grid gap-2 mb-8 mx-auto`}
                style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
            >
                {grid.map((char, i) => (
                    <input
                        key={i}
                        ref={el => { inputRefs.current[i] = el; }}
                        type="text"
                        maxLength={1}
                        value={char.toUpperCase()}
                        onChange={(e) => handleInputChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        className={`aspect-square w-full flex items-center justify-center text-center text-xl font-black rounded-xl border-2 transition-all
                            ${char ? 'border-indigo-500 bg-indigo-50 text-indigo-900' : 'border-gray-200 bg-white focus:border-indigo-300'}`}
                    />
                ))}
            </div>

            <div className="flex flex-col gap-3 mb-8">
                <button
                    onClick={handleSolve}
                    disabled={isSolving}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-2 text-lg"
                >
                    {isSolving ? <RotateCw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 fill-white" />}
                    {isSolving ? 'Solving...' : 'Solve Grid'}
                </button>
                <div className="flex gap-3">
                    <button
                        onClick={fillRandom}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-2xl transition-all flex items-center justify-center gap-2"
                    >
                        <LayoutGrid className="w-4 h-4" />
                        Random
                    </button>
                    <button
                        onClick={handleClear}
                        className="flex-1 border-2 border-gray-100 hover:bg-gray-50 text-gray-600 font-bold py-3 rounded-2xl transition-all flex items-center justify-center gap-2"
                    >
                        <Trash2 className="w-4 h-4" />
                        Clear
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border-t-2 border-gray-50 pt-8"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black text-gray-900">Results</h2>
                            <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                                {results.length} Words
                            </span>
                        </div>

                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {results.map((res, i) => (
                                <motion.div
                                    key={res.word}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.01 }}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-indigo-200 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-black text-gray-400 border border-gray-100 group-hover:text-indigo-600 transition-colors">
                                            {i + 1}
                                        </div>
                                        <span className="font-bold text-gray-800 text-lg">{res.word}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-indigo-600 font-black">{res.score} pts</span>
                                        <ChevronRight className="w-4 h-4 text-gray-300" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BoggleSolver;
