// Задача 1

function sum(num) {
    return function (num2) {
        return function (num3) {
            return num + num2 + num3;
        }
    }
}

console.log(sum(2)(3)(5));

// Задача 2 

const arr = []
const arrLength = 100000;

for (let i = 0; i < arrLength; i++) {
    arr.push(Math.floor(Math.random() * arrLength));
}

function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const anchorIndex = Math.floor(array.length / 2);
    const anchorElem = array[anchorIndex];

    const less = [];
    const more = [];
    const repeat = [];

    array.forEach((item, index) => {
        if (index === anchorIndex) {
            return;
        }

        if (item < anchorElem) {
            less.push(item);

            return;
        }

        if (item > anchorElem) {
            more.push(item);

            return;
        }

        if (item === anchorElem) {
            repeat.push(item);

            return;
        }
    });

    return [
        ...quickSort(less),
        ...repeat,
        anchorElem,
        ...quickSort(more)
    ];
}

console.log(quickSort(arr));

// Задача 3

function queue() {
    setTimeout(() => {
        Promise.resolve.then(() => console.log('hello'));
        document.querySelector('.some-class').style.color = 'red';
    }, 0);

    setTimeout(() => {
        Promise.resolve.then(() => console.log('hello2'));
        Promise.resolve.then(() => console.log('hello3'));
    }, 0);

    setTimeout(() => {
        Promise.resolve.then(() => console.log('hello4'));
        document.querySelector('.some-class').textContent = 'hello5';
    }, 0);
}

// function queue() {
//     document.querySelector('.some-btn').addEventListener(() => {
//         fetch('https://jsonplaceholder.typicode.com/posts/1')
//             .then(response => response.json())
//             .then(json => document.querySelector('.some-class').textContent = json.title);
//     })

//     setTimeout(() => {
//         fetch('https://jsonplaceholder.typicode.com/posts/1')
//             .then(response => response.json())
//             .then(json => console.log(json + `2`));
//     }, 0);

//     setTimeout(() => {
//         fetch('https://jsonplaceholder.typicode.com/posts/1')
//             .then(response => response.json())
//             .then(json => document.querySelector('.some-class').textContent = json.body);
//     }, 0);
// }

queue();