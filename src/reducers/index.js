import update from 'immutability-helper';
import { keyBy } from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as form } from 'redux-form';
import * as actions from '../actions';

const channels = handleActions({
  [actions.getChannelsFromGon](state, { payload }) {
    const byId = keyBy(payload, 'id');
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

const initialCurrentChannel = { id: 1, name: 'general', removable: false };
const currentChannel = handleActions({
  [actions.setCurrentChannel](state, { payload }) {
    return payload;
  },
  [actions.setInitialCurrentChannel]() {
    return initialCurrentChannel;
  },
}, initialCurrentChannel);

const messages = handleActions({
  [actions.getMessagesFromGon](state, { payload }) {
    return payload;
  },
  [actions.addMessageToStore](state, { payload }) {
    const { attributes } = payload;
    const newState = state.concat(attributes);
    return newState;
  },
  [actions.removeChannelFromStore](state, { payload }) {
    const { id } = payload;
    const updatedState = state.filter(item => item.channelId !== id);
    return updatedState;
  },
}, []);

const modalInitialState = { type: null, props: { name: '', id: null } };
const modal = handleActions({
  [actions.showModal](state, { payload }) {
    return payload;
  },
  [actions.hideModal]() {
    return modalInitialState;
  },
}, modalInitialState);

const isLoaded = handleActions({
  [actions.setIsLoaded](state, { payload }) {
    return payload;
  },
}, false);

export default combineReducers({
  isLoaded,
  modal,
  messages,
  channels,
  currentChannel,
  form,
});
