class TrieNode {
    children: { [key: string]: TrieNode } = {};
    isEndOfWord: boolean = false;
}

export class BoggleSolver {
    private root: TrieNode = new TrieNode();
    isLoaded: boolean = false;

    async loadDictionary(dictionaryUrl: string = '/boggle/assets/dictionary.txt') {
        try {
            const response = await fetch(dictionaryUrl);
            const text = await response.text();
            const words = text.split('\n');

            for (let word of words) {
                word = word.trim().toLowerCase();
                if (word.length >= 3) {
                    this.insertWord(word);
                }
            }
            this.isLoaded = true;
            console.log("Dictionary loaded");
        } catch (error) {
            console.error("Failed to load dictionary", error);
        }
    }

    private insertWord(word: string) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    getScore(word: string): number {
        const len = word.length;
        if (len < 3) return 0;
        if (len <= 4) return 1;
        if (len === 5) return 2;
        if (len === 6) return 3;
        if (len === 7) return 5;
        return 11;
    }

    solve(grid: string[]): { word: string; score: number }[] {
        if (!this.isLoaded) return [];

        const size = Math.sqrt(grid.length);
        const foundWords = new Set<string>();
        const visited = Array(size).fill(null).map(() => Array(size).fill(false));

        const board: string[][] = [];
        for (let i = 0; i < size; i++) {
            board.push(grid.slice(i * size, (i + 1) * size));
        }

        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                this._dfs(r, c, board, visited, "", this.root, foundWords, size);
            }
        }

        const results = Array.from(foundWords).map(word => ({
            word: word,
            score: this.getScore(word)
        }));

        return results.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            if (b.word.length !== a.word.length) return b.word.length - a.word.length;
            return a.word.localeCompare(b.word);
        });
    }

    private _dfs(r: number, c: number, grid: string[][], visited: boolean[][], currentWord: string, currentNode: TrieNode, foundWords: Set<string>, size: number) {
        if (visited[r][c]) return;

        const char = grid[r][c];
        if (!currentNode.children[char]) return;

        const nextNode = currentNode.children[char];
        const newWord = currentWord + char;

        if (nextNode.isEndOfWord) {
            foundWords.add(newWord);
        }

        visited[r][c] = true;

        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        for (let [dr, dc] of directions) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
                this._dfs(nr, nc, grid, visited, newWord, nextNode, foundWords, size);
            }
        }

        visited[r][c] = false;
    }
}
