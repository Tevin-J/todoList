import {api} from "./api";
import {TaskType, TodoListType} from "./types/entities";

export const ADD_TODOLIST = 'TodoList/Reducer/ADD-TODOLIST'
export const ADD_TASK = 'TodoList/Reducer/ADD-TASK'
export const CHANGE_TASK = 'TodoList/Reducer/CHANGE-TASK'
export const REMOVE_TODOLIST = 'TodoList/Reducer/REMOVE-TODOLIST'
export const REMOVE_TASK = 'TodoList/Reducer/REMOVE-TASK'
export const SET_TODOLISTS = 'TodoList/Reducer/SET_TODOLISTS'
export const SET_TASKS = 'TodoList/Reducer/SET_TASKS'
export const UPDATE_TODOLIST_TITLE = 'TodoList/Reducer/UPDATE_TODOLIST_TITLE'
export const LOADING_TODOLISTS = 'TodoList/Reducer/LOADING_TODOLISTS'
export const LOADING_TASKS = 'TodoList/Reducer/LOADING_TASKS'

type InitialStateType = {
    todoLists: Array<TodoListType>
    isFetching: boolean
}

const initialState: InitialStateType = {
    todoLists: [],
    isFetching: false
}

const reducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case SET_TODOLISTS:
            return {
                ...state,
                todoLists: action.todoLists.map(tl => ({
                    ...tl,
                    tasks: [],
                isFetching: false
                }))
            }
        case ADD_TODOLIST:
            return {
                ...state,
                todoLists: [...state.todoLists, action.newTodoList]
            }
        case UPDATE_TODOLIST_TITLE:
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {...tl, title: action.todoListTitle}
                    } else {
                        return tl
                    }
                })
            }
        case SET_TASKS:
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {...tl, tasks: action.tasks}
                    } else {
                        return tl
                    }
                })
            }
        case ADD_TASK:
            return {
                ...state,
                todoLists: state.todoLists.map(tl=>{
                    if (tl.id === action.todoListId) {
                        return {...tl, tasks: [...tl.tasks, action.newTask]}
                    } else {
                        return tl
                    }
                })
            }
        case CHANGE_TASK:
            debugger
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.task.todoListId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if (t.id === action.task.id) {
                                    return action.task
                                } else {
                                    return t
                                }
                            })
                        }
                    } else {
                        return tl
                    }
                })
            }
        case REMOVE_TODOLIST:
            return {
                ...state,
                todoLists: state.todoLists.filter(tl=> {
                    if (tl.id !== action.todoListId) {
                        return tl
                    }
                })
            }
        case REMOVE_TASK:
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.filter(t => {
                                if (t.id !== action.taskId) {
                                    return t
                                }
                            })
                        }
                    } else {
                        return tl
                    }
                })
            }
        case LOADING_TODOLISTS:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case LOADING_TASKS:
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {
                            ...tl,
                            isFetching: action.isFetching
                        }
                    } else {
                        return tl
                    }
                })
            }
    }
    return state
}
/*action creators types*/
type SetTodoListsType = {
    type: typeof SET_TODOLISTS
    todoLists: Array<TodoListType>
}
type SetTasksType = {
    type: typeof SET_TASKS
    tasks: Array<TaskType>
    todoListId: string
}
type AddTodoListType = {
    type: typeof ADD_TODOLIST
    newTodoList: TodoListType
}
type AddTaskType = {
    type: typeof ADD_TASK
    newTask: TaskType
    todoListId: string
}
type ChangeTaskType = {
    type: typeof CHANGE_TASK
    task: TaskType
}
type UpdateTodoListTitleType = {
    type: typeof UPDATE_TODOLIST_TITLE
    todoListId: string
    todoListTitle: string
}
type RemoveTodoListType = {
    type: typeof REMOVE_TODOLIST
    todoListId: string
}
type RemoveTaskType = {
    type: typeof REMOVE_TASK
    todoListId: string
    taskId: string
}
type LoadingTodoListsType = {
    type: typeof LOADING_TODOLISTS
    isFetching: boolean
}
type LoadingTasksType = {
    type: typeof LOADING_TASKS
    isFetching: boolean
    todoListId: string
}

