import React, { Component } from 'react'
import './style.css'
import TodoItem from './TodoItem'
import TodoShow from './TodoShow'

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      list: ['vue']
    }
    this.handleChange = this.handleChange.bind(this)
    this.addItem = this.addItem.bind(this)
    this.delItem = this.delItem.bind(this)
  }

  UNSAFE_componentWillMount() {
    console.log(333)
  }

  componentDidMount() {
    console.log(111)
  }

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate')
    return true
  }

  UNSAFE_componentWillUpdate() {
    console.log('componentWillUpdate')
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
  }

  handleChange(e) {
    this.setState(state => {
      return {
        inputValue: this.input.value
      }
    })
  }

  addItem(e) {
    this.state.inputValue &&
      this.setState(state => ({
        list: [...state.list, state.inputValue],
        inputValue: ''
      }))
  }

  delItem(index) {
    this.setState(state => {
      let arr = [...state.list]
      arr.splice(index, 1)
      return {
        list: arr
      }
    })
  }

  render() {
    console.log('render')
    return (
      <div className="todo-list-wrap">
        <div className="todo-list__header">
          <input
            type="text"
            className="todo-list__input"
            ref={item => (this.input = item)}
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
          <button className="todo-list__add" onClick={this.addItem}>
            add
          </button>
        </div>
        <TodoShow content={this.state.inputValue}></TodoShow>
        <ul className="todo-list__content">
          {this.state.list.map((item, index) => (
            <TodoItem
              key={item + index}
              delItem={this.delItem}
              info={{ content: item, index }}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default TodoList
