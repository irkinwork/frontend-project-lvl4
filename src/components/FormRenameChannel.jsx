import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../actions';
import { validate } from '../lib';

const renderField = ({
  input, type, meta: { touched, error, warning },
}) => (
  <div>
    <div>
      <input {...input} type={type} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const mapStateToProps = (state) => {
  const props = {
    channelsNames: Object.values(state.channels.byId).map(item => item.name),
    type: state.modal.type,
    value: state.modal.props.value,
  };
  return props;
};

const actionCreators = {
  renameChannelRequest: actions.renameChannelRequest,
  hideModal: actions.hideModal,
};
@connect(mapStateToProps, actionCreators)
class FormRenameChannel extends React.Component {
  handleSubmit = async (values) => {
    const { id } = this.props;
    const { renameChannelRequest } = this.props;
    const data = { attributes: { ...values } };
    try {
      await renameChannelRequest(id, { data });
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
  }

  wrappedValidate = (value) => {
    const { channelsNames, initialValues: { name: initialName } } = this.props;
    const channelsNamesWithoutInitial = channelsNames.filter(item => item !== initialName);
    return validate(value, channelsNamesWithoutInitial, initialName);
  };

  render() {
    const {
      handleSubmit, submitting, pristine, error,
      refSubmit,
    } = this.props;
    const renderedForm = (
      <form className="form-inline" onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group mx-3">
          <Field label="Rename channel" name="name" required disabled={submitting} component={renderField} type="text" validate={this.wrappedValidate} />
        </div>
        <input ref={refSubmit} type="submit" disabled={pristine || submitting} className="btn btn-primary btn-sm" value="Rename" />
        {error && <div className="ml-3">{error}</div>}
      </form>
    );
    return renderedForm;
  }
}

export default reduxForm({
  form: 'renameChannelForm',
})(FormRenameChannel);
