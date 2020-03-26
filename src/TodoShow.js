import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TodoShow extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  UNSAFE_componentWillReceiveProps() {
    console.log('componentWillReceiveProps')
  }

  render() {
    return <div>{this.props.content}</div>
  }
}

TodoShow.propTypes = {
  content: PropTypes.string
}
export default TodoShow
