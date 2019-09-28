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

export const showModal = createAction('SHOW_MODAL');
export const hideModal = createAction('HIDE_MODAL');

export const getDataFromGon = createAction('DATA_GET_FROM_GONE');

export const addMessageToStore = createAction('MESSAGE_ADD_TO_STORE');
export const addChannelToStore = createAction('CHANNEL_ADD_TO_STORE');
export const removeChannelFromStore = createAction('CHANNEL_REMOVE_FROM_STORE');
export const renameChannelFromStore = createAction('CHANNEL_RENAME_FROM_STORE');

export const addMessage = ({ data }) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const { channelId } = data.attributes;
    await axios.post(routes.channelMessagesPath(channelId), { data });
    dispatch(addMessageSuccess());
  } catch (e) {
    dispatch(addMessageFailure());
    throw e;
  }
};

export const addChannel = ({ data }) => async (dispatch) => {
  dispatch(addChannelRequest());
  try {
    const response = await axios.post(routes.channelsPath(), { data });
    const { data: { data: { attributes: { id } } } } = response;
    dispatch(addChannelSuccess(id));
  } catch (e) {
    dispatch(addChannelFailure());
    throw e;
  }
};

export const renameChannel = ({ data }, id) => async (dispatch) => {
  dispatch(renameChannelRequest());
  try {
    await axios.patch(routes.channelPath(id), { data });
    dispatch(renameChannelSuccess(id));
  } catch (e) {
    dispatch(renameChannelFailure());
    throw e;
  }
};

export const removeChannel = id => async (dispatch) => {
  dispatch(removeChannelRequest());
  try {
    await axios.delete(routes.channelPath(id));
    dispatch(removeChannelSuccess(id));
  } catch (e) {
    dispatch(removeChannelFailure());
    throw e;
  }
};
