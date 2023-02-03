const categories = [
  ['su', 'Success Stories'],
  ['i', 'Innovation'],
  ['o', 'Others'],
  ['a', 'Achievement'],
  ['so', 'Solution'],
  ['p', 'Problem'],
];

export function categoryFromId(id) {
  for (const index in categories) {
    if (categories[index][0] === id) {
      return categories[index][1];
    }
  }

  return '';
}

export default categories;
