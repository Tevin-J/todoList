import axios from "axios";

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/todo-lists/`,
    withCredentials: true,
    headers: {'API-KEY': 'f28b0cf7-313a-42c3-9df8-994bce274198'}
})

export const api = {
    getTodoLists() {
        return (
            instance.get(``)
        )
    },
    createTodoList(title) {
        return (
            instance.post(``,
                {title: title}
            )
        )
    },
    changeTodoList(todoListId, newTodoListTitle) {
        return (
            instance.put(
                `${todoListId}`,
                {title: newTodoListTitle}
            )
        )
    },
    removeTodoList(todoListId) {
        return (
            instance.delete(`${todoListId}`)
        )
    },
    getTasks(todoListId) {
        return (
            instance.get(`${todoListId}/tasks`)
        )
    },
    createTask(todoListId, newTaskTitle) {
        return (
            instance.post(
                `${todoListId}/tasks`,
                {title: newTaskTitle}
            )
        )
    },
    changeTask(todoListId, taskId, changedTask) {
        return (
            instance.put(
                `${todoListId}/tasks/${taskId}`,
                changedTask
            )
        )
    },
    removeTask(todoListId, taskId) {
        return (
            instance.delete(`${todoListId}/tasks/${taskId}`)
        )
    }
}