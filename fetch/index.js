
const BASE_URL = 'https://intership-liga.ru';


// Параменты url адреса передаются в виде объекта либо пустой объект
async function getTasks({ isImportant, name_like, isCompleted }) {

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

    try {
        const res = await fetch(`${BASE_URL}/tasks${setParams()}`);

        if (!res.ok) {
            throw new Error(`Coult not fetch ${BASE_URL}, status ${res.status}`);
        }

        console.log(await res.json());

    } catch (e) {
        console.log(e);
    }

}

async function postTasks(isImportant, name, info) {

    const task = {
        name,
        info,
        isImportant
    };

    try {
        const res = await fetch(`${BASE_URL}/tasks`, {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) {
            throw new Error(`Coult not fetch ${BASE_URL}, status ${res.status}`);
        }

        console.log(await res.json());

    } catch (e) {
        console.log(e);
    }

}

async function getTasksById(id) {

    try {
        const res = await fetch(`${BASE_URL}/tasks/${id}`);

        if (!res.ok) {
            throw new Error(`Coult not fetch ${BASE_URL}, status ${res.status}`);
        }

        console.log(await res.json());

    } catch (e) {
        console.log(e);
    }

}
// задача передаётся в виде объекта
async function patchTasksById(id, { isImportant, name, info, isCompleted }) {

    const task = {
        name,
        info,
        isImportant,
        isCompleted
    };

    try {
        const res = await fetch(`${BASE_URL}/tasks/${id}`, {
            method: "PATCH",
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) {
            throw new Error(`Coult not fetch ${BASE_URL}, status ${res.status}`);
        }

        console.log(await res.json());

    } catch (e) {
        console.log(e);
    }

}

async function deleteTasksById(id) {

    try {
        const res = await fetch(`${BASE_URL}/tasks/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            throw new Error(`Coult not fetch ${BASE_URL}, status ${res.status}`);
        }

        console.log(await res.json());

    } catch (e) {
        console.log(e);
    }

}

// postTasks(false, 'test-task-name123', 'some info lorem')
// getTasks({});
// deleteTasksById(23);
// getTasksById(23);
// patchTasksById(23, {
//     name: 'some-nam123e123',
//     isCompleted: true,
//     info: 'hello'
// });
