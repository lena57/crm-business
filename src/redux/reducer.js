const initialState = {
  clients: [],
  services: [],
  orders: [],
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CLIENTS':
      return {
        ...state,
        clients: action.payload
      };
    case 'GET_SERVICES':
      return {
        ...state,
        services: action.payload
      };
    case 'GET_ORDERS':
      return {
        ...state,
        orders: action.payload
      };


    default:
      return state
  }
}
