import BoggleGame from '@/components/boggle/BoggleGame';
import { motion } from 'framer-motion';
import { Gamepad2, Info } from 'lucide-react';

export const metadata = {
    title: 'Boggle Multiplayer | Meghana Alaparthy',
    description: 'A high-performance Boggle implementation with real-time multiplayer rooms and global leaderboards.',
};

export default function BoggleGamePage() {
    return (
        <main className="min-h-screen bg-[#F8FAFC] pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto mb-12 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">
                    <Gamepad2 size={14} /> Arcades & Labs
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                    Multiplayer Boggle
                </h1>
                <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
                    A real-time distributed word game. Create a room, share the link, and compete with friends in live sessions.
                </p>

                <div className="mt-6 flex items-center justify-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> MongoDB Backend
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Real-time Sync
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Swipe-to-Select
                    </div>
                </div>
            </div>

            <BoggleGame />

            <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 mb-3 lowercase">
                    <Info size={16} className="text-indigo-600" /> How to play
                </h3>
                <ul className="space-y-3 text-sm text-slate-500 leading-relaxed">
                    <li className="flex gap-2">
                        <span className="text-indigo-600 font-black">•</span>
                        <span>Drag your finger or mouse over adjacent letters (horizontally, vertically, or diagonally) to form words.</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-indigo-600 font-black">•</span>
                        <span>Words must be at least 3 letters long.</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-indigo-600 font-black">•</span>
                        <span>Create a **Room** to sync your progress with friends in real-time. Highest score wins!</span>
                    </li>
                </ul>
            </div>
        </main>
    );
}
