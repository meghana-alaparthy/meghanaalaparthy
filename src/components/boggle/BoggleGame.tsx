"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BoggleSolver } from '@/lib/boggle/BoggleSolver';
import { QRCodeSVG } from 'qrcode.react';
import { Timer, Trophy, Share2, Play, RotateCcw, X, Info, Crown, History, Users, Plus, Hash, ArrowRight } from 'lucide-react';
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

interface Player {
    name: string;
    score: number;
    foundWords: string[];
    lastActive: string;
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

    // Leaderboard & Multiplayer State
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [playerName, setPlayerName] = useState('');
    const [roomCode, setRoomCode] = useState('');
    const [isMultiplayer, setIsMultiplayer] = useState(false);
    const [roomPlayers, setRoomPlayers] = useState<Player[]>([]);
    const [hasSubmittedScore, setHasSubmittedScore] = useState(false);
    const [showLobby, setShowLobby] = useState(true);

    const solverRef = useRef<BoggleSolver>(new BoggleSolver());
    const timerRef = useRef<NodeJS.Timeout>(null);
    const syncIntervalRef = useRef<NodeJS.Timeout>(null);

    // Initialize
    useEffect(() => {
        const load = async () => {
            await solverRef.current.loadDictionary('/boggle/assets/dictionary.txt');
            setIsLoaded(true);

            // Load Leaderboard
            const saved = localStorage.getItem('boggle_leaderboard');
            if (saved) setLeaderboard(JSON.parse(saved));

            const savedName = localStorage.getItem('boggle_player_name');
            if (savedName) setPlayerName(savedName);

            // Check URL for room or board
            const urlParams = new URLSearchParams(window.location.search);
            const room = urlParams.get('room');
            const board = urlParams.get('board');

            if (room) {
                setRoomCode(room);
                setIsMultiplayer(true);
                setShowLobby(false);
                joinRoom(room);
            } else if (board && board.length === 16) {
                setGrid(board.split(''));
                setShowLobby(false);
            }
        };
        load();
    }, []);

