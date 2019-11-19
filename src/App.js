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
        filterValue : 'All',

    };
    addTask = (newText) => {
        let newTask = {name: newText, isDone: false, priority: 'high'};
        let newTasks = [...this.state.tasks, newTask];/*аналогия метода push, но создает
                                новый массив. возьмет содержимое указанного объекта, и поместит в него
                                дополнительно тот элемент, что полсле запятой*/
        this.setState({
            tasks: newTasks /*перезатирание старого свойства tasks у state на новое, где появился
                                    новый элемент, а setState сам включает render грубо говоря*/
        });
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    changeStatus = (task, isDone) => {
        let newTasks = this.state.tasks.map(t => {
            if (t != task) {
                return t;
            } else {
                return {...t, isDone: isDone};
            }
        })
        this.setState({
            tasks:newTasks
        })
    }

    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask}/>

                    <TodoListTasks changeStatus={this.changeStatus} tasks={this.state.tasks.filter(task => {
                        switch (this.state.filterValue) {
                            case 'All': return true;
                            case 'Active': return !task.isDone;
                            case 'Completed': return task.isDone;
                        }
                    })}/>
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