type TodoActionTypes =
    SetTodoListsType
    | SetTasksType
    | AddTodoListType
    | AddTaskType
    | ChangeTaskType
    | UpdateTodoListTitleType
    | RemoveTodoListType
    | RemoveTaskType
    | LoadingTodoListsType
    | LoadingTasksType

type AppActionType = TodoActionTypes
/*action creators*/
const setTodoListsAC = (todoLists: Array<TodoListType>): SetTodoListsType => ({type: SET_TODOLISTS, todoLists})
const setTasksAC = (tasks: Array<TaskType>, todoListId: string): SetTasksType => ({type: SET_TASKS, tasks, todoListId})
const addTodoListAC = (newTodoList: TodoListType): AddTodoListType => ({type: ADD_TODOLIST, newTodoList})
const addTaskAC = (newTask: TaskType, todoListId: string): AddTaskType => ({type: ADD_TASK, newTask, todoListId})
const updateTodoListTitleAC = (todoListId: string, todoListTitle: string): UpdateTodoListTitleType => ({type: UPDATE_TODOLIST_TITLE, todoListId, todoListTitle})
const changeTaskAC = (task: TaskType): ChangeTaskType => ({type: CHANGE_TASK, task})
const removeTodoListAC = (todoListId: string): RemoveTodoListType => ({type: REMOVE_TODOLIST, todoListId})
const removeTaskAC = (todoListId: string, taskId: string): RemoveTaskType => ({type: REMOVE_TASK, todoListId, taskId})
const loadingTodoListsAC = (isFetching: boolean): LoadingTodoListsType => ({type: LOADING_TODOLISTS, isFetching})
const loadingTasksAC = (isFetching: boolean, todoListId: string): LoadingTasksType => ({type: LOADING_TASKS, isFetching, todoListId})
/*thunk creators*/
export const getTodoLists = () => (dispatch: any) => {
    dispatch(loadingTodoListsAC(true))
    api.getTodoLists()
        .then(response => {
            dispatch(setTodoListsAC(response.data))
            dispatch(loadingTodoListsAC(false))
        })
}
export const createTodoList = (title: string) => (dispatch: any) => {
    api.createTodoList(title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTodoListAC(response.data.data.item))
            }
        })
}
export const removeTodoList = (todoListId: string) => (dispatch: any) => {
    api.removeTodoList(todoListId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(removeTodoListAC(todoListId))
            }

        })
}
export const getTasks = (todoListId: string) => (dispatch: any) => {
    dispatch(loadingTasksAC(true, todoListId))
    api.getTasks(todoListId)
        .then(response => {
            if (response.data.error === null) {
                dispatch(setTasksAC(response.data.items, todoListId))
                dispatch(loadingTasksAC(false, todoListId))
            }
        })
}
export const addTask = (todoListId: string, newText: string) => (dispatch: any) => {
    api.createTask(todoListId, newText)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTaskAC(response.data.data.item, todoListId))
            }
        })
}
export const changeTask = (todoListId: string, taskId: string, changedTask: TaskType) => (dispatch: any) => {
    debugger
    api.changeTask(todoListId, taskId, changedTask)
        .then(response => {
            debugger
            if (response.data.resultCode === 0) {
                dispatch(changeTaskAC(response.data.data.item))
            }
        })
}
export const removeTask = (todoListId: string, taskId: string) => (dispatch: any) => {
    api.removeTask(todoListId, taskId)
        .then(response => {
            dispatch(removeTaskAC(todoListId, taskId))
        })
}
export const changeTodoList = (todoListId: string, todoListTitle: string) => (dispatch: any) => {
    api.changeTodoList(todoListId, todoListTitle)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(updateTodoListTitleAC(todoListId, todoListTitle))
            }
        })
}
export default reducer