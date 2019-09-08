import _ from 'lodash';
import update from 'immutability-helper';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channels = handleActions({
  [actions.getChannelsSuccess](state, { payload }) {
    const byId = payload.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
    const allIds = payload.map(item => item.id);
    return { byId, allIds };
  },
  [actions.addChannelToStore](state, { payload }) {
    const { attributes } = payload;
    return {
      byId: { ...state.byId, [attributes.id]: attributes },
      allIds: [...state.allIds, attributes.id],
    };
  },
  [actions.removeChannelFromStore](state, { payload }) {
    const { id } = payload;
    const updatedState = update(state, {
      byId: { $unset: [id] },
    });
    updatedState.allIds = state.allIds.filter(item => item !== id);
    return updatedState;
  },
  [actions.renameChannelFromStore](state, { payload }) {
    const updatedState = { ...state, byId: { ...state.byId, [payload.id]: payload.attributes } };
    return updatedState;
  },
}, { byId: {}, allIds: [] });

const currentChannelId = handleActions({
  [actions.setCurrentChannelId](state, { payload }) {
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
  [actions.removeChannelFromStore](state, { payload }) {
    const { id } = payload;
    const updatedState = state.filter(item => item.channelId !== id);
    return updatedState;
  },
}, []);

const modalInitialState = { type: null, props: { value: '', id: null } };
const modal = handleActions({
  [actions.showModal](state, { payload }) {
    return payload;
  },
  [actions.hideModal]() {
    return modalInitialState;
  },
}, modalInitialState);


export default combineReducers({
  modal,
  messages,
  channels,
  currentChannelId,
  form: formReducer,
});
