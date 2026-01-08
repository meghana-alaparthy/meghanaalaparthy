"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BoggleSolver } from '@/lib/boggle/BoggleSolver';
import { QRCodeSVG } from 'qrcode.react';
import { Timer, Trophy, Share2, Play, RotateCcw, X, Info, Crown, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DICE = [
    "AAEEGN", "ELTTY", "AOOTTW", "ABBJOO", "EHRTVW", "CIMOTU",
    "DISTTY", "EIOSST", "DELRVY", "ACHOPS", "HIMNQU", "EEINSU",
    "EEGHNW", "AFFKPS", "HLNNRZ", "DEILRX"
];

interface LeaderboardEntry {
    name: string;
    score: number;
    date: string;
}

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

    // Swipe Interaction States
    const [currentPath, setCurrentPath] = useState<number[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const gridRef = useRef<HTMLDivElement>(null);
    const cellsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Leaderboard State
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [playerName, setPlayerName] = useState('');
    const [hasSubmittedScore, setHasSubmittedScore] = useState(false);

    const solverRef = useRef<BoggleSolver>(new BoggleSolver());
    const timerRef = useRef<NodeJS.Timeout>(null);

    // Initialize
    useEffect(() => {
        const load = async () => {
            await solverRef.current.loadDictionary('/boggle/assets/dictionary.txt');
            setIsLoaded(true);

            // Load Leaderboard
            const saved = localStorage.getItem('boggle_leaderboard');
            if (saved) setLeaderboard(JSON.parse(saved));

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
        setHasSubmittedScore(false);
        generateRandomGrid();
        setCurrentPath([]);
    };

    const endGame = useCallback(() => {
        setGameActive(false);
        setShowResults(true);
        setIsDragging(false);
        setCurrentPath([]);
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

    const submitWord = (word: string) => {
        const normalized = word.trim().toLowerCase();
        if (normalized.length < 3 || foundWords.has(normalized)) return;

        const allWords = solverRef.current.solve(grid);
        const match = allWords.find(w => w.word === normalized);

        if (match) {
            setFoundWords(prev => new Set([...prev, normalized]));
            setScore(prev => prev + match.score);
            return true;
        }
        return false;
    };

    const handleSubmitInput = (e?: React.FormEvent) => {
        e?.preventDefault();
        submitWord(wordInput);
        setWordInput('');
    };

    // --- SWIPE LOGIC ---

    const isAdjacent = (idx1: number, idx2: number) => {
        const r1 = Math.floor(idx1 / 4);
        const c1 = idx1 % 4;
        const r2 = Math.floor(idx2 / 4);
        const c2 = idx2 % 4;
        return Math.abs(r1 - r2) <= 1 && Math.abs(c1 - c2) <= 1;
    };

    const startPath = (index: number) => {
        if (!gameActive) return;
        setIsDragging(true);
        setCurrentPath([index]);
        if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(10);
        }
    };

    const extendPath = (index: number) => {
        if (!isDragging || currentPath.includes(index)) return;
        const last = currentPath[currentPath.length - 1];
        if (isAdjacent(last, index)) {
            setCurrentPath(prev => [...prev, index]);
            if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate(5);
            }
        }
    };

    const finalizePath = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (currentPath.length >= 3) {
            const word = currentPath.map(i => grid[i]).join('');
            submitWord(word);
        }
        setCurrentPath([]);
    };

    // Touch Handling (elementFromPoint is needed because touchmove doesn't trigger enter/exit)
    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement;
        const cellIndex = element?.getAttribute('data-cell-index');
        if (cellIndex !== null && cellIndex !== undefined) {
            extendPath(parseInt(cellIndex));
        }
    };

    // --- LEADERBOARD LOGIC ---
    const submitToLeaderboard = () => {
        if (!playerName.trim()) return;
        const newEntry: LeaderboardEntry = {
            name: playerName,
            score: score,
            date: new Date().toLocaleDateString()
        };
        const newLeaderboard = [...leaderboard, newEntry]
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);

        setLeaderboard(newLeaderboard);
        localStorage.setItem('boggle_leaderboard', JSON.stringify(newLeaderboard));
        setHasSubmittedScore(true);
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
                <p className="mt-4 text-gray-600 font-medium">Initializing Boggle Engine...</p>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 mb-12 select-none">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-black text-indigo-600 tracking-tight">BOGGLE</h1>
                <p className="text-gray-500 font-medium">Swipe over letters to form words</p>
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
                    title="Share with Friends"
                >
                    <Share2 className="w-6 h-6" />
                </button>
            </div>

            {/* INTERACTIVE GRID */}
            <div
                ref={gridRef}
                className="grid grid-cols-4 gap-3 mb-8 relative touch-none"
                onMouseLeave={finalizePath}
                onMouseUp={finalizePath}
                onTouchEnd={finalizePath}
                onTouchMove={handleTouchMove}
            >
                {grid.map((char, i) => (
                    <div
                        key={i}
                        data-cell-index={i}
                        onMouseDown={() => startPath(i)}
                        onMouseEnter={() => extendPath(i)}
                        onTouchStart={() => startPath(i)}
                        className={`aspect-square flex items-center justify-center text-2xl font-black rounded-xl border-2 transition-all duration-200
                            ${currentPath.includes(i)
                                ? 'bg-indigo-600 border-indigo-700 text-white scale-95 shadow-inner'
                                : gameActive
                                    ? 'bg-white border-indigo-100 text-indigo-900 shadow-sm'
                                    : 'bg-gray-50 border-gray-100 text-gray-400 opacity-50'}`}
                    >
                        {char.toUpperCase()}
                    </div>
                ))}

                {/* Visual Path Display (The Current Word Being Formed) */}
                <div className="absolute -top-10 left-0 right-0 text-center pointer-events-none">
                    <AnimatePresence mode="wait">
                        {currentPath.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="bg-indigo-600 text-white px-4 py-1 rounded-full text-lg font-black tracking-widest inline-block shadow-lg"
                            >
                                {currentPath.map(i => grid[i]).join('').toUpperCase()}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[100px] content-start overflow-y-auto max-h-[150px] p-4 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                <AnimatePresence>
                    {Array.from(foundWords).map(word => (
                        <motion.span
                            key={word}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-bold border border-green-200 uppercase"
                        >
                            {word}
                        </motion.span>
                    ))}
                </AnimatePresence>
                {foundWords.size === 0 && (
                    <p className="text-gray-400 text-sm font-medium m-auto lowercase">Waiting for first word...</p>
                )}
            </div>

            {/* Results & Leaderboard Modal */}
            <AnimatePresence>
                {showResults && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-6 overflow-y-auto"
                    >
                        <div className="bg-white rounded-[3rem] p-10 max-w-sm w-full relative max-h-[90vh] overflow-y-auto">
                            <button
                                onClick={() => setShowResults(false)}
                                className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>

                            <div className="text-center mb-8">
                                <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Game Over!</h2>
                                <div className="text-5xl font-black text-indigo-600 my-4">{score}</div>
                                <p className="text-gray-500">You found {foundWords.size} words.</p>
                            </div>

                            {/* Score Submission */}
                            {!hasSubmittedScore && (
                                <div className="bg-indigo-50 p-6 rounded-3xl mb-8 border border-indigo-100 shadow-inner">
                                    <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-4">Submit Score</h3>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={playerName}
                                            onChange={(e) => setPlayerName(e.target.value)}
                                            placeholder="Your Name"
                                            className="flex-1 px-4 py-3 rounded-xl border-2 border-indigo-200 focus:border-indigo-500 outline-none font-bold"
                                        />
                                        <button
                                            onClick={submitToLeaderboard}
                                            className="bg-indigo-600 text-white font-bold px-4 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* LEADERBOARD TABLE */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <History size={14} /> Friend Leaderboard
                                </h3>
                                <div className="space-y-2">
                                    {leaderboard.map((entry, i) => (
                                        <div key={i} className={`flex justify-between items-center p-3 rounded-xl border ${i === 0 ? 'bg-yellow-50 border-yellow-200 shadow-sm' : 'bg-gray-50 border-gray-100'}`}>
                                            <div className="flex items-center gap-3">
                                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${i === 0 ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                                    {i + 1}
                                                </span>
                                                <span className="font-bold text-gray-800">{entry.name}</span>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="font-black text-indigo-600">{entry.score}</span>
                                                <span className="text-[8px] text-gray-400 uppercase">{entry.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {leaderboard.length === 0 && <p className="text-gray-400 text-sm text-center py-4">Be the first to set a record!</p>}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* QR Code Modal (Unchanged) */}
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
                                <p className="text-gray-500">Share this with friends to compete on the same board!</p>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border-4 border-indigo-50 inline-block mb-6 shadow-xl">
                                <QRCodeSVG value={shareUrl} size={200} includeMargin={true} />
                            </div>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(shareUrl);
                                }}
                                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-2xl shadow-lg"
                            >
                                Copy Link
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BoggleGame;
