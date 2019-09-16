import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { validateChannel } from '../lib';

const renderField = ({
  input, label, type, meta: { touched, error },
}) => (
  <div className="d-flex flex-fill flex-column">
    <input {...input} placeholder={label} type={type} className="p-1" />
    {touched && (error && <small>{error}</small>)}
  </div>
);

const mapStateToProps = (state) => {
  const props = {
    channelsNames: Object.values(state.channels.byId).map(item => item.name),
  };
  return props;
};

@connect(mapStateToProps)
class CommonChannelForm extends React.PureComponent {
  handleSubmit = async (values) => {
    const { doAction, reset, id } = this.props;
    const data = { attributes: { ...values } };
    try {
      await doAction({ data }, id);
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
  }

  validate = (name) => {
    const { channelsNames } = this.props;
    return validateChannel(name, channelsNames);
  };

  render() {
    const {
      handleSubmit, submitting, pristine, error, refSubmit, okText,
    } = this.props;
    const renderedForm = (
      <form className="form-inline align-items-baseline" onSubmit={handleSubmit(this.handleSubmit)}>
        <Field label="Add channel" name="name" required disabled={submitting} component={renderField} type="text" validate={this.validate} />
        <input ref={refSubmit} type="submit" disabled={pristine || submitting} className="btn btn-primary flex-shrink-0" value={okText} />
        {error && <div className="ml-3">{error}</div>}
      </form>
    );
    return renderedForm;
  }
}

export default reduxForm()(CommonChannelForm);
