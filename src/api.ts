import axios from "axios";
import {TaskType, TodoListType} from "./types/entities";

type GetTodoListResponseType = Array<TodoListType>
type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}
type CreateTodoListResponseType = {
    data: { item: TodoListType }
    messages: Array<string>
    resultCode: number
}
type CreateTaskResponseType = {
    data: { item: TaskType }
    messages: Array<string>
    resultCode: number
}
type RemoveTodoListResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}
type RemoveTaskResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}
type ChangeTaskResponseType = {
    data: { item: TaskType }
    resultCode: number
    messages: Array<string>
}

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/todo-lists/`,
    withCredentials: true,
    headers: {'API-KEY': 'f28b0cf7-313a-42c3-9df8-994bce274198'}
})

export const api = {
    getTodoLists() {
        return (
            instance.get<GetTodoListResponseType>(``)
        )
    },
    createTodoList(title: string) {
        return (
            instance.post<CreateTodoListResponseType>(``,
                {title: title}
            )
        )
    },
    changeTodoList(todoListId: string, newTodoListTitle: string) {
        return (
            instance.put(
                `${todoListId}`,
                {title: newTodoListTitle}
            )
        )
    },
    removeTodoList(todoListId: string) {
        return (
            instance.delete<RemoveTodoListResponseType>(`${todoListId}`)
        )
    },
    getTasks(todoListId: string) {
        return (
            instance.get<GetTasksResponseType>(`${todoListId}/tasks`)
        )
    },
    createTask(todoListId: string, newTaskTitle: string) {
        return (
            instance.post<CreateTaskResponseType>(
                `${todoListId}/tasks`,
                {title: newTaskTitle}
            )
        )
    },
    changeTask(todoListId: string, taskId: string, changedTask: TaskType) {
        return (
            instance.put<ChangeTaskResponseType>(
                `${todoListId}/tasks/${taskId}`,
                changedTask
            )
        )
    },
    removeTask(todoListId: string, taskId: string) {
        return (
            instance.delete<RemoveTaskResponseType>(`${todoListId}/tasks/${taskId}`)
        )
    }
}