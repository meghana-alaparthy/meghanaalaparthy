import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

let dictionary: Set<string> | null = null;

function loadDictionary() {
    if (dictionary) return dictionary;

    const filePath = path.join(process.cwd(), 'src/lib/boggle/dictionary.txt');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        dictionary = new Set(data.split('\n').map(w => w.trim().toLowerCase()).filter(w => w.length >= 3));
        return dictionary;
    } catch (err) {
        console.error('Dictionary Load Error:', err);
        return new Set();
    }
}

export async function POST(request: Request) {
    try {
        const { word } = await request.json();
        const dict = loadDictionary();

        if (!word || typeof word !== 'string') {
            return NextResponse.json({ error: 'Word Required' }, { status: 400 });
        }

        const isValid = dict.has(word.toLowerCase());
        return NextResponse.json({ isValid });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
