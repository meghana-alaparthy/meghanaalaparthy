import BoggleSolver from '@/components/boggle/BoggleSolver';

export const metadata = {
    title: 'Boggle Solver - Find All Words Instantly',
    description: 'A powerful Boggle solver for 4x4 and 5x5 grids. Enter your letters and get all possible words and scores in milliseconds.',
};

export default function BoggleSolverPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <BoggleSolver />
        </div>
    );
}
