import update from 'immutability-helper';
import { keyBy } from 'lodash';
import { combineReducers } from 'redux';
import { handleActions, combineActions } from 'redux-actions';
import { reducer as form } from 'redux-form';
import * as actions from '../actions';

const channels = handleActions({
  [actions.getDataFromGon](state, { payload }) {
    const byId = keyBy(payload.channels, 'id');
    const allIds = payload.channels.map(item => item.id);
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

const initialCurrentChannelId = 1;
const currentChannelId = handleActions({
  [actions.setCurrentChannelId](state, { payload }) {
    return payload;
  },
  [actions.removeChannelFromStore]() {
    return initialCurrentChannelId;
  },
  [combineActions(
    actions.addChannelSuccess,
    actions.renameChannelSuccess,
  )](state, { payload }) {
    return payload;
  },
}, initialCurrentChannelId);

const messages = handleActions({
  [actions.getDataFromGon](state, { payload }) {
    return payload.messages;
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
  [combineActions(
    actions.addChannelSuccess,
    actions.renameChannelSuccess,
    actions.removeChannelSuccess,
  )]() {
    return modalInitialState;
  },
}, modalInitialState);

const isLoaded = handleActions({
  [combineActions(
    actions.addChannelRequest,
    actions.renameChannelRequest,
    actions.removeChannelRequest,
  )]() {
    return false;
  },
  [combineActions(
    actions.addChannelSuccess,
    actions.renameChannelSuccess,
    actions.removeChannelSuccess,
    actions.getDataFromGon,
  )]() {
    return true;
  },
}, false);

const messageAddingState = handleActions({
  [actions.addMessageRequest]() {
    return 'requested';
  },
  [actions.addMessageSuccess]() {
    return 'finished';
  },
  [actions.addMessageFailure]() {
    return 'failed';
  },
}, 'none');

const channelAddingState = handleActions({
  [actions.addChannelRequest]() {
    return 'requested';
  },
  [actions.addChannelSuccess]() {
    return 'finished';
  },
  [actions.addChannelFailure]() {
    return 'failed';
  },
}, 'none');

const channelRenamingState = handleActions({
  [actions.renameChannelRequest]() {
    return 'requested';
  },
  [actions.renameChannelSuccess]() {
    return 'finished';
  },
  [actions.renameChannelFailure]() {
    return 'failed';
  },
}, 'none');

const channelRemovingState = handleActions({
  [actions.removeChannelRequest]() {
    return 'requested';
  },
  [actions.removeChannelSuccess]() {
    return 'finished';
  },
  [actions.removeChannelFailure]() {
    return 'failed';
  },
}, 'none');

export default combineReducers({
  isLoaded,
  modal,
  messages,
  channels,
  currentChannelId,
  form,
  messageAddingState,
  channelAddingState,
  channelRenamingState,
  channelRemovingState,
});
