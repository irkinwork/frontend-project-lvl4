import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const messagesState = handleActions({
  [actions.addMessageRequest](state) {
    return { ...state, state: 'request' };
  },
  [actions.addMessageFailure](state) {
    return { ...state, state: 'failure' };
  },
  [actions.addMessageSuccess](state) {
    return { ...state, state: 'success' };
  },
}, {});

const channels = handleActions({
  [actions.setcurrentChannelId](state, { payload }) {
    const newState = state.map((item) => {
      if (item.channel === payload) {
        return { channel: payload, current: true };
      }
      return { channel: item.channel, current: false };
    });
    return newState;
  },
}, [
  { channel: 'general', current: true },
  { channel: 'random', current: false },
]);

const currentChannelId = handleActions({
  [actions.setcurrentChannelId](state, { payload }) {
    return payload;
  },
}, 1);

const messages = handleActions({
  [actions.addMessageToStore](state, { payload }) {
    const { attributes } = payload;
    const newState = state.concat(attributes);
    return newState;
  },
  [actions.getMessagesSuccess](state, { payload }) {
    const data = payload.map(item => item.attributes);
    const newItems = _.differenceBy(data, state, 'id');
    const newState = state.concat(newItems);
    return newState;
  },
}, []);


export default combineReducers({
  messages,
  messagesState,
  channels,
  currentChannelId,
  form: formReducer,
});
