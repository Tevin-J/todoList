export const ADD_TODOLIST = 'TodoList/Reducer/ADD-TODOLIST'
export const ADD_TASK = 'TodoList/Reducer/ADD-TASK'
export const CHANGE_TASK = 'TodoList/Reducer/CHANGE-TASK'
export const REMOVE_TODOLIST = 'TodoList/Reducer/REMOVE-TODOLIST'
export const REMOVE_TASK = 'TodoList/Reducer/REMOVE-TASK'
export const SET_TODOLISTS = 'TodoList/Reducer/SET_TODOLISTS'
export const SET_TASKS = 'TodoList/Reducer/SET_TASKS'


const initialState = {
    todoLists: []
}

const reducer = (state = initialState, action) => { /*если state не придет, то будет использован initialState*/
    switch (action.type) {
        case SET_TODOLISTS:
            return {
                ...state,
                todoLists: action.todoLists.map(tl => ({...tl, tasks: []}))
            }
        case ADD_TODOLIST:
            return {
                ...state,
                todoLists: [...state.todoLists, action.newTodoList]
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
    }
    return state
}
export const addTodolistAC = (newTodoList) => ({type: ADD_TODOLIST, newTodoList})
export const addTaskAC = (newTask, todoListId) => ({type: ADD_TASK, newTask, todoListId})
export const changeTaskAC = (task) => ({type: CHANGE_TASK, task})
export const removeTodolistAC = (todoListId) => ({type: REMOVE_TODOLIST, todoListId})
export const removeTaskAC = (todoListId, taskId) => ({type: REMOVE_TASK, todoListId, taskId})
export const setTodoListsAC = (todoLists) => ({type: SET_TODOLISTS, todoLists})
export const setTasksAC = (tasks, todoListId) => ({type: SET_TASKS, tasks, todoListId})
export default reducer