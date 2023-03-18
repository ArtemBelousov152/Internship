"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class BaseAgent {
    constructor(_baseUrl) {
        this._baseUrl = _baseUrl;
        this.fetch = (url, config) => __awaiter(this, void 0, void 0, function* () {
            const finalUrl = `${this._baseUrl}${url}`;
            const res = yield fetch(finalUrl, config);
            if (!res.ok) {
                throw new Error(`Coult not fetch ${finalUrl}, status ${res.status}`);
            }
            const data = (yield res.json());
            return data;
        });
    }
}
class FormatString {
    constructor() {
        this.setParams = (object) => {
            if (object) {
                const paramsArray = [];
                let key;
                for (key in object) {
                    paramsArray.push(`${key}=${object[key]}`);
                }
                return `?${paramsArray.join('&')}`;
            }
            return '';
        };
    }
}
class TasksAgent extends BaseAgent {
    constructor() {
        super('https://intership-liga.ru');
        this.formatter = new FormatString();
        this.getTasks = (params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield this.fetch(`/tasks${this.formatter.setParams(params)}`);
                console.log('Все задачи получены', tasks);
                return tasks;
            }
            catch (error) {
                console.log(error.message);
                return null;
            }
        });
        this.getTasksById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.fetch(`/tasks/${id}`);
                console.log(`Получена задача по id: ${id}`, task);
                return task;
            }
            catch (error) {
                console.log(error.message);
                return null;
            }
        });
        this.postTask = (task) => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.fetch(`/tasks`, {
                    method: 'POST',
                    body: JSON.stringify(task),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log(`Задача отправлена`, res);
                return res;
            }
            catch (error) {
                console.log(error.message);
                return null;
            }
        });
        this.patchTask = (id, task) => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.fetch(`/tasks/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(task),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log(`Задача изменена`, res);
                return res;
            }
            catch (error) {
                console.log(error.message);
                return null;
            }
        });
        this.deleteTask = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.fetch(`/tasks/${id}`, {
                    method: 'DELETE',
                });
                console.log(`Задача по id:${id} удалена`, res);
                return res;
            }
            catch (error) {
                console.log(error.message);
                return null;
            }
        });
    }
}
const taskAgent = new TasksAgent();
taskAgent.getTasks();
taskAgent.getTasksById(999);
taskAgent.postTask({
    info: 'test',
    name: 'test-name',
    isImportant: true,
});
taskAgent.patchTask(999, { info: 'test2' });
taskAgent.deleteTask(700);
//# sourceMappingURL=index.js.map