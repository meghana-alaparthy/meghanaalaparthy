import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import dbConnect from '@/lib/db';
import BoggleRoom from '@/models/BoggleRoom';

const DICE = [
    "AAEEGN", "ELTTY", "AOOTTW", "ABBJOO", "EHRTVW", "CIMOTU",
    "DISTTY", "EIOSST", "DELRVY", "ACHOPS", "HIMNQU", "EEINSU",
    "EEGHNW", "AFFKPS", "HLNNRZ", "DEILRX"
];

const generateRandomGrid = () => {
    const shuffledDice = [...DICE].sort(() => Math.random() - 0.5);
    return shuffledDice.map(die => die.charAt(Math.floor(Math.random() * die.length)));
};

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { roomCode } = await request.json();

        // Check if room already exists
        const existing = await BoggleRoom.findOne({ roomCode });
        if (existing) {
            return NextResponse.json({ error: 'Room already exists' }, { status: 400 });
        }

        const newRoom = await BoggleRoom.create({
            roomCode,
            board: generateRandomGrid(),
            status: 'active' // Auto-start for now or wait for first player
        });

        return NextResponse.json(newRoom);
    } catch (error) {
        console.error('Room Creation Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const roomCode = searchParams.get('roomCode');

    if (!roomCode) {
        return NextResponse.json({ error: 'Room Code Required' }, { status: 400 });
    }

    try {
        await dbConnect();
        const room = await BoggleRoom.findOne({ roomCode });
        if (!room) {
            return NextResponse.json({ error: 'Room Not Found' }, { status: 404 });
        }
        return NextResponse.json(room);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
