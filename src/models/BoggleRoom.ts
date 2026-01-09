import mongoose, { Schema, Document } from 'mongoose';

export interface IBogglePlayer {
    name: string;
    score: number;
    foundWords: string[];
    lastActive: Date;
}

export interface IBoggleRoom extends Document {
    roomCode: string;
    board: string[];
    players: IBogglePlayer[];
    status: 'waiting' | 'active' | 'finished';
    startTime?: Date;
    duration: number; // in seconds
    createdAt: Date;
}

const BogglePlayerSchema = new Schema<IBogglePlayer>({
    name: { type: String, required: true },
    score: { type: Number, default: 0 },
    foundWords: { type: [String], default: [] },
    lastActive: { type: Date, default: Date.now }
});

const BoggleRoomSchema = new Schema<IBoggleRoom>({
    roomCode: { type: String, required: true, unique: true },
    board: { type: [String], required: true },
    players: { type: [BogglePlayerSchema], default: [] },
    status: { type: String, enum: ['waiting', 'active', 'finished'], default: 'waiting' },
    startTime: { type: Date },
    duration: { type: Number, default: 120 },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.BoggleRoom || mongoose.model<IBoggleRoom>('BoggleRoom', BoggleRoomSchema);
