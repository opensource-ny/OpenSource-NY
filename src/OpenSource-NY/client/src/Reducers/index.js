import { CLICKLOGIN, CLICKSIGNUP, HASBUTTON, SUBMIT } from "../Actions";

const initialState = {

    isLogin: false,
    isSignUp: false,
    hasButton: true,
    isSubmitted: false
};

export default (state = initialState, action) =>{

    switch(action.type){

        case CLICKLOGIN:
            return Object.assign({}, state, state.isLogin = action.isLogin, state.isSignUp = action.isSignUp, state.hasButton = action.hasButton);

        case CLICKSIGNUP:
            return Object.assign({}, state, state.isSignUp = action.isSignUp, state.isLogin = action.isLogin, state.hasButton = action.hasButton);

        case HASBUTTON:
            return Object.assign({}, state, state.hasButton = action.hasButton);

        case SUBMIT:
            return Object.assign({}, state, state.isSubmitted = action.isSubmitted);

        default:
            return state;
    } 
};