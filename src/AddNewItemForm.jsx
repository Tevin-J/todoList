import React from 'react';
import './App.css';
import TodoListTitle from "./TodoListTitle";

class AddNewItemForm extends React.Component {

    state = {
        error: false,
        title: ''
    }
    onAddItemClick = () => {
        let newText = this.state.title;
        this.setState({title: ''})

        if (newText.trim() === '') {
            this.setState({error: true})
        } else {
            this.setState({error: false})
            this.props.addItem(newText)
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
            this.onAddItemClick()
        }
    }
    render = () => {
        let classForInput = this.state.error === true ? 'error' : '';
        return (

                <div className="todoList-newTaskForm">
                    <input className={classForInput} onKeyPress={this.onEnterButtonPress}
                           onChange={this.onInputChange} value={this.state.title}
                           placeholder='New item name'/>
                    <button onClick={this.onAddItemClick}>Add</button>
                </div>
        );
    }
}

export default AddNewItemForm;

