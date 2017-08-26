import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const renderInput = field =>   // Define stateless component to render input and errors
  <fieldset>
    <input {...field.input} type={field.type} className="form-control"/>
  </fieldset>

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    // Need to do something to log user in
    this.props.signinUser({ email, password});
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field
            name="email"                   // Specify field name
            component={renderInput}        // Specify render component above
            type="email"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field
            name="password"                   // Specify field name
            component={renderInput}           // Specify render component above
            // "type" prop passed to renderInput
            type="password"/>
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const reduxFormSignin = reduxForm({
  form: 'signin'
})(Signin);

export default connect(mapStateToProps, actions)(reduxFormSignin);
