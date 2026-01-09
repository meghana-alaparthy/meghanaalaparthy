import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import dbConnect from '@/lib/db';
import BoggleRoom from '@/models/BoggleRoom';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { roomCode, playerName, score, foundWords } = await request.json();

        if (!roomCode || !playerName) {
            return NextResponse.json({ error: 'Missing Required Fields' }, { status: 400 });
        }

        const room = await BoggleRoom.findOne({ roomCode });
        if (!room) {
            return NextResponse.json({ error: 'Room Not Found' }, { status: 404 });
        }

        // Find player or add new
        const playerIndex = room.players.findIndex((p: any) => p.name === playerName);

        if (playerIndex > -1) {
            // Update existing player
            room.players[playerIndex].score = score;
            room.players[playerIndex].foundWords = foundWords;
            room.players[playerIndex].lastActive = new Date();
        } else {
            // Add new player
            room.players.push({
                name: playerName,
                score: score || 0,
                foundWords: foundWords || [],
                lastActive: new Date()
            });
        }

        await room.save();
        return NextResponse.json(room);
    } catch (error) {
        console.error('Player Sync Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
