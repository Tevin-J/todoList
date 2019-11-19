import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {

        const tasksElements = this.props.tasks.map(task => <TodoListTask task={task} changeStatus={this.props.changeStatus}/>);

        return (

            <div className="todoList-tasks">

                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;

