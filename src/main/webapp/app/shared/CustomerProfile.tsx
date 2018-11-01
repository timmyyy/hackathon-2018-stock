import React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, BreadcrumbItem, Col, Row } from 'reactstrap';

export class CustomerProfile extends React.Component {
  render() {
    const { profile } = this.props;

    return (
      <Row>
        <Col md={12}>
          <h2>Профиль заказчика</h2>
          <Breadcrumb>
            <BreadcrumbItem>
              <a href="#">Главная</a>
            </BreadcrumbItem>
            <BreadcrumbItem active>Профиль заказчика</BreadcrumbItem>
          </Breadcrumb>
        </Col>
        <Col md={4}>
          <img src="https://png.icons8.com/color/1600/circled-user-male-skin-type-1-2.png" style={{ width: '100%' }} />
        </Col>
        <Col md={8}>
          <h4>ФИО:</h4>
          <p>{profile.fio}</p>
          <h4>Должность:</h4>
          <p>{profile.rank}</p>
          <h4>Организация:</h4>
          <p>{profile.organization}</p>
          <h4>Департамент:</h4>
          <p>{profile.department}</p>
          <h4>Номер мобильного телефона:</h4>
          <p>{profile.mobilePhone}</p>
          <h4>Рабочий адрес:</h4>
          <p>{profile.workAddress}</p>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  profile: {
    fio: 'Иванов Иван Иванович',
    organization: 'СберТех',
    rank: 'Руководитель',
    department: 'Департамент развития фронтальных систем',
    mobilePhone: '+7 923 443-44-33',
    workAddress: 'Кутузовский пр-т 32, корпус 1'
  }
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerProfile);
