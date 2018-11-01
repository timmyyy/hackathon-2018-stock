import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { AvForm, AvField, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { Row, Col, Alert, Button } from 'reactstrap';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { IRootState } from 'app/shared/reducers';
import { handleRegister, reset } from './register.reducer';

export interface IRegisterProps extends StateProps, DispatchProps {}

export interface IRegisterState {
  password: string;
  role: string;
}

const ROLES = {
  PERFORMER: 'PERFORMER',
  CUSTOMER: 'CUSTOMER'
};

export class RegisterPage extends React.Component<IRegisterProps, IRegisterState> {
  state: IRegisterState = {
    password: '',
    role: ''
  };

  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (event, values) => {
    this.props.handleRegister(values.role, values.username, values.email, values.firstPassword, this.props.currentLocale);
    event.preventDefault();
  };

  updatePassword = event => {
    this.setState({ password: event.target.value });
  };

  onRadioChange = event => {
    this.setState({ role: event.target.value });
  };

  render() {
    const { role } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h1 id="register-title">
              <Translate contentKey="register.title">Registration</Translate>
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            <AvForm id="register-form" onValidSubmit={this.handleValidSubmit}>
              <AvRadioGroup name="role" label={translate('global.form.role.title')} required onChange={this.onRadioChange}>
                <AvRadio label={translate('global.form.role.customer')} value={ROLES.CUSTOMER} />
                <AvRadio label={translate('global.form.role.performer')} value={ROLES.PERFORMER} />
              </AvRadioGroup>

              {role && (
                <div>
                  <AvField
                    name="username"
                    label={translate('global.form.username')}
                    placeholder={translate('global.form.username.placeholder')}
                    validate={{
                      required: { value: true, errorMessage: translate('register.messages.validate.login.required') },
                      pattern: { value: '^[_.@A-Za-z0-9-]*$', errorMessage: translate('register.messages.validate.login.pattern') },
                      minLength: { value: 1, errorMessage: translate('register.messages.validate.login.minlength') },
                      maxLength: { value: 50, errorMessage: translate('register.messages.validate.login.maxlength') }
                    }}
                  />
                  <AvField
                    name="email"
                    label={translate('global.form.email')}
                    placeholder={translate('global.form.email.placeholder')}
                    type="email"
                    validate={{
                      required: { value: true, errorMessage: translate('global.messages.validate.email.required') },
                      minLength: { value: 5, errorMessage: translate('global.messages.validate.email.minlength') },
                      maxLength: { value: 254, errorMessage: translate('global.messages.validate.email.maxlength') }
                    }}
                  />
                  <AvField
                    name="firstPassword"
                    label={translate('global.form.newpassword')}
                    placeholder={translate('global.form.newpassword.placeholder')}
                    type="password"
                    onChange={this.updatePassword}
                    validate={{
                      required: { value: true, errorMessage: translate('global.messages.validate.newpassword.required') },
                      minLength: { value: 4, errorMessage: translate('global.messages.validate.newpassword.minlength') },
                      maxLength: { value: 50, errorMessage: translate('global.messaupdatePasswordges.validate.newpassword.maxlength') }
                    }}
                  />
                  <PasswordStrengthBar password={this.state.password} />
                  <AvField
                    name="secondPassword"
                    label={translate('global.form.confirmpassword')}
                    placeholder={translate('global.form.confirmpassword.placeholder')}
                    type="password"
                    validate={{
                      required: { value: true, errorMessage: translate('global.messages.validate.confirmpassword.required') },
                      minLength: { value: 4, errorMessage: translate('global.messages.validate.confirmpassword.minlength') },
                      maxLength: { value: 50, errorMessage: translate('global.messages.validate.confirmpassword.maxlength') },
                      match: { value: 'firstPassword', errorMessage: translate('global.messages.error.dontmatch') }
                    }}
                  />
                  <Button id="register-submit" color="primary" type="submit">
                    <Translate contentKey="register.form.button">Register</Translate>
                  </Button>
                </div>
              )}

              {role === ROLES.CUSTOMER && <div />}

              {role === ROLES.PERFORMER && <div />}
            </AvForm>
            <p>&nbsp;</p>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ locale }: IRootState) => ({
  currentLocale: locale.currentLocale
});

const mapDispatchToProps = { handleRegister, reset };
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
