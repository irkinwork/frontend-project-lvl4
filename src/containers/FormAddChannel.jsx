import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../actions';
import { validate } from '../lib';

const renderField = ({
  input, label, type, meta: { touched, error, warning },
}) => (
  <div>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const mapStateToProps = (state) => {
  const props = {
    channelsNames: Object.values(state.channels.byId).map(item => item.name),
    text: state.text,
  };
  return props;
};

const actionCreators = {
  addChannelRequest: actions.addChannelRequest,
};
@connect(mapStateToProps, actionCreators)
class FormAddChannel extends React.Component {
  handleSubmit = async (values) => {
    const { addChannelRequest, reset } = this.props;
    const data = { attributes: { ...values } };
    try {
      await addChannelRequest({ data });
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
  }

  wrappedValidate = (name) => {
    const { channelsNames } = this.props;
    return validate(name, channelsNames);
  };

  render() {
    const {
      handleSubmit, submitting, pristine, error,
    } = this.props;
    const renderedForm = (
      <form className="form-inline" onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group mx-3">
          <Field label="Add channel" name="name" required disabled={submitting} component={renderField} type="text" validate={this.wrappedValidate} />
        </div>
        <input type="submit" disabled={pristine || submitting} className="btn btn-primary btn-sm" value="Add" />
        {error && <div className="ml-3">{error}</div>}
      </form>
    );
    return renderedForm;
  }
}

export default reduxForm({
  form: 'addChannelForm',
})(FormAddChannel);
