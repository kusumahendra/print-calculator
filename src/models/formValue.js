export const formValue = {
  state: {
    paperSize: 'A2',
    margin: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    },
    shape: 'rectangle',
    diameter: 30,
    width: 50,
    height: 30,
    gap: 5,
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    update: (state, payload) => {
      const newState = Object.assign(state, payload);
      return {
        ...state,
        newState,
      };
    },
  },
};
