import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './Todo.css';
class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      completed: false,
      task: this.props.task,
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleRemove() {
    this.props.remove(this.props.id);
  }
  toggleCompleted() {
    this.setState((prevState) => ({ completed: !prevState.completed }));
  }
  toggleEdit() {
    this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
  }
  handleChange(e) {
    this.setState({ task: e.target.value });
  }
  handleSave(e) {
    e.preventDefault();
    this.props.updateTodo(this.props.id, this.state.task);
    this.setState({ isEditing: false });
  }
  render() {
    let result;
    if (this.state.isEditing) {
      result = (
        <form onSubmit={this.handleSave}>
          <input
            value={this.state.task}
            name='task'
            type='text'
            onChange={this.handleChange}
            onSubmit={this.handleSave}
          ></input>
          <button>Save</button>
        </form>
      );
    } else {
      result = (
        <>
          <button
            onClick={this.toggleCompleted}
            className={this.state.completed ? `completed` : null}
          >
            {this.props.task}
          </button>
          <div className='Todo-buttons'>
            <button onClick={this.toggleEdit}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
            <button onClick={this.handleRemove}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </>
      );
    }
    return <div className='Todo'>{result}</div>;
  }
}

export default Todo;
