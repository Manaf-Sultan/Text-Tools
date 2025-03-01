// Reverse Mapping (A ↔ Z, B ↔ Y, etc.)
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const reverseAlphabet = alphabet.split('').reverse().join('');

function reverseText(text) {
    return text.replace(/[A-Za-z]/g, char => {
        const isUpperCase = char === char.toUpperCase();
        const index = alphabet.indexOf(char.toUpperCase());
        const reversedChar = reverseAlphabet[index];
        return isUpperCase ? reversedChar : reversedChar.toLowerCase();
    });
}

// Check if text is already reversed
function isReversed(text) {
    const reversedText = reverseText(text);
    return reversedText === text;
}

// Reverse/Restore Button
document.getElementById('reverse-btn').addEventListener('click', () => {
    const inputText = document.getElementById('input-text').value.trim();
    if (!inputText) {
        alert('Please enter some text!');
        return;
    }

    const outputText = reverseText(inputText);
    document.getElementById('output-text').textContent = outputText;
});

// Copy Button
document.getElementById('copy-btn').addEventListener('click', () => {
    const outputText = document.getElementById('output-text').textContent;
    if (outputText) {
        navigator.clipboard.writeText(outputText).then(() => {
            alert('Output copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    } else {
        alert('No output to copy!');
    }
});

// Anagram Solver
document.getElementById('solve-anagram-btn').addEventListener('click', () => {
    const input = document.getElementById('anagram-input').value.trim().toLowerCase();
    if (!input) {
        alert('Please enter a word or phrase!');
        return;
    }

    const sortedInput = input.split('').sort().join('');
    const anagrams = generateAnagrams(sortedInput);
    document.getElementById('anagram-result').textContent = Array.from(new Set(anagrams)).join('\n');
});

function generateAnagrams(input) {
    if (input.length <= 1) return [input];
    const results = [];
    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        const remainingChars = input.slice(0, i) + input.slice(i + 1);
        const innerAnagrams = generateAnagrams(remainingChars);
        for (const anagram of innerAnagrams) {
            results.push(char + anagram);
        }
    }
    return results;
}

// Color Palette Generator
document.getElementById('generate-palette-btn').addEventListener('click', () => {
    const inputText = document.getElementById('palette-input').value.trim();
    if (!inputText) {
        alert('Please enter some text!');
        return;
    }

    const colors = generateColorsFromText(inputText);
    const container = document.getElementById('color-palette-container');
    container.innerHTML = ''; // Clear previous colors

    colors.forEach(color => {
        const div = document.createElement('div');
        div.className = 'color-box';
        div.style.backgroundColor = color;
        container.appendChild(div);
    });
});

function generateColorsFromText(text) {
    const colors = [];
    for (let i = 0; i < text.length; i += 3) {
        const r = text.charCodeAt(i % text.length) % 256;
        const g = text.charCodeAt((i + 1) % text.length) % 256;
        const b = text.charCodeAt((i + 2) % text.length) % 256;
        colors.push(`rgb(${r}, ${g}, ${b})`);
    }
    return colors;
}

// Sentence Complexity Analyzer
document.getElementById('analyze-complexity-btn').addEventListener('click', () => {
    const inputText = document.getElementById('complexity-input').value.trim();
    if (!inputText) {
        alert('Please enter a sentence!');
        return;
    }

    const metrics = analyzeSentenceComplexity(inputText);
    document.getElementById('complexity-result').textContent = `Word Count: ${metrics.wordCount}\nSyllable Count: ${metrics.syllableCount}\nReadability Score: ${metrics.readabilityScore}`;
});

function analyzeSentenceComplexity(text) {
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const syllableCount = words.reduce((total, word) => total + countSyllables(word), 0);
    const wordCount = words.length;
    const readabilityScore = Math.round(206.835 - (1.015 * (wordCount / 1)) - (84.6 * (syllableCount / wordCount)));
    return { wordCount, syllableCount, readabilityScore };
}

function countSyllables(word) {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    return (word.match(/[aeiouy]{1,2}/g) || []).length;
}

// Dark Theme Toggle
document.getElementById('theme-toggle').addEventListener('change', () => {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
});
