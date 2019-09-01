import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const getMessagesSuccess = createAction('MESSAGES_GET_SUCCESS');
export const getMessagesFailure = createAction('MESSAGES_GET_FAILURE');

export const addMessageRequest = ({ data }) => async (dispatch) => {
  try {
    const { channelId } = data.attributes;
    const response = await axios.post(routes.channelMessagesPath(channelId), { data });
    dispatch(addMessageSuccess({ msg: response.data }));
  } catch (e) {
    dispatch(addMessageFailure(e));
  }
};

export const getMessagesRequest = channelId => async (dispatch) => {
  try {
    const response = await axios.get(routes.channelMessagesPath(channelId));
    dispatch(getMessagesSuccess(response.data));
  } catch (e) {
    dispatch(addMessageFailure(e));
  }
};


export const setcurrentChannelId = createAction('CHANNEL_SET');

export const addMessageToStore = createAction('MESSAGE_ADD_TO_STORE');
