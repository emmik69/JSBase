function generatorArray(count, n, m) {
  let array = [];
  let start = 0;
  for (start; start < count; start++) {
    array.push(Math.round(Math.random() * Math.abs(n - m)) + Math.min(n, m));
  }
  console.log(array);
}

function shuffleArray(count) {
  let array = [];
  for (let i = 1; i <= count; i++) {
    array.push(i);
  }
  let firstArr = array.slice();

  for (let index in array) {
    let rnd = Math.round(Math.random() * (array.length - 1));
    [array[index], array[Math.round(rnd)]] = [
      array[Math.round(rnd)],
      array[index],
    ];
  }
  console.log(firstArr, '--->', array);
  return array;
}

function searchElement(array, element) {
  let index = array.indexOf(element);
  console.log(index >= 0 ? `Индекс элемента: ${index}` : 'Элемент не найден');
}

function combiningArrays(firstArray, secondArray) {
  let newArray = [...firstArray, ...secondArray];
  console.log(newArray);
}

// проверка задания 1
generatorArray(100, 2, 100);
generatorArray(50, 2, 5);
generatorArray(70, 100, -5);
generatorArray(42, -3, -10);

// проверка задания 2
let firstArray = shuffleArray(10);
let secondArray = shuffleArray(5);
let thirdArray = shuffleArray(7);
let fourthArray = shuffleArray(3);

// проверка задания 3
searchElement(firstArray, 3);
searchElement(secondArray, 1);
searchElement(thirdArray, 7);
searchElement(fourthArray, 10);

// проверка задания 4
combiningArrays([2, 2, 17, 21, 45, 12, 54, 31, 53], [12, 44, 23, 5]);
