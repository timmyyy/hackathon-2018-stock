import './header.css';
import React from 'react';
import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';
import { Brand } from './header-components';
import { AdminMenu, AccountMenu, EntitiesMenu } from './menus';
import { PerformerMenu } from 'app/shared/layout/header/menus/performer';
import { EmployeeRole } from 'app/shared/model/employee.model';
import { NewLink } from 'app/shared/layout/header/header-components';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  login: any;
  employees: any;
  getEmployees: any;
}

export interface IHeaderState {
  menuOpen: boolean;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    menuOpen: false
  };

  componentDidUpdate(prevProps) {
    prevProps.login != this.props.login && this.props.getEmployees();
  }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  render() {
    const { login, isAuthenticated, isAdmin, isSwaggerEnabled, isInProduction, employees } = this.props;
    const employee = employees && (employees.find(item => item.username.toLocaleLowerCase() === login) || {}).role;
    const isPerformer = employee == EmployeeRole.PERFORMER;
    const isCustomer = employee == EmployeeRole.CUSTOMER;

    return (
      <div id="app-header">
        <LoadingBar className="loading-bar" />
        <Navbar dark expand="sm" fixed="top" className="jh-navbar">
          <NavbarToggler aria-label="Menu" onClick={this.toggleMenu} />
          <Brand />
          <Collapse isOpen={this.state.menuOpen} navbar>
            <Nav id="header-tabs" className="ml-auto" navbar>
              {/*<Home />*/}
              {isAuthenticated && isPerformer && <NewLink to="/performer" title={'Мой профиль'} icon={'list'} />}
              {isAuthenticated && !isPerformer && <NewLink to="/customer" title={'Мой профиль'} icon={'list'} />}
              {isAuthenticated && isPerformer && <PerformerMenu />}
              {isAuthenticated && isAdmin && <EntitiesMenu />}
              {isAuthenticated && isAdmin && <AdminMenu showSwagger={isSwaggerEnabled} showDatabase={!isInProduction} />}
              <AccountMenu isAuthenticated={isAuthenticated} />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
