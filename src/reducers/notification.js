import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "../constants/constants";

const initialState = {
  notifications: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.notification]
      };

    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...state.notifications.slice(0, action.index),
          ...state.notifications.slice(action.index + 1)
        ]
      };

    default:
      return state;
  }
};
