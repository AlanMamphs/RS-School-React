import { useEffect } from 'react';

export const BuggyComponent = () => {
  useEffect(() => {
    // Simulate an error in componentDidMount
    throw new Error('Simulated error in componentDidMount');
  }, []);
  return <div>This is a buggy component</div>;
};
