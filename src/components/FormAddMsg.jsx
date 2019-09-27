import React from 'react';
import {
  Field, reduxForm, formValueSelector,
} from 'redux-form';
import TextareaAutosize from 'react-autosize-textarea';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import connect from '../connect';
import { UserContext } from '../lib';

const mapStateToProps = state => ({
  text: formValueSelector('msgForm')(state, 'text'),
});

@reduxForm()
@connect(mapStateToProps)
class FormAddMsg extends React.Component {
  static contextType = UserContext;

  handleKeydown = (key, e) => {
    const {
      text, reset, submit, change,
    } = this.props;
    switch (key) {
      case 'enter': {
        e.preventDefault();
        submit('msgForm');
        reset();
        break;
      }
      case 'ctrl+enter': {
        change('msgForm', 'text', `${text}\n`);
        break;
      }
      default: break;
    }
  }

  renderField = ({
    input, meta: { error },
  }) => (
    <KeyboardEventHandler
      className="w-100"
      handleKeys={['ctrl+enter', 'enter']}
      onKeyEvent={this.handleKeydown}
    >
      <TextareaAutosize
        rows={2}
        className="flex-fill pre-scrollable w-100"
        {...input}
      />
      {(error && <small className="position-absolute fixed-bottom pl-3 text-info">{error}</small>)}
    </KeyboardEventHandler>
  );

  render() {
    const {
      submitting, error,
    } = this.props;
    const renderedForm = (
      <form className="form-inline align-items-end px-3 pb-3">
        <div className="w-100 d-flex">
          <Field name="text" required disabled={submitting} component={this.renderField} />
        </div>
        {error && <small className="position-absolute fixed-bottom pl-3 text-info">{error}</small>}
      </form>
    );
    return renderedForm;
  }
}

export default FormAddMsg;
