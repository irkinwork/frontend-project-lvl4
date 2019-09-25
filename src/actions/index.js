import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

export const renameChannelRequest = createAction('CHANNEL_RENAME_REQUEST');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const renameChannelFailure = createAction('CHANNEL_RENAME_FAILURE');

export const setCurrentChannelId = createAction('CHANNEL_SET');
export const setInitialCurrentChannelId = createAction('CHANNEL_INITIAL_SET');

export const showModal = createAction('SHOW_MODAL');
export const hideModal = createAction('HIDE_MODAL');

export const getChannelsFromGon = createAction('CHANNELS_GET_FROM_GONE');
export const getMessagesFromGon = createAction('MESSAGES_GET_FROM_GONE');

export const addMessageToStore = createAction('MESSAGE_ADD_TO_STORE');
export const addChannelToStore = createAction('CHANNEL_ADD_TO_STORE');

export const removeChannelFromStore = createAction('CHANNEL_REMOVE_FROM_STORE');
export const renameChannelFromStore = createAction('CHANNEL_RENAME_FROM_STORE');
export const setIsLoaded = createAction('APP_IS_LOADED');

export const addMessage = ({ data }) => async (dispatch) => {
  await dispatch(addMessageRequest());
  try {
    const { channelId } = data.attributes;
    await axios.post(routes.channelMessagesPath(channelId), { data });
    await dispatch(addMessageSuccess());
  } catch (e) {
    dispatch(addMessageFailure(e));
  }
};

export const addChannel = ({ data }) => async (dispatch) => {
  await dispatch(addChannelRequest());
  await dispatch(setIsLoaded(false));
  try {
    const response = await axios.post(routes.channelsPath(), { data });
    const { data: { data: { attributes: { id } } } } = response;
    await dispatch(addChannelSuccess());
    await dispatch(setCurrentChannelId(id));
    await dispatch(hideModal());
    await dispatch(setIsLoaded(true));
  } catch (e) {
    dispatch(addChannelFailure(e));
  }
};

export const renameChannel = ({ data }, id) => async (dispatch) => {
  await dispatch(renameChannelRequest());
  await dispatch(setIsLoaded(false));
  try {
    await axios.patch(routes.channelPath(id), { data });
    await dispatch(renameChannelSuccess());
    await dispatch(setCurrentChannelId(id));
    await dispatch(hideModal());
    await dispatch(setIsLoaded(true));
  } catch (e) {
    await dispatch(renameChannelFailure(e));
  }
};

export const removeChannel = id => async (dispatch) => {
  await dispatch(removeChannelRequest());
  await dispatch(setIsLoaded(false));
  try {
    await axios.delete(routes.channelPath(id));
    await dispatch(removeChannelSuccess());
    await dispatch(setInitialCurrentChannelId());
    await dispatch(hideModal());
    await dispatch(setIsLoaded(true));
  } catch (e) {
    dispatch(removeChannelFailure(e));
  }
};
