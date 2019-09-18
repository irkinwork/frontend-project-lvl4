import React from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import autosize from 'autosize';
import * as actions from '../actions';
import { UserContext, validateMessage, makeValuesSafe } from '../lib';

const mapStateToProps = ({ currentChannel }) => ({ currentChannelId: currentChannel.id });

const actionCreators = {
  addMessageRequest: actions.addMessageRequest,
};

@connect(mapStateToProps, actionCreators)
class FormAddMsg extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.refTextarea = React.createRef();
    this.refSubmit = React.createRef();
  }

  componentDidMount() {
    autosize(this.refTextarea.current);
  }

  renderField = ({
    input, meta: { error },
  }) => (
    <>
      <textarea
        ref={this.refTextarea}
        className="flex-fill pre-scrollable w-100"
        {...input}
        onKeyDown={(e) => {
          const keysToResize = e.shiftKey || e.ctrlKey;
          if (e.key === 'Enter' && !keysToResize) {
            e.preventDefault();
            if (this.refTextarea.current.value.trim() !== '') {
              this.refSubmit.current.click();
              return;
            }
          }
          if (e.key === 'Enter' && keysToResize) {
            e.preventDefault();
            this.refTextarea.current.value = `${this.refTextarea.current.value}\n`;
            autosize.update(this.refTextarea.current);
          }
        }}
      />
      {(error && <small className="position-absolute fixed-bottom position-absolute pl-3 text-info">{error}</small>)}
    </>
  );

  handleSubmit = async (values) => {
    const username = this.context;
    const {
      addMessageRequest, reset, currentChannelId, refMessages,
    } = this.props;
    const date = format(new Date(), 'dd MMM yyyy hh:mm:ss');
    const safeValues = makeValuesSafe(values);
    const data = {
      attributes: {
        ...safeValues, channelId: currentChannelId, username, date,
      },
    };
    try {
      const cb = () => {
        refMessages.current.lastElementChild.scrollIntoView(false);
      };
      await addMessageRequest({ data }, cb);
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
    autosize.update(this.refTextarea.current);
  }

  render() {
    const {
      handleSubmit, submitting, pristine, error,
    } = this.props;
    const renderedForm = (
      <form className="form-inline align-items-end pr-3 pb-3 pl-3" onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="w-100 d-flex">
          <Field name="text" required disabled={submitting} validate={validateMessage} component={this.renderField} />
          <input
            hidden
            ref={this.refSubmit}
            type="submit"
            disabled={pristine || submitting}
          />
        </div>
        {error && <small className="position-absolute fixed-bottom position-absolute pl-3 text-info">{error}</small>}
      </form>
    );
    return renderedForm;
  }
}

export default reduxForm({
  form: 'msgForm',
})(FormAddMsg);
