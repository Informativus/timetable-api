export function getTranslatedWord(word: string): string {
  const russianEnglishDictionary = {
    А: 'A',
    Б: 'B',
    В: 'V',
    Г: 'G',
    Д: 'D',
    Е: 'E',
    Ж: 'ZH',
    З: 'Z',
    И: 'I',
    К: 'K',
    Л: 'L',
    М: 'M',
    Н: 'N',
    О: 'O',
    П: 'P',
    Р: 'R',
    С: 'S',
    Т: 'T',
    У: 'U',
    Ф: 'F',
    Х: 'H',
    Ц: 'C',
    Ч: 'CH',
    Ш: 'SH',
    Щ: "SH'",
    Ы: 'Y',
    Э: 'E',
    Ю: 'YU',
    Я: 'YA',
  };

  const translatedWord: string = word
    .split('')
    .map((item) => {
      return russianEnglishDictionary[item] || item;
    })
    .join('');

  return translatedWord;
}