    // Sync Logic
    const syncData = useCallback(async () => {
        if (!isMultiplayer || !roomCode || !playerName || !gameActive) return;

        try {
            const res = await fetch('/api/boggle/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roomCode,
                    playerName,
                    score,
                    foundWords: Array.from(foundWords)
                })
            });
            const data = await res.json();
            if (data.players) {
                setRoomPlayers(data.players);
            }
        } catch (err) {
            console.error('Sync Error:', err);
        }
    }, [isMultiplayer, roomCode, playerName, score, foundWords, gameActive]);

    useEffect(() => {
        if (isMultiplayer && gameActive) {
            syncIntervalRef.current = setInterval(syncData, 3000);
        } else {
            if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
        }
        return () => {
            if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
        };
    }, [isMultiplayer, gameActive, syncData]);

    const joinRoom = async (code: string) => {
        try {
            const res = await fetch(`/api/boggle/room?roomCode=${code}`);
            const data = await res.json();
            if (data.board) {
                setGrid(data.board);
                setRoomPlayers(data.players || []);
                startGame(true);
            }
        } catch (err) {
            alert('Could not join room');
        }
    };

    const createRoom = async () => {
        if (!playerName) {
            alert('Please enter your name first');
            return;
        }
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        try {
            const res = await fetch('/api/boggle/room', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ roomCode: code })
            });
            const data = await res.json();
            if (data.roomCode) {
                setRoomCode(data.roomCode);
                setGrid(data.board);
                setIsMultiplayer(true);
                setShowLobby(false);
                startGame(true);

                // Update URL
                const url = new URL(window.location.href);
                url.searchParams.set('room', data.roomCode);
                window.history.pushState({}, '', url);
            }
        } catch (err) {
            alert('Could not create room');
        }
    };

    const generateRandomGrid = () => {
        const shuffledDice = [...DICE].sort(() => Math.random() - 0.5);
        const newGrid = shuffledDice.map(die => die.charAt(Math.floor(Math.random() * die.length)));
        setGrid(newGrid);
    };

    const startGame = (keepingBoard = false) => {
        setScore(0);
        setFoundWords(new Set());
        setGameActive(true);
        setTimeRemaining(120);
        setWordInput('');
        setShowResults(false);
        setHasSubmittedScore(false);
        if (!keepingBoard) generateRandomGrid();
        setCurrentPath([]);
        setShowLobby(false);
        if (playerName) localStorage.setItem('boggle_player_name', playerName);
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

        // Final sync if multiplayer
        syncData();
    }, [grid, foundWords, syncData]);

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

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement;
        const cellIndex = element?.getAttribute('data-cell-index');
        if (cellIndex !== null && cellIndex !== undefined) {
            extendPath(parseInt(cellIndex));
        }
    };

    const handleShare = () => {
        const origin = window.location.origin;
        const url = isMultiplayer
            ? `${origin}/boggle/game?room=${roomCode}`
            : `${origin}/boggle/game?board=${grid.join('').toUpperCase()}`;
        setShareUrl(url);
        setShowQR(true);
    };

    if (!isLoaded) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-gray-600 font-medium">Connecting to Boggle Cloud...</p>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 mb-12 select-none relative overflow-hidden">

            {showLobby && (
                <div className="absolute inset-0 z-50 bg-white p-8 flex flex-col justify-center gap-8">
                    <header className="text-center">
                        <h1 className="text-5xl font-black text-indigo-600 tracking-tighter mb-2">BOGGLE</h1>
                        <p className="text-gray-400 font-medium italic">multiplayer 2.0</p>
                    </header>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-indigo-900 uppercase tracking-widest ml-1">Your Alias</label>
                            <input
                                type="text"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                placeholder="Enter Name..."
                                className="w-full bg-indigo-50 border-2 border-indigo-100 rounded-2xl px-6 py-4 font-bold text-lg focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => startGame()}
                                className="bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-200 flex flex-col items-center gap-1 active:scale-95 transition-transform"
                            >
                                <Play size={24} />
                                <span className="text-xs uppercase">Solo Play</span>
                            </button>
                            <button
                                onClick={createRoom}
                                className="bg-white border-2 border-indigo-600 text-indigo-600 font-black py-4 rounded-2xl flex flex-col items-center gap-1 active:scale-95 transition-transform"
                            >
                                <Plus size={24} />
                                <span className="text-xs uppercase">Create Room</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="h-px bg-gray-100 flex-1" />
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">or join</span>
                            <div className="h-px bg-gray-100 flex-1" />
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={roomCode}
                                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                                placeholder="ROOM CODE"
                                className="flex-1 bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 font-black tracking-widest text-center focus:border-indigo-500 outline-none transition-all"
                            />
                            <button
                                onClick={() => joinRoom(roomCode)}
                                className="bg-gray-100 text-gray-400 font-black px-6 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all"
                            >
                                <ArrowRight size={24} />
                            </button>
                        </div>
                    </div>

                    <p className="text-center text-gray-300 text-xs mt-4">Built for scale. Swipe to play.</p>
                </div>
            )}

            <header className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-black text-indigo-600 tracking-tighter">BOGGLE</h1>
                    {isMultiplayer && (
                        <div className="flex items-center gap-1 text-[10px] font-black text-green-500 uppercase tracking-widest">
                            <Users size={10} /> Room: {roomCode}
                        </div>
                    )}
                </div>
                <button onClick={() => setShowLobby(true)} className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-indigo-600 transition-all">
                    <X size={20} />
                </button>
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

            {/* LIVE MULTIPLAYER LEADERBOARD (Small) */}
            {isMultiplayer && roomPlayers.length > 1 && (
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                    {roomPlayers.sort((a, b) => b.score - a.score).map((p, i) => (
                        <div key={p.name} className={`flex-shrink-0 px-3 py-1 rounded-full text-[10px] font-black border flex items-center gap-2 ${p.name === playerName ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-gray-400 border-gray-100'}`}>
                            <span className="opacity-50">#{i + 1}</span>
                            <span>{p.name.substring(0, 8)}</span>
                            <span className="opacity-80">{p.score}</span>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => isMultiplayer ? joinRoom(roomCode) : startGame()}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-2xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
                >
                    <RotateCcw className="w-5 h-5" />
                    Restart
                </button>
                <button onClick={handleShare} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold p-3 rounded-2xl transition-all">
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
            </div>

            {/* CURRENT WORD BUBBLE */}
            <div className="flex justify-center mb-6 h-8">
                <AnimatePresence>
                    {currentPath.length > 0 && (
                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            className="bg-indigo-600 text-white px-6 py-1 rounded-full text-lg font-black tracking-widest shadow-xl"
                        >
                            {currentPath.map(i => grid[i]).join('').toUpperCase()}
                        </motion.div>
                    )}
                </AnimatePresence>
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
            </div>

            {/* Final Results Modal */}
            <AnimatePresence>
                {showResults && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-[3rem] p-8 max-w-sm w-full relative"
                        >
                            <button onClick={() => setShowResults(false)} className="absolute top-6 right-6 p-2 bg-gray-50 rounded-full">
                                <X size={20} />
                            </button>

                            <div className="text-center mb-6">
                                <Crown size={48} className="text-yellow-500 mx-auto mb-2" />
                                <h2 className="text-2xl font-black">Round Complete!</h2>
                                <p className="text-indigo-600 text-4xl font-black my-4">{score}</p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Room Standings</h3>
                                <div className="space-y-2">
                                    {(isMultiplayer ? roomPlayers : [{ name: playerName || 'You', score }]).sort((a, b) => b.score - a.score).map((p, i) => (
                                        <div key={p.name} className={`flex justify-between items-center p-3 rounded-xl ${p.name === playerName ? 'bg-indigo-50 border border-indigo-100' : 'bg-gray-50 opacity-60'}`}>
                                            <div className="font-bold flex items-center gap-2">
                                                <span className="text-[10px] font-black text-gray-300">#{i + 1}</span>
                                                {p.name}
                                            </div>
                                            <div className="font-black text-indigo-600">{p.score}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button onClick={() => setShowLobby(true)} className="w-full mt-8 bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-100 active:scale-95 transition-transform">
                                Back to Lobby
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showQR && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="bg-white p-8 rounded-[40px] max-w-sm w-full text-center relative"
                        >
                            <button onClick={() => setShowQR(false)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full">
                                <X size={5} className="text-gray-500" />
                            </button>
                            <h3 className="text-xl font-black mb-4 uppercase">Invite Friends</h3>
                            <div className="bg-white p-4 rounded-3xl border-4 border-indigo-50 inline-block mb-6">
                                <QRCodeSVG value={shareUrl} size={150} includeMargin={true} />
                            </div>
                            <button
                                onClick={() => { navigator.clipboard.writeText(shareUrl); alert('Link Copied!'); }}
                                className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl"
                            >
                                Copy Room Link
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BoggleGame;
