import React from 'react';
import './App.css';

class TodoListHeader extends React.Component {

    state = {
        error: false,
        title: ''
    }
    onAddTaskClick = () => {
        let newText = this.state.title;
        this.setState({title: ''})

        if (newText.trim() === '') {
            this.setState({error: true})
        } else {
            this.setState({error: false})
            this.props.addTask(newText)
        }
    }
    onInputChange = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value.trimLeft()
        });
    }
    onEnterButtonPress = (e) => {
        if (e.key === 'Enter') {
            this.onAddTaskClick()
        }
    }
    render = () => {
        let classForInput = this.state.error === true ? 'error' : '';
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input className={classForInput} onKeyPress={this.onEnterButtonPress}
                           onChange={this.onInputChange} value={this.state.title}
                           placeholder='New title name'/>
                    <button onClick={this.onAddTaskClick}>Add</button>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;

