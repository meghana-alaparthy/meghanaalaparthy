class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        this.isEndOfWord = true;
    }
}

class BoggleSolver {
    constructor() {
        this.root = new TrieNode();
        this.isLoaded = false;
    }

    async loadDictionary() {
        try {
            const response = await fetch('../assets/dictionary.txt');
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
            alert("Error loading dictionary. Check console.");
        }
    }

    insertWord(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    getScore(word) {
        const len = word.length;
        if (len < 3) return 0;
        if (len <= 4) return 1;
        if (len === 5) return 2;
        if (len === 6) return 3;
        if (len === 7) return 5;
        return 11;
    }

    solve(grid) {
        if (!this.isLoaded) return [];

        const size = Math.sqrt(grid.length);
        const foundWords = new Set();
        const visited = Array(size).fill().map(() => Array(size).fill(false));

        // Create 2D grid
        const board = [];
        for (let i = 0; i < size; i++) {
            board.push(grid.slice(i * size, (i + 1) * size));
        }

        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                this._dfs(r, c, board, visited, "", this.root, foundWords, size);
            }
        }

        // Convert to array and score
        const results = Array.from(foundWords).map(word => ({
            word: word,
            score: this.getScore(word)
        }));

        // Sort: Score desc, Length desc, Alpha asc
        return results.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            if (b.word.length !== a.word.length) return b.word.length - a.word.length;
            return a.word.localeCompare(b.word);
        });
    }

    _dfs(r, c, grid, visited, currentWord, currentNode, foundWords, size) {
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

// UI Logic
const solver = new BoggleSolver();
let currentSize = 4;
let score = 0;
let foundWordsSet = new Set();
let timerInterval;
let gameActive = false;
let timeRemaining = 120; // 2 minutes

const gridContainer = document.getElementById('grid-container');
const newGameBtn = document.getElementById('new-game-btn');
const shareBtn = document.getElementById('share-btn');
const wordInput = document.getElementById('word-input');
const submitBtn = document.getElementById('submit-word-btn');
const scoreDisplay = document.getElementById('current-score');
const timerDisplay = document.getElementById('time-remaining');
const foundWordsList = document.getElementById('found-words');
const resultsArea = document.getElementById('results-area');
const finalScoreDisplay = document.getElementById('final-score');
const missedWordsList = document.getElementById('missed-words-list');
const viewMissedBtn = document.getElementById('view-missed-btn');
const loadingOverlay = document.getElementById('loading-overlay');

// Initialize
(async function init() {
    loadingOverlay.classList.remove('hidden');
    await solver.loadDictionary();
    loadingOverlay.classList.add('hidden');

    // Check URL for board
    const urlParams = new URLSearchParams(window.location.search);
    const sharedBoard = urlParams.get('board');
    if (sharedBoard && sharedBoard.length === 16) {
        generateGrid(4, sharedBoard);
    } else {
        generateGrid(4);
    }
})();

function generateGrid(size, presetChars = null) {
    currentSize = size;
    gridContainer.innerHTML = '';
    gridContainer.className = `grid-${size}`;

    // Dice distribution for classic Boggle
    const dice = [
        "AAEEGN", "ELTTY", "AOOTTW", "ABBJOO", "EHRTVW", "CIMOTU",
        "DISTTY", "EIOSST", "DELRVY", "ACHOPS", "HIMNQU", "EEINSU",
        "EEGHNW", "AFFKPS", "HLNNRZ", "DEILRX"
    ];

    let chars = [];
    if (presetChars) {
        chars = presetChars.split('');
    } else {
        // Shuffle dice
        for (let i = dice.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [dice[i], dice[j]] = [dice[j], dice[i]];
        }
        // Roll dice
        chars = dice.map(die => die.charAt(Math.floor(Math.random() * die.length)));
    }

    for (let i = 0; i < size * size; i++) {
        const div = document.createElement('div');
        div.className = 'cell-display';
        div.textContent = chars[i];
        div.dataset.index = i;
        gridContainer.appendChild(div);
    }
}

function startGame() {
    if (gameActive) return;

    score = 0;
    scoreDisplay.textContent = score;
    foundWordsSet.clear();
    foundWordsList.innerHTML = '';
    resultsArea.classList.add('hidden');
    wordInput.value = '';
    wordInput.disabled = false;
    submitBtn.disabled = false;
    gameActive = true;
    timeRemaining = 120;

    if (!newGameBtn.dataset.keepBoard) {
        generateGrid(4);
    }
    newGameBtn.dataset.keepBoard = ""; // Reset
    newGameBtn.textContent = "Restart";

    updateTimer();
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimer();
        if (timeRemaining <= 0) {
            endGame();
        }
    }, 1000);

    wordInput.focus();
}

