import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const getMessagesSuccess = createAction('MESSAGES_GET_SUCCESS');
export const getMessagesFailure = createAction('MESSAGES_GET_FAILURE');

export const getChannelsSuccess = createAction('CHANNELS_GET_SUCCESS');
export const getChannelsFailure = createAction('CHANNELS_GET_FAILURE');

export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const renameChannelFailure = createAction('CHANNEL_RENAME_FAILURE');

export const addMessageRequest = ({ data }) => async (dispatch) => {
  try {
    const { channelId } = data.attributes;
    axios.post(routes.channelMessagesPath(channelId), { data });
  } catch (e) {
    dispatch(addMessageFailure(e));
  }
};

export const getMessagesRequest = channelId => async (dispatch) => {
  try {
    const response = await axios.get(routes.channelMessagesPath(channelId));
    dispatch(getMessagesSuccess(response.data));
  } catch (e) {
    dispatch(getMessagesFailure(e));
  }
};

export const getChannelsRequest = () => async (dispatch) => {
  try {
    const response = await axios.get(routes.channelsPath());
    dispatch(getChannelsSuccess(response.data));
  } catch (e) {
    dispatch(getChannelsFailure(e));
  }
};

export const addChannelRequest = ({ data }) => async (dispatch) => {
  try {
    const response = await axios.post(routes.channelsPath(), { data });
    dispatch(addChannelSuccess(response.data));
  } catch (e) {
    dispatch(addChannelFailure(e));
  }
};

export const removeChannelRequest = id => async (dispatch) => {
  try {
    await axios.delete(routes.channelPath(id));
    dispatch(removeChannelSuccess());
  } catch (e) {
    dispatch(removeChannelFailure(e));
  }
};

export const showModal = createAction('SHOW_MODAL');
export const hideModal = createAction('HIDE_MODAL');

export const renameChannelRequest = (id, { data }) => async (dispatch) => {
  try {
    const response = await axios.patch(routes.channelPath(id), { data });
    await dispatch(renameChannelSuccess(response.data));
    await dispatch(hideModal());
  } catch (e) {
    dispatch(renameChannelFailure(e));
  }
};
export const setCurrentChannelId = createAction('CHANNEL_SET');

export const addMessageToStore = createAction('MESSAGE_ADD_TO_STORE');

export const addChannelToStore = createAction('CHANNEL_ADD_TO_STORE');

export const removeChannelFromStore = createAction('CHANNEL_REMOVE_FROM_STORE');
export const renameChannelFromStore = createAction('CHANNEL_RENAME_FROM_STORE');
