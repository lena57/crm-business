const initialState = {
  clients: [{
    "_id": "63b1363ced507f0815e47f30",
    "name": "Marusya Klimova",
    "address": "Klimovka",
    "phoneNumber": "918-765-0000",
    "createAt": "15.01.2023",
  }],
  services: [{
    "_id": "63b1326b8a17a5fd0d35caf0",
    "job": "Uber",
    "price": 56,
    "primeCost": 20,
    "employee": "Tolik",
  }],
  orders: [{
    "service": {
      "job": "Uber",
      "employee": "Tolik",
      "price": 56,
      "primeCost": 20,
      "createAt": "15.01.2023"
    },
    "sentToDo": {
      "date": "",
      "status": false
    },
    "completed": {
      "date": "",
      "status": false
    },
    "sayToClient": {
      "date": "",
      "status": false
    },
    "clientReceived": {
      "date": "",
      "status": false
    },
    "paid": {
      "payment": 50,
      "debt": 6,
      "primeCost": 20,
      "date": "",
      "status": false
    },
    "_id": "63b13cc1a59c0abc9ae00c90",
    "orderNumber": 0,
    "clientName": "Marusya Klimova",
  }],
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
