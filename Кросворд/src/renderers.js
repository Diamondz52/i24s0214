export const renderWordList = (wordlist) => {
  const words = wordlist.getWords();
  const currentWord = wordlist.getCurrentWord();
  
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
};

export const renderAddForm = (currentWord) => {
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
};