function updateTimer() {
    const m = Math.floor(timeRemaining / 60);
    const s = timeRemaining % 60;
    timerDisplay.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;

    if (timeRemaining < 10) {
        timerDisplay.parentElement.style.color = 'red';
    } else {
        timerDisplay.parentElement.style.color = 'inherit';
    }
}

function endGame() {
    clearInterval(timerInterval);
    gameActive = false;
    wordInput.disabled = true;
    submitBtn.disabled = true;
    newGameBtn.textContent = "New Game";

    resultsArea.classList.remove('hidden');
    finalScoreDisplay.textContent = score;

    // Find all possible words
    const grid = getGridValues();
    const allWords = solver.solve(grid);
    missedWordsList.innerHTML = '';

    if (allWords.length > 0) {
        const list = document.createElement('ul');
        allWords.forEach(res => {
            if (!foundWordsSet.has(res.word)) {
                const li = document.createElement('li');
                li.textContent = `${res.word} (${res.score})`;
                list.appendChild(li);
            }
        });
        missedWordsList.appendChild(list);
    }
}

function getGridValues() {
    const cells = document.querySelectorAll('.cell-display');
    return Array.from(cells).map(c => c.textContent.toLowerCase());
}

function checkWord() {
    if (!gameActive) return;

    const word = wordInput.value.trim().toLowerCase();
    wordInput.value = '';
    wordInput.focus();

    if (word.length < 3) return;
    if (foundWordsSet.has(word)) return; // Already found

    // Use solver to validate logic availability
    // Note: In a real game, we'd check if path exists on board. 
    // The solver.solve structure finds ALL words. We can optimize by checking `trie` and `dfs` just for this word, 
    // but reusing `solve` is easier for valid dictionary + valid path check.
    // Optimization: Run solve ONCE at start? No, board changes.
    // For individual checking, we'd need a specific `isValid(word, grid)` function.
    // Let's implement a quick path finder or just run solve (might be slow if spamming?). 
    // Boggle grids are small, solve is instant (<50ms).

    const grid = getGridValues();
    const allWords = solver.solve(grid);
    const match = allWords.find(w => w.word === word);

    if (match) {
        foundWordsSet.add(word);
        score += match.score;
        scoreDisplay.textContent = score;

        const span = document.createElement('span');
        span.className = 'found-word';
        span.textContent = word;
        foundWordsList.prepend(span); // Add to top
    } else {
        // Shake animation for wrong word?
        wordInput.classList.add('error');
        setTimeout(() => wordInput.classList.remove('error'), 300);
    }
}

newGameBtn.addEventListener('click', startGame);

submitBtn.addEventListener('click', checkWord);
wordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkWord();
});

shareBtn.addEventListener('click', () => {
    const grid = getGridValues();
    const boardString = grid.join('').toUpperCase();
    const url = `${window.location.origin}${window.location.pathname}?board=${boardString}`;

    navigator.clipboard.writeText(url).then(() => {
        const originalText = shareBtn.textContent;
        shareBtn.textContent = "Copied! Share Link";
        setTimeout(() => shareBtn.textContent = originalText, 2000);
    });
});

viewMissedBtn.addEventListener('click', () => {
    missedWordsList.classList.toggle('hidden');
});
