import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.newTaskTitleRef = React.createRef();
    }

    state = {
        tasks : [
            {name: 'CSS', isDone: true, priority: 'low'},
            {name: 'JavaScript', isDone: false, priority: 'medium'},
            {name: 'HTML', isDone: true, priority: 'low'},
            {name: 'React.js', isDone: false, priority: 'high'},
        ],
        filterValue : 'Active',

    };

    onAddTaskClick = () => {
        let newTaskName = this.newTaskTitleRef.current.value;
        let newTask = {name: newTaskName, isDone: false, priority: 'high'};
        let newTasks = [...this.state.tasks, newTask];/*аналогия метода push, но создает
                                новый массив. возьмет содержимое указанного объекта, и поместит в него
                                дополнительно тот элемент, что полсле запятой*/
        this.setState({
                      tasks: newTasks /*перезатирание старого свойства tasks у state на новое, где появился
                                    новый элемент, а setState сам включает render грубо говоря*/
        });
        this.newTaskTitleRef.current.value = '';
    };
    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    {/*<TodoListHeader/>*/}
                    <div className="todoList-header">
                        <h3 className="todoList-header__title">What to Learn</h3>
                        <div className="todoList-newTaskForm">
                            <input ref={this.newTaskTitleRef} type="text" placeholder="New task name"/>
                            <button onClick={this.onAddTaskClick}> {/*это callback ф-я*/}
                                Add
                            </button>
                        </div>
                    </div>
                    <TodoListTasks tasks={this.state.tasks}/>
                    <TodoListFooter filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

