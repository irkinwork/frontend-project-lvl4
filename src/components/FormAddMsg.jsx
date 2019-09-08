import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../actions';
import UserCtx from '../context';

const mapStateToProps = (state) => {
  const props = {
    text: state.text,
    currentChannelId: state.currentChannelId,
  };
  return props;
};

const actionCreators = {
  addMessageRequest: actions.addMessageRequest,
};
@connect(mapStateToProps, actionCreators)
class FormAddMsg extends React.Component {
  static contextType = UserCtx;

  handleSubmit = async (values) => {
    const username = this.context;
    const { addMessageRequest, reset, currentChannelId } = this.props;
    const data = { attributes: { ...values, channelId: currentChannelId, username } };
    try {
      await addMessageRequest({ data });
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
  }

  render() {
    const {
      handleSubmit, submitting, pristine, error,
    } = this.props;
    const renderedForm = (
      <form className="form-inline" onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group mx-3">
          <Field name="text" required disabled={submitting} component="input" type="text" />
        </div>
        <input type="submit" disabled={pristine || submitting} className="btn btn-primary btn-sm" value="Send" />
        {error && <div className="ml-3">{error}</div>}
      </form>
    );
    return renderedForm;
  }
}

export default reduxForm({
  form: 'msgForm',
})(FormAddMsg);
