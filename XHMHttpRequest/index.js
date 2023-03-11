const BASE_URL = 'https://intership-liga.ru';

const getTasks = ({ isImportant, name_like, isCompleted }) => new Promise((resolve, reject) => {

    const paramsArray = [];

    if (isImportant !== undefined) {
        paramsArray.push(`isImportant=${isImportant}`);
    }

    if (name_like !== undefined) {
        paramsArray.push(`name_like=${name_like}`);
    }

    if (isCompleted !== undefined) {
        paramsArray.push(`isCompleted=${isCompleted}`);
    }

    function setParams() {
        if (paramsArray.length < 1) {
            return '';
        }

        return `?${paramsArray.join('&')}`
    }

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `${BASE_URL}/tasks${setParams()}`, true);

    xhr.onload = () => resolve(xhr.response);
    xhr.onerror = () => reject(xhr.status);

    xhr.send();
})

const postTasks = (isImportant, name, info) => new Promise((resolve, reject) => {

    const task = {
        name,
        info,
        isImportant
    };

    const xhr = new XMLHttpRequest();

    xhr.open('POST', `${BASE_URL}/tasks`, true);

    xhr.setRequestHeader('Content-type', 'application/json')

    xhr.onload = () => resolve(xhr.response);
    xhr.onerror = () => reject(xhr.status);

    xhr.send(JSON.stringify(task));
})

const getTasksById = (id) => new Promise((resolve, reject) => {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `${BASE_URL}/tasks/${id}`, true);

    xhr.onload = () => resolve(xhr.response);
    xhr.onerror = () => reject(xhr.status);

    xhr.send();
})

const patchTasksById = (id, { isImportant, name, info, isCompleted }) => new Promise((resolve, reject) => {

    const task = {
        name,
        info,
        isImportant,
        isCompleted
    };

    const xhr = new XMLHttpRequest();

    xhr.open('PATCH', `${BASE_URL}/tasks/${id}`, true);

    xhr.setRequestHeader('Content-type', 'application/json')

    xhr.onload = () => resolve(xhr.response);
    xhr.onerror = () => reject(xhr.status);

    xhr.send(JSON.stringify(task));
})

const deleteTasksById = (id) => new Promise((resolve, reject) => {

    const xhr = new XMLHttpRequest();

    xhr.open('DELETE', `${BASE_URL}/tasks/${id}`, true);

    xhr.onload = () => resolve(xhr.response);
    xhr.onerror = () => reject(xhr.status);

    xhr.send();
})

getTasks({})
    .then(data => console.log(data))
    .catch(error => console.warn(error));

// postTasks(false, 'hello', 'some-text')
//     .then(data => console.log(data))
//     .catch(error => console.warn(error));

// getTasksById(23)
//     .then(data => console.log(data))
//     .catch(error => console.warn(error))

// patchTasksById(23, {info: 'lorem ipsum'})
//     .then(data => console.log(data))
//     .catch(error => console.warn(error))

// deleteTasksById(22)
//     .then(data => console.log(data))
//     .catch(error => console.warn(error))