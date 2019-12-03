import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {


    componentDidMount() {
        this.restoreState()
    }

    nextTaskId = 0;

    state = {
        tasks : [
            /*{id: 0, name: 'CSS', isDone: true, priority: 'low'},
            {id: 1, name: 'JavaScript', isDone: false, priority: 'medium'},
            {id: 2, name: 'HTML', isDone: true, priority: 'low'},
            {id: 3, name: 'React.js', isDone: false, priority: 'high'},*/
        ],
        filterValue : 'All',

    };

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-state', stateAsString)
    }

    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        };
        let stateAsString = localStorage.getItem('our-state');
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.tasks.forEach((task) => {
                if (task.id >= this.nextTaskId) {
                    this.nextTaskId = task.id + 1;
                }
            })
        });
    }

    addTask = (newText) => {
        let newTask = {id: this.nextTaskId, name: newText, isDone: false, priority: 'high'};
        this.nextTaskId++;
        let newTasks = [...this.state.tasks, newTask];/*аналогия метода push, но создает
                                новый массив. возьмет содержимое указанного объекта, и поместит в него
                                дополнительно тот элемент, что полсле запятой*/
        this.setState({
            tasks: newTasks /*перезатирание старого свойства tasks у state на новое, где появился
                                    новый элемент, а setState сам включает render грубо говоря*/
        }, () => {this.saveState()});
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        },  () => {this.saveState()});
    };

    changeStatus = (taskId, isDone) => {
        /*let newTasks = this.state.tasks.map(t => {
            if (t.id != taskId) {
                return t;
            } else {
                return {...t, ...{isDone: isDone}};
            }
        })
        this.setState({
            tasks:newTasks
        })*/
        this.changeTask(taskId, {isDone: isDone})
    }

    changeTitle = (taskId, newTitle) => {
        /*let newTasks = this.state.tasks.map(t => {
            if (t.id != taskId) {
                return t;
            } else {
                return {...t, ...{name: newTitle}};
            }
        })
        this.setState({
            tasks:newTasks
        })*/
        this.changeTask(taskId, {name: newTitle})
    }

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id != taskId) {
                return t;
            } else {
                return {...t, ...obj};
            }
        })
        this.setState({
            tasks:newTasks
        },  () => {this.saveState()})
    }

    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask}/>

                    <TodoListTasks changeTitle={this.changeTitle} changeStatus={this.changeStatus} tasks={this.state.tasks.filter(task => {
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

