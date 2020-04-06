import {api} from "./api";

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

const initialState = {
    todoLists: [],
    isFetching: false
}

const reducer = (state = initialState, action) => { /*если state не придет, то будет использован initialState*/
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
/*actions*/
const addTodoListAC = (newTodoList) => ({type: ADD_TODOLIST, newTodoList})
const addTaskAC = (newTask, todoListId) => ({type: ADD_TASK, newTask, todoListId})
const changeTaskAC = (task) => ({type: CHANGE_TASK, task})
const removeTodoListAC = (todoListId) => ({type: REMOVE_TODOLIST, todoListId})
const removeTaskAC = (todoListId, taskId) => ({type: REMOVE_TASK, todoListId, taskId})
const setTodoListsAC = (todoLists) => ({type: SET_TODOLISTS, todoLists})
const setTasksAC = (tasks, todoListId) => ({type: SET_TASKS, tasks, todoListId})
const updateTodoListTitleAC = (todoListId, todoListTitle) => ({type: UPDATE_TODOLIST_TITLE, todoListId, todoListTitle})
const loadingTodoListsAC = (isFetching) => ({type: LOADING_TODOLISTS, isFetching})
const loadingTasksAC = (isFetching, todoListId) => ({type: LOADING_TASKS, isFetching, todoListId})
/*thunks*/
export const getTodoLists = () => (dispatch) => {
    dispatch(loadingTodoListsAC(true))
    api.getTodoLists()
        .then(response => {
            dispatch(setTodoListsAC(response.data))
            dispatch(loadingTodoListsAC(false))
        })
}
export const createTodoList = (title) => (dispatch) => {
    api.createTodoList(title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTodoListAC(response.data.data.item))
            }
        })
}
export const removeTodoList = (todoListId) => (dispatch) => {
    api.removeTodoList(todoListId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(removeTodoListAC(todoListId))
            }

        })
}
export const getTasks = (todoListId) => (dispatch) => {
    dispatch(loadingTasksAC(true, todoListId))
    api.getTasks(todoListId)
        .then(response => {
            if (response.data.error === null) {
                dispatch(setTasksAC(response.data.items, todoListId))
                dispatch(loadingTasksAC(false, todoListId))
            }
        })
}
export const addTask = (todoListId, newText) => (dispatch) => {
    api.createTask(todoListId, newText)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTaskAC(response.data.data.item, todoListId))
            }
        })
}
export const changeTask = (todoListId, taskId, changedTask) => (dispatch) => {
    api.changeTask(todoListId, taskId, changedTask)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(changeTaskAC(response.data.data.item))
            }
        })
}
export const removeTask = (todoListId, taskId) => (dispatch) => {
    api.removeTask(todoListId, taskId)
        .then(response => {
            dispatch(removeTaskAC(todoListId, taskId))
        })
}
export const changeTodoList = (todoListId, todoListTitle) => (dispatch) => {
    api.changeTodoList(todoListId, todoListTitle)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(updateTodoListTitleAC(todoListId, todoListTitle))
            }
        })
}
export default reducer