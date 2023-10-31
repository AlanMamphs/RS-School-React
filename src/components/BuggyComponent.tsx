import { Component } from 'react';

export default class BuggyComponent extends Component {
  componentDidMount() {
    // Simulate an error in componentDidMount
    throw new Error('Simulated error in componentDidMount');
  }

  render() {
    return <div>This is a buggy component</div>;
  }
}
