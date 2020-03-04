import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {

        const tasksElements = this.props.tasks.map(task => <TodoListTask task={task} changeStatus={this.props.changeStatus}
                            todoListId={this.props.todoListId} changeTitle={this.props.changeTitle}/>);

        return (

            <div className="todoList-tasks">

                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;

