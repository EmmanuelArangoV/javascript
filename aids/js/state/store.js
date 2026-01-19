export const store = {
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],

    set(newTasks) {
        this.tasks = newTasks;
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    }
};

export const user = {
    info: JSON.parse(localStorage.getItem('user'))  || [],

    set(newUserInfo) {
        this.info = newUserInfo;
        localStorage.setItem('user', JSON.stringify(newUserInfo));
    }
}