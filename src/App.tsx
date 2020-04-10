import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {createTodoList, getTodoLists} from "./reducer";
import preloader from './assets/preloader.gif'
import {TodoListType} from "./types/entities";
import {AppStateType} from "./store";
type MapStateToPropsType = {
    todoLists: Array<TodoListType>
    isFetching: boolean
}
type MapDispatchToPropsType = {
    getTodoLists: () => void
    createTodoList: (title: string) => void
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType
class App extends React.Component<PropsType> {

    componentDidMount() {
        this.restoreState()
    }

    restoreState = (): void => {
        this.props.getTodoLists()
    }

    addTodoList = (title: string): void => {
        this.props.createTodoList(title)
    }

    render = () => {
        const todoLists = this.props.todoLists.map(todoList =>
            <TodoList todoList={todoList} id={todoList.id} title={todoList.title} tasks={todoList.tasks}/>)
        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {this.props.isFetching
                        ? <img className={'img'} src={preloader}/>
                        : todoLists
                    }
                </div>
            </>
        );
    }
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        todoLists: state.todoList.todoLists,
        isFetching: state.todoList.isFetching
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {getTodoLists, createTodoList})(App)

