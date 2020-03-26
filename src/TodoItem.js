import React, { Component } from 'react'

class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <li
        className="todo-list__item"
        onClick={e => this.props.delItem(this.props.info.index)}
      >
        {this.props.info.content}
      </li>
    )
  }
}

export default TodoItem
