export const formValue = {
  state: {
    paperSize: 'A2',
    margin: {
      top: 40,
      bottom: 40,
      left: 20,
      right: 20,
    },
    shape: 'rectangle',
    diameter: 30,
    width: 50,
    height: 30,
    gap: 5,
  }, // initial state
  reducers: {
    update: (state, payload) => {
      return {
        ...state,
        payload,
      };
    },
  },
};
