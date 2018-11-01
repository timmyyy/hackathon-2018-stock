import React from 'react';
import { DropdownItem } from 'reactstrap';
import { NewLink } from 'app/shared/layout/header/header-components';

export const PerformerMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NewLink to="/entity/tasks-profile-performer" title={'Задачи'} icon={'list'} />
);
