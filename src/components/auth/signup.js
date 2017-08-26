import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const renderField = ({ input, label, type, meta: { touched, error }}) =>
  <div className="form-group">
    <label>
      {label}
    </label>
    <div>
      <input {...input} type={type} className="form-control"/>
      {touched && error && <span className="alert">{error}</span>}
    </div>
  </div>

class Signup extends Component {
  handleFormSubmit(formProps) {
    // call action creater to sign up the user
    this.props.signupUser(formProps);
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
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="email" type="email" component={renderField} label="Email:" />
        <Field name="password" type="password" component={renderField} label="Password:" />
        <Field name="passwordConfirm" type="password" component={renderField} label="Confirm Password:" />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up</button>
      </form>
    );
  }
}

const validate = formProps => {
  const errors = {};
  if (!formProps.email) {
    errors.email = "Please enter an email";
  }
  if (!formProps.password) {
    errors.password = "Please enter a password";
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = "Please enter a password confirm";
  }
  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Password must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const reduxFormSignup = reduxForm({
  form: 'signup',
  validate
})(Signup);

export default connect(mapStateToProps, actions)(reduxFormSignup);
