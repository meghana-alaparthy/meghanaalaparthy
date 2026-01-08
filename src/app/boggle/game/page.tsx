import BoggleGame from '@/components/boggle/BoggleGame';

export const metadata = {
    title: 'Play Boggle - Interactive Word Game',
    description: 'Play a classic game of Boggle. Find as many words as you can in the grid before time runs out!',
};

export default function BoggleGamePage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <BoggleGame />
        </div>
    );
}
