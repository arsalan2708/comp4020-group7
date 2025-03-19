/**
 * returns a function that employs the observer patterns like the react useState hook
 * for state management. Components can subscribe to the state change event
 * by passing a listener function that gets called.
 * @param initialValue initial state
 * @returns returns a state value like reacts useState hook. returns {state, setState, subscribe}
 */
export function useState<T>(initialValue: T) {
  // initial state value
  let state = initialValue;

  // set containing call back functions
  const callBacks = new Set<(state: T) => void>();

  const getState = () => state;

  // sets the state value
  const setState = (newValue: T) => {
    state = newValue;
    callBacks.forEach((callBack) => callBack(state));
  };

  /**
   * objects can subscribe to the state change by passing a call back function to be called
   * when the state changed
   * @param callBack call back function passed as listener to be called when the state changes
   * @returns a function to unsubscribe an element to state changes
   */
  const subscribe = (callBack: (state: T) => void) => {
    callBacks.add(callBack);

    // Return unsubscribe function
    return () => callBacks.delete(callBack);
  };

  return { getState, setState, subscribe };
}
