"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BoggleSolver } from '@/lib/boggle/BoggleSolver';
import { QRCodeSVG } from 'qrcode.react';
import { Timer, Trophy, Share2, Play, RotateCcw, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DICE = [
    "AAEEGN", "ELTTY", "AOOTTW", "ABBJOO", "EHRTVW", "CIMOTU",
    "DISTTY", "EIOSST", "DELRVY", "ACHOPS", "HIMNQU", "EEINSU",
    "EEGHNW", "AFFKPS", "HLNNRZ", "DEILRX"
];

const BoggleGame: React.FC = () => {
    const [grid, setGrid] = useState<string[]>(Array(16).fill(''));
    const [score, setScore] = useState(0);
    const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
    const [gameActive, setGameActive] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(120);
    const [wordInput, setWordInput] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [missedWords, setMissedWords] = useState<{ word: string; score: number }[]>([]);
    const [showQR, setShowQR] = useState(false);
    const [shareUrl, setShareUrl] = useState('');

    const solverRef = useRef<BoggleSolver>(new BoggleSolver());
    const timerRef = useRef<NodeJS.Timeout>(null);

    useEffect(() => {
        const load = async () => {
            await solverRef.current.loadDictionary('/boggle/assets/dictionary.txt');
            setIsLoaded(true);

            // Check URL for board
            const urlParams = new URLSearchParams(window.location.search);
            const board = urlParams.get('board');
            if (board && board.length === 16) {
                setGrid(board.split(''));
            } else {
                generateRandomGrid();
            }
        };
        load();
    }, []);

    const generateRandomGrid = () => {
        const shuffledDice = [...DICE].sort(() => Math.random() - 0.5);
        const newGrid = shuffledDice.map(die => die.charAt(Math.floor(Math.random() * die.length)));
        setGrid(newGrid);
    };

    const startGame = () => {
        setScore(0);
        setFoundWords(new Set());
        setGameActive(true);
        setTimeRemaining(120);
        setWordInput('');
        setShowResults(false);
        generateRandomGrid();
    };

    const endGame = useCallback(() => {
        setGameActive(false);
        setShowResults(true);
        if (timerRef.current) clearInterval(timerRef.current);

        const allPossible = solverRef.current.solve(grid);
        const missed = allPossible.filter(w => !foundWords.has(w.word));
        setMissedWords(missed);
    }, [grid, foundWords]);

    useEffect(() => {
        if (gameActive && timeRemaining > 0) {
            timerRef.current = setInterval(() => {
                setTimeRemaining(prev => prev - 1);
            }, 1000);
        } else if (timeRemaining === 0 && gameActive) {
            endGame();
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [gameActive, timeRemaining, endGame]);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        const word = wordInput.trim().toLowerCase();
        setWordInput('');

        if (word.length < 3 || foundWords.has(word)) return;

        const allWords = solverRef.current.solve(grid);
        const match = allWords.find(w => w.word === word);

        if (match) {
            setFoundWords(prev => new Set([...prev, word]));
            setScore(prev => prev + match.score);
        }
    };

    const handleShare = () => {
        const boardString = grid.join('').toUpperCase();
        const url = `${window.location.origin}/boggle/game?board=${boardString}`;
        setShareUrl(url);
        setShowQR(true);
    };

    if (!isLoaded) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-gray-600 font-medium">Loading Dictionary...</p>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-black text-indigo-600 tracking-tight">BOGGLE</h1>
                <p className="text-gray-500 font-medium">Can you find all the words?</p>
            </header>

            <div className="flex justify-between items-center mb-6 px-2">
                <div className="bg-indigo-50 px-4 py-2 rounded-2xl flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-indigo-600" />
                    <span className="text-xl font-bold text-indigo-900">{score}</span>
                </div>
                <div className={`px-4 py-2 rounded-2xl flex items-center gap-2 ${timeRemaining < 15 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-green-50 text-green-700'}`}>
                    <Timer className="w-5 h-5" />
                    <span className="text-xl font-bold tabular-nums">
                        {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                    </span>
                </div>
            </div>

            <div className="flex gap-2 mb-6">
                <button
                    onClick={startGame}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-2xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
                >
                    {gameActive ? <RotateCcw className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    {gameActive ? 'Restart' : 'New Game'}
                </button>
                <button
                    onClick={handleShare}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold p-3 rounded-2xl transition-all"
                    title="Share & Play on Mobile"
                >
                    <Share2 className="w-6 h-6" />
                </button>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-8">
                {grid.map((char, i) => (
                    <motion.div
                        key={i}
                        whileHover={gameActive ? { scale: 1.05 } : {}}
                        className={`aspect-square flex items-center justify-center text-2xl font-black rounded-xl border-2 shadow-sm
                            ${gameActive ? 'bg-white border-indigo-100 text-indigo-900' : 'bg-gray-50 border-gray-200 text-gray-400 opacity-50'}`}
                    >
                        {char.toUpperCase()}
                    </motion.div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
                <input
                    type="text"
                    value={wordInput}
                    onChange={(e) => setWordInput(e.target.value)}
                    disabled={!gameActive}
                    placeholder={gameActive ? "Type word..." : "Start game to play"}
                    className="flex-1 bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3 font-bold text-lg focus:border-indigo-500 focus:outline-none disabled:cursor-not-allowed transition-colors"
                />
                <button
                    disabled={!gameActive || wordInput.length < 3}
                    className="bg-indigo-600 disabled:bg-gray-200 text-white font-bold px-6 py-3 rounded-2xl shadow-md transition-all whitespace-nowrap"
                >
                    Submit
                </button>
            </form>

            <div className="flex flex-wrap gap-2 min-h-[100px] content-start overflow-y-auto max-h-[150px] p-2 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <AnimatePresence>
                    {Array.from(foundWords).map(word => (
                        <motion.span
                            key={word}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-bold border border-green-200"
                        >
                            {word}
                        </motion.span>
                    ))}
                </AnimatePresence>
                {foundWords.size === 0 && (
                    <p className="text-gray-400 text-sm font-medium m-auto">No words found yet</p>
                )}
            </div>

            {/* Results Modal */}
            <AnimatePresence>
                {showResults && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="mt-8 p-6 bg-indigo-900 text-white rounded-3xl"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-white">Game Over!</h2>
                            <span className="bg-indigo-600 px-4 py-1 rounded-full text-sm font-bold">Score: {score}</span>
                        </div>
                        <p className="text-indigo-200 text-sm mb-4">You found {foundWords.size} words.</p>

                        <div className="max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                            <h3 className="text-indigo-300 text-xs font-black tracking-widest uppercase mb-2">Missed Words</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {missedWords.slice(0, 20).map(m => (
                                    <div key={m.word} className="flex justify-between text-sm opacity-80">
                                        <span>{m.word}</span>
                                        <span className="font-mono">{m.score}</span>
                                    </div>
                                ))}
                                {missedWords.length > 20 && <div className="text-xs italic opacity-50">+{missedWords.length - 20} more...</div>}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* QR Code Modal */}
            <AnimatePresence>
                {showQR && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            className="bg-white p-8 rounded-[40px] max-w-sm w-full text-center relative"
                        >
                            <button
                                onClick={() => setShowQR(false)}
                                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                            <div className="mb-6">
                                <div className="bg-indigo-100 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                                    <Share2 className="w-8 h-8 text-indigo-600" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-2">Scan & Play</h3>
                                <p className="text-gray-500">Scan this code with your phone to play this exact board!</p>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border-4 border-indigo-50 inline-block mb-6 shadow-xl">
                                <QRCodeSVG value={shareUrl} size={200} includeMargin={true} />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(shareUrl);
                                        // Optional: toast notification
                                    }}
                                    className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-2xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                                >
                                    Copy Link
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BoggleGame;
