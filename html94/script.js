document.addEventListener('DOMContentLoaded', function() {
  const paragraphs = document.querySelectorAll('p');

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
          } else {
              highlightLength = getRandomInt(2, 3); // Resalta 2 o 3 letras aleatoriamente
          }
          return highlightLength > 0
              ? `<span class="highlight">${word.substring(0, highlightLength)}</span>${word.substring(highlightLength)}`
              : word;
      });
      paragraph.innerHTML = highlightedWords.join('');
  });
});


function addCopyButtons(clipboard) {
    document.querySelectorAll('pre > code').forEach(function (codeBlock) {
      var button = document.createElement('button');
      button.className = 'copy-code-button';
      button.type = 'button';
      button.innerText = 'Copiar';
      
      button.addEventListener('click', function () {
        // Obtener el texto y mantener la indentación relativa
        var lines = codeBlock.innerText.split('\n');
        var minIndent = lines.reduce((min, line) => {
          if (line.trim().length === 0) return min;
          var indent = line.match(/^\s*/)[0].length;
          return Math.min(min, indent);
        }, Infinity);
  
        var text = lines.map(line => line.substring(minIndent)).join('\n').trim();
  
        clipboard.writeText(text).then(function () {
          button.blur();
          button.innerText = 'Copiado!';
          setTimeout(function () {
            button.innerText = 'Copiar';
          }, 2000);
        }, function (error) {
          button.innerText = 'Error';
        });
      });
  
      var pre = codeBlock.parentNode;
      if (pre.parentNode.classList.contains('highlight')) {
        var highlight = pre.parentNode;
        highlight.insertBefore(button, pre);
      } else {
        pre.insertBefore(button, codeBlock);
      }
    });
  }
  
  // Llamar a la función cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', function() {
    addCopyButtons(navigator.clipboard);
  });