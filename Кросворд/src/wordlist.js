import { Word } from './word.js';

export class WordList {
  constructor() {
    this.words = [];
    this.currentWord = null;
  }

  getWords() {
    return this.words;
  }

  addWord(word, description) {
    if (!word || word.trim() === '') {
      return false;
    }
    if (this.words.some(w => w.word === word)) {
      return false;
    }
    this.words.push(new Word(word, description));
    return true;
  }

  removeWord(word) {
    this.words = this.words.filter(w => w.word !== word);
    if (this.currentWord && this.currentWord.word === word) {
      this.currentWord = null;
    }
  }

  updateWord(oldWord, newWord, newDescription) {
    if (!newWord || newWord.trim() === '') {
      return false;
    }
    if (oldWord !== newWord && this.words.some(w => w.word === newWord)) {
      return false;
    }
    const index = this.words.findIndex(w => w.word === oldWord);
    if (index === -1) return false;
    
    this.words[index].word = newWord;
    this.words[index].description = newDescription;
    
    if (this.currentWord && this.currentWord.word === oldWord) {
      this.currentWord = this.words[index];
    }
    return true;
  }

  setCurrentWord(word) {
    this.currentWord = word ? this.words.find(w => w.word === word) : null;
  }

  getCurrentWord() {
    return this.currentWord;
  }
}