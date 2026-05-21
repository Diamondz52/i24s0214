export class CrosswordGrid {
  constructor(rows = 10, cols = 10) {
    this.rows = rows;
    this.cols = cols;
    this.grid = Array(rows).fill().map(() => Array(cols).fill(null));
    this.placedWords = [];
  }

  canPlaceWord(word, row, col, direction) {
    const wordLen = word.length;
    for (let i = 0; i < wordLen; i++) {
      let r = row, c = col;
      if (direction === 'horizontal') {
        c = col + i;
      } else {
        r = row + i;
      }
      if (r >= this.rows || c >= this.cols) return false;
      const existingCell = this.grid[r][c];
      const expectedLetter = word[i];
      if (existingCell !== null && existingCell.letter !== expectedLetter) {
        return false;
      }
    }
    return true;
  }

  placeWord(word, description, row, col, direction) {
    if (!this.canPlaceWord(word, row, col, direction)) return false;
    
    const wordLen = word.length;
    const placedWord = { 
      word, description, row, col, direction, letters: [] 
    };
    
    for (let i = 0; i < wordLen; i++) {
      let r = row, c = col;
      if (direction === 'horizontal') {
        c = col + i;
      } else {
        r = row + i;
      }
      if (this.grid[r][c] === null) {
        this.grid[r][c] = { letter: word[i], wordId: placedWord, position: i };
      }
      placedWord.letters.push({ row: r, col: c });
    }
    this.placedWords.push(placedWord);
    return true;
  }

  removeWord(word) {
    const wordObj = this.placedWords.find(w => w.word === word);
    if (!wordObj) return;
    
    wordObj.letters.forEach(({ row, col }) => {
      const otherWordUses = this.placedWords.some(w => 
        w !== wordObj && w.letters.some(l => l.row === row && l.col === col)
      );
      if (!otherWordUses) {
        this.grid[row][col] = null;
      }
    });
    this.placedWords = this.placedWords.filter(w => w.word !== word);
  }

  renderToHTML() {
    let html = '<table class="crossword-grid">';
    for (let i = 0; i < this.rows; i++) {
      html += '<tr>';
      for (let j = 0; j < this.cols; j++) {
        const cell = this.grid[i][j];
        let cellClass = 'grid-cell';
        if (cell) {
          cellClass += ' filled';
        } else {
          cellClass += ' empty';
        }
        const content = cell ? cell.letter : '';
        html += `<td class="${cellClass}" data-row="${i}" data-col="${j}">${content}</td>`;
      }
      html += '</tr>';
    }
    html += '</table>';
    return html;
  }
}