import './style.css';
import { WordList } from './wordlist.js';
import { CrosswordGrid } from './grid.js';

const wl = new WordList();
let grid = new CrosswordGrid(10, 10);

const root = document.querySelector('#root');
root.innerHTML = `
  <div class="container">
    <header>
      <h1>Crossword Editor</h1>
    </header>
    <div class="main-content">
      <div class="word-list-section">
        <h2>Управление словами</h2>
        <div class="form-container"></div>
        <div class="words-container"></div>
      </div>
      <div class="grid-section">
        <h2>Сетка кроссворда</h2>
        <div class="grid-container"></div>
      </div>
    </div>
  </div>
`;

function renderWordList() {
  const words = wl.getWords();
  const currentWord = wl.getCurrentWord();
  
  if (words.length === 0) {
    return '<div class="empty-message">Нет слов. Добавьте первое слово!</div>';
  }
  
  let html = `
    <table class="word-list">
      <thead>
        <tr>
          <th>Слово</th>
          <th>Описание</th>
          <th>Действие</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const isSelected = currentWord && currentWord.word === word.word;
    const selectedClass = isSelected ? 'selected' : '';
    
    html += `
      <tr class="word-row ${selectedClass}" data-word="${word.word}">
        <td class="word">${word.word}</td>
        <td class="description">${word.description}</td>
        <td class="remove-cell">
          <button class="remove-btn" data-word="${word.word}">×</button>
        </td>
      </tr>
    `;
  }
  
  html += `
      </tbody>
    </table>
  `;
  return html;
}

function renderAddForm() {
  const currentWord = wl.getCurrentWord();
  const isEdit = currentWord !== null;
  const wordValue = isEdit ? currentWord.word : '';
  const descValue = isEdit ? currentWord.description : '';
  const buttonText = isEdit ? 'Update' : 'Save';
  
  return `
    <form class="word-form">
      <input type="text" name="word" placeholder="Слово" value="${wordValue}" required />
      <input type="text" name="description" placeholder="Описание" value="${descValue}" />
      <button type="submit" class="form-btn">${buttonText}</button>
      <button type="button" class="cancel-btn">Отмена</button>
    </form>
  `;
}

function updateUI() {
  const wordsContainer = document.querySelector('.words-container');
  const formContainer = document.querySelector('.form-container');
  const gridContainer = document.querySelector('.grid-container');
  
  if (wordsContainer) {
    wordsContainer.innerHTML = renderWordList();
  }
  if (formContainer) {
    formContainer.innerHTML = renderAddForm();
  }
  if (gridContainer) {
    gridContainer.innerHTML = grid.renderToHTML();
  }
  
  attachEvents();
}

function attachEvents() {
  const wordsContainer = document.querySelector('.words-container');
  if (!wordsContainer) return;
  
  wordsContainer.querySelectorAll('.remove-btn').forEach(btn => {
    btn.removeEventListener('click', handleRemove);
    btn.addEventListener('click', handleRemove);
  });
  
  wordsContainer.querySelectorAll('.word-row').forEach(row => {
    row.removeEventListener('click', handleRowClick);
    row.addEventListener('click', handleRowClick);
  });
  
  const form = document.querySelector('.word-form');
  if (form) {
    form.removeEventListener('submit', handleFormSubmit);
    form.addEventListener('submit', handleFormSubmit);
    
    const cancelBtn = form.querySelector('.cancel-btn');
    if (cancelBtn) {
      cancelBtn.removeEventListener('click', handleCancel);
      cancelBtn.addEventListener('click', handleCancel);
    }
  }
  
  const cells = document.querySelectorAll('.grid-cell.empty');
  cells.forEach(cell => {
    cell.removeEventListener('click', handleCellClick);
    cell.addEventListener('click', handleCellClick);
  });
}

function handleRemove(e) {
  e.stopPropagation();
  const word = e.target.getAttribute('data-word');
  if (word) {
    wl.removeWord(word);
    grid.removeWord(word);
    updateUI();
  }
}

function handleRowClick(e) {
  if (e.target.classList.contains('remove-btn')) return;
  const row = e.target.closest('.word-row');
  if (row) {
    const word = row.querySelector('.word').textContent;
    wl.setCurrentWord(word);
    updateUI();
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const wordInput = form.querySelector('input[name="word"]');
  const descInput = form.querySelector('input[name="description"]');
  const word = wordInput.value.trim();
  const description = descInput.value.trim();
  const buttonText = form.querySelector('.form-btn').textContent;
  
  if (!word) {
    alert('Введите слово');
    return;
  }
  
  if (buttonText === 'Save') {
    if (wl.addWord(word, description)) {
      wordInput.value = '';
      descInput.value = '';
      updateUI();
    } else {
      alert('Слово уже существует');
    }
  } else if (buttonText === 'Update') {
    const currentWord = wl.getCurrentWord();
    if (currentWord && wl.updateWord(currentWord.word, word, description)) {
      const placedWord = grid.placedWords.find(w => w.word === currentWord.word);
      if (placedWord) {
        grid.removeWord(currentWord.word);
        grid.placeWord(word, description, placedWord.row, placedWord.col, placedWord.direction);
      }
      wl.setCurrentWord(null);
      updateUI();
    } else {
      alert('Ошибка при обновлении');
    }
  }
}

function handleCancel() {
  wl.setCurrentWord(null);
  updateUI();
}

function handleCellClick(e) {
  const cell = e.currentTarget;
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);
  
  if (wl.getWords().length === 0) {
    alert('Сначала добавьте слова в список');
    return;
  }
  
  showWordDialog(row, col);
}

function showWordDialog(row, col) {
  const template = document.getElementById('word-selector-dialog');
  if (!template) return;
  
  const oldDialog = document.querySelector('.dialog-overlay');
  if (oldDialog) oldDialog.remove();
  
  document.body.insertAdjacentHTML('beforeend', template.innerHTML);
  const dialog = document.querySelector('.dialog-overlay');
  
  const select = document.getElementById('dialog-word-select');
  const words = wl.getWords();
  select.innerHTML = '<option value="">-- Выберите слово из списка --</option>' +
    words.map(w => `<option value="${w.word}">${w.word} - ${w.description}</option>`).join('');
  
  const horizontalBtn = document.getElementById('orientation-horizontal');
  const verticalBtn = document.getElementById('orientation-vertical');
  const cancelBtn = document.getElementById('dialog-cancel');
  
  const closeDialog = () => dialog.remove();
  
  const placeWord = (direction) => {
    const word = select.value;
    if (!word) {
      alert('Выберите слово');
      return;
    }
    const wordObj = words.find(w => w.word === word);
    if (grid.placeWord(wordObj.word, wordObj.description, row, col, direction)) {
      updateUI();
      closeDialog();
    } else {
      alert('Нельзя разместить слово здесь');
    }
  };
  
  horizontalBtn.addEventListener('click', () => placeWord('horizontal'));
  verticalBtn.addEventListener('click', () => placeWord('vertical'));
  cancelBtn.addEventListener('click', closeDialog);
  dialog.addEventListener('click', (e) => { if (e.target === dialog) closeDialog(); });
}

wl.setCallbacks = function(onChange, onCurrentChange) {
  this.onChange = onChange;
  this.onCurrentChange = onCurrentChange;
};

wl.onChange = null;
wl.onCurrentChange = null;

const originalAddWord = wl.addWord;
const originalRemoveWord = wl.removeWord;
const originalUpdateWord = wl.updateWord;
const originalSetCurrentWord = wl.setCurrentWord;

wl.addWord = function(word, description) {
  const result = originalAddWord.call(this, word, description);
  if (result && this.onChange) this.onChange();
  return result;
};

wl.removeWord = function(word) {
  originalRemoveWord.call(this, word);
  if (this.onChange) this.onChange();
};

wl.updateWord = function(oldWord, newWord, newDescription) {
  const result = originalUpdateWord.call(this, oldWord, newWord, newDescription);
  if (result && this.onChange) this.onChange();
  return result;
};

wl.setCurrentWord = function(word) {
  originalSetCurrentWord.call(this, word);
  if (this.onCurrentChange) this.onCurrentChange();
};

wl.setCallbacks(updateUI, updateUI);

wl.addWord("повар", "такая профессия");
wl.addWord("чай", "вкусный, делает меня человеком");
wl.addWord("яблоки", "с ананасами");
wl.addWord("сосисочки", "я — Никита Литвинков");


updateUI();