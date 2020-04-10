import React, {ChangeEvent} from 'react';
import './App.css';

type StateType = {
    error: boolean
    title: string
}
type OwnProps = {
    addItem: (newText: string) => void
    title?: string
}
type  PropsType = OwnProps

class AddNewItemForm extends React.Component<PropsType, StateType> {

    state: StateType = {
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
    onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            error: false,
            title: e.currentTarget.value.trimLeft()
        });
    }
    onEnterButtonPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            this.onAddItemClick()
        }
    }
    render = () => {
        let classForInput = this.state.error ? 'error' : '';
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

