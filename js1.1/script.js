document.addEventListener('DOMContentLoaded', function() {
    const paragraphs = document.querySelectorAll('p, blockquote');

    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const shouldHighlight = () => {
        return Math.random() < 0.5; // 50% de probabilidad de resaltar
    };

    paragraphs.forEach(paragraph => {
        const words = paragraph.innerHTML.split(/(\s+)/); // Split by whitespace and keep spaces
        const highlightedWords = words.map(word => {
            // Skip HTML entities and tags
            if (/&[^;]+;/.test(word) || /<[^>]+>/.test(word)) {
                return word;
            }
            let highlightLength;
            if (word.length === 1) {
                highlightLength = shouldHighlight() ? 1 : 0; // Aleatoriamente resaltar o no
            } else if (word.length === 2) {
                highlightLength = 1; // Resalta la primera letra
            } else if (word.length === 3) {
                highlightLength = getRandomInt(1, 2); // Resalta 1 o 2 letras aleatoriamente
            } else if (word.length >= 4 && word.length <= 9) {
                highlightLength = getRandomInt(2, 3); // Resalta 2 o 3 letras aleatoriamente
            } else {
                highlightLength = getRandomInt(4, 6); // Resalta 3 o 5 letras aleatoriamente
            }
            return highlightLength > 0
                ? `<span class="highlight">${word.substring(0, highlightLength)}</span>${word.substring(highlightLength)}`
                : word;
        });
        paragraph.innerHTML = highlightedWords.join('');
    });
});
