export const ADD_TODOLIST = 'TodoList/Reducer/ADD-TODOLIST'
export const ADD_TASK = 'TodoList/Reducer/ADD-TASK'
export const CHANGE_TASK = 'TodoList/Reducer/CHANGE-TASK'
export const REMOVE_TODOLIST = 'TodoList/Reducer/REMOVE-TODOLIST'
export const REMOVE_TASK = 'TodoList/Reducer/REMOVE-TASK'


const initialState = {
    todoLists: [
        {
            id: 0,
            title: "important",
            tasks: [
                {id: 0, name: "one", isDone: false, priority: "high"},
                {id: 1, name: "two", isDone: true, priority: "low"}
            ]
        },
        {
            id: 1,
            title: "not important",
            tasks: [
                {id: 0, name: "one", isDone: false, priority: "high"},
                {id: 1, name: "two", isDone: true, priority: "low"}
            ]
        }
    ]

}

const reducer = (state = initialState, action) => { /*если state не придет, то будет использован initialState*/
    switch (action.type) {
        case ADD_TODOLIST:
            return {
                ...state,
                todoLists: [...state.todoLists, action.newTodoList]
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
                    if (tl.id === action.todoListId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if (t.id === action.taskId) {
                                    return {...t, ...action.obj}
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
export const changeTaskAC = (todoListId, taskId, obj) => ({type: CHANGE_TASK, todoListId, taskId, obj})
export const removeTodolistAC = (todoListId) => ({type: REMOVE_TODOLIST, todoListId})
export const removeTaskAC = (todoListId, taskId) => ({type: REMOVE_TASK, todoListId, taskId})
export default reducer