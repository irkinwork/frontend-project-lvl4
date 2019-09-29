import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

const renderField = ({
  input, label, type, meta: { touched, error },
}) => (
  <div className="d-flex flex-fill flex-column w-100">
    <input {...input} placeholder={label} type={type} className="p-1" />
    {touched && (error && <small className="text-info">{error}</small>)}
  </div>
);

const mapStateToProps = state => ({
  channelsNames: Object.values(state.channels.byId).map(item => item.name),
});

@reduxForm()
@connect(mapStateToProps)
class CommonChannelForm extends React.PureComponent {
  render() {
    const {
      submitting, error, handleSubmit,
    } = this.props;
    const renderedForm = (
      <form className="form-inline align-items-baseline" onSubmit={handleSubmit}>
        <Field name="name" required disabled={submitting} component={renderField} type="text" />
        {error && <small className="text-info mt-1">{error}</small>}
      </form>
    );
    return renderedForm;
  }
}

export default CommonChannelForm;
