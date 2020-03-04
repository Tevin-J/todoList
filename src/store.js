import {createStore} from "redux";

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
        case 'ADD-TODOLIST':
            return {
                ...state,
                todoLists: [...state.todoLists, action.newTodoList]
            }
        case 'ADD-TASK':
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
        case 'CHANGE-TASK':
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
        case 'REMOVE-TODOLIST':
            return {
                ...state,
                todoLists: state.todoLists.filter(tl=> {
                    if (tl.id !== action.todoListId) {
                        return tl
                    }
                })
            }
        case 'REMOVE-TASK':
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

const store = createStore(reducer);
export default store