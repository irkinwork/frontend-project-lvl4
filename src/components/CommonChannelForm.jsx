import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { validateChannel } from '../lib';

const renderField = ({
  input, label, type, meta: { touched, error },
}) => (
  <div className="d-flex flex-fill flex-column">
    <input {...input} placeholder={label} type={type} className="p-1" />
    {touched && (error && <small className="text-info">{error}</small>)}
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
  validate = (name) => {
    const { channelsNames } = this.props;
    return validateChannel(name, channelsNames);
  };

  render() {
    const {
      submitting, error, handleSubmit,
    } = this.props;
    const renderedForm = (
      <form className="form-inline align-items-baseline" onSubmit={handleSubmit}>
        <div className="w-100 d-flex">
          <Field name="name" required disabled={submitting} component={renderField} type="text" validate={this.validate} />
        </div>
        {error && <div className="text-info mt-1">{error}</div>}
      </form>
    );
    return renderedForm;
  }
}

export default reduxForm()(CommonChannelForm);
