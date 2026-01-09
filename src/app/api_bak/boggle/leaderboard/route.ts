import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import BoggleRoom from '@/models/BoggleRoom';

export async function GET() {
    try {
        await dbConnect();
        // Aggregating all-time high scores from all finished rooms
        const rooms = await BoggleRoom.find({ status: 'finished' });
        let allScores: { name: string, score: number, date: Date }[] = [];

        rooms.forEach(room => {
            room.players.forEach((player: any) => {
                allScores.push({
                    name: player.name,
                    score: player.score,
                    date: room.createdAt
                });
            });
        });

        // Filter for unique names with highest scores
        const uniqueScores = Array.from(
            allScores.reduce((acc, current) => {
                const existing = acc.get(current.name);
                if (!existing || existing.score < current.score) {
                    acc.set(current.name, current);
                }
                return acc;
            }, new Map())
        )
            .map(([_, val]) => val)
            .sort((a, b) => b.score - a.score)
            .slice(0, 20);

        return NextResponse.json(uniqueScores);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
