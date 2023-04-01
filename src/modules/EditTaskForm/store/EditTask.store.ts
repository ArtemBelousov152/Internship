import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { delay } from 'helpers/delay';

class EditTaskStore {
  constructor() {
    makeObservable(this, {
      loadTask: computed,
    });
  }

  loadTask() {}
}
