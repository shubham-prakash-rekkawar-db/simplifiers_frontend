import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    CONCERN_UPDATE,
    UPDATE_USER,
  } from '../actions/type';
  
  const initialState = {
    isLogin: false,
    user: null,
    profile: {
      name: 'Kiran Nathe',
    },
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          user: 'Kiran',
          profile: '',
          isLogin: true,
        };
      case REGISTER_FAIL:
        return {
          ...state,
          user: null,
          profile: null,
          isLogin: false,
        };
      case CONCERN_UPDATE:
        return {
          ...state,
          profile: action.payload,
        };
      case UPDATE_USER:
        return {
          ...state,
          profile: action.payload,
        };
      default:
        return state;
    }
  }
  