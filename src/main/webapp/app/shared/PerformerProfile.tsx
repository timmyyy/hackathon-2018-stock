import React from "react";
import { connect } from "react-redux";
import { Breadcrumb, BreadcrumbItem, Col, Row } from "reactstrap";

export class PerformerProfile extends React.Component {
  render () {
    const { profile } = this.props;

    return (
      <Row>
        <Col md={12}>
          <h2>Профиль исполнителя</h2>
          <Breadcrumb>
            <BreadcrumbItem><a href="#">Главная</a></BreadcrumbItem>
            <BreadcrumbItem active>Профиль исполнителя</BreadcrumbItem>
          </Breadcrumb>
        </Col>
        <Col md={4}>
          <img src="https://picsum.photos/200/200" style={{ width: "100%" }}/>
        </Col>
        <Col md={8}>
          <h4>ФИО:</h4>
          <p>{profile.fio}</p>
          <h4>Должность:</h4>
          <p>{profile.rank}</p>
          <h4>Рабочие навыки:</h4>
          <p style={{ display: "table" }}>{profile.skills.map ( skill => {
            switch ( skill ) {
              case "Java":
                return <JavaIcon/>;

              case "JavaScript":
                return <JavaScriptIcon/>;

              case "Angular":
                return <AngularIcon/>;

              case "Django":
                return <DjangoIcon/>;

              case "React":
                return <ReactIcon/>;
            }
          } )}</p>
          <h4>Выполненные задачи:</h4>
          <ul>
            {profile.completedTasks.map(item => <li><a href="">{ item.title }</a></li>)}
          </ul>
          <h4 style={{ clear: "both" }}>Организация:</h4>
          <p>{profile.organization}</p>
          <h4>Департамент:</h4>
          <p>{profile.department}</p>
          <h4>Номер мобильного телефона:</h4>
          <p>{profile.mobilePhone}</p>
          <h4>Страна:</h4>
          <p>{profile.country}</p>
          <h4>Город</h4>
          <p>{profile.city}</p>
          <h4>Рабочий адрес:</h4>
          <p>{profile.workAddress}</p>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  profile: {
    fio: "Иванов Иван Иванович",
    organization: "СберТех",
    rank: "Главный инженер",
    department: "Департамент развития фронтальных систем",
    mobilePhone: "+7 923 443-44-33",
    country: "Россия",
    city: "Москва",
    workAddress: "Кутузовский пр-т 32, корпус 1",
    skills: [
      "Java",
      "Angular",
      "JavaScript",
      "Django",
      "React"
    ],
    completedTasks: [
      { title: "Интеграция с ФП 'История операций'" },
      { title: "Разработка модуля конверсии" },
      { title: "Реалиация адаптера для КСШ" }
    ]
  }
});

const mapDispatchToProps = {};

export default connect ( mapStateToProps, mapDispatchToProps ) ( PerformerProfile );

const JavaIcon = () => {
  return (
    <div style={{ width: 30, float: "left", margin: "0 5px 0 0" }}>
      <svg viewBox="0 0 128 128">
        <path fill="#0074BD"
              d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zM44.629 84.455s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"></path>
        <path fill="#EA2D2E"
              d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"></path>
        <path fill="#0074BD"
              d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zM90.609 93.041c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"></path>
        <path fill="#EA2D2E"
              d="M76.491 1.587s12.968 12.976-12.303 32.923c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815 8.548-12.834 32.229-19.059 26.998-39.667z"></path>
        <path fill="#0074BD"
              d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"></path>
      </svg>
    </div>
  );
};

const JavaScriptIcon = () => {
  return (
    <div style={{ width: 30, float: "left", margin: "0 5px 0 0" }}>
      <svg viewBox="0 0 128 128">
        <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185h-125.184z"></path>
        <path fill="#323330"
              d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zm-46.885-37.793h-11.709l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"></path>
      </svg>
    </div>
  );
};

const AngularIcon = () => {
  return (
    <div style={{ width: 30, float: "left", margin: "0 5px 0 0" }}>
      <svg viewBox="0 0 128 128">
        <path fill="#B3B3B3"
              d="M63.81 1.026l-59.257 20.854 9.363 77.637 49.957 27.457 50.214-27.828 9.36-77.635z"></path>
        <path fill="#A6120D" d="M117.536 25.998l-53.864-18.369v112.785l45.141-24.983z"></path>
        <path fill="#DD1B16" d="M11.201 26.329l8.026 69.434 44.444 24.651v-112.787z"></path>
        <path fill="#F2F2F2"
              d="M78.499 67.67l-14.827 6.934h-15.628l-7.347 18.374-13.663.254 36.638-81.508 14.827 55.946zm-1.434-3.491l-13.295-26.321-10.906 25.868h10.807l13.394.453z"></path>
        <path fill="#B3B3B3"
              d="M63.671 11.724l.098 26.134 12.375 25.888h-12.446l-.027 10.841 17.209.017 8.042 18.63 13.074.242z"></path>
      </svg>
    </div>
  );
};

const DjangoIcon = () => {
  return (
    <div style={{ width: 30, float: "left", margin: "0 5px 0 0" }}>
      <svg viewBox="0 0 128 128">
        <path fill="#003A2B"
              d="M126.5 83.8c0 3.8-3.1 6.9-6.9 6.9h-111.2c-3.8 0-6.9-3.1-6.9-6.9v-39.6c0-3.8 3.1-6.9 6.9-6.9h111.2c3.8 0 6.9 3.1 6.9 6.9v39.6z"></path>
        <path fill="#fff"
              d="M23 45.6h6v27.4c-3 .6-5.3.8-7.7.8-7.2 0-11-3.3-11-9.5 0-6 4-10 10.2-10 1 0 1.7.1 2.6.3v-9h-.1zm0 13.8c-.7-.2-1.3-.3-2-.3-3 0-4.7 1.8-4.7 5.1 0 3.2 1.7 4.9 4.7 4.9.7 0 1.2 0 2-.2v-9.5zM38.4 54.8v13.7c0 4.7-.3 7-1.4 9-1 1.9-2.2 3.1-4.8 4.4l-5.5-2.6c2.6-1.2 3.9-2.3 4.7-4 .8-1.7 1.1-3.7 1.1-8.8v-11.7h5.9zm-5.9-9.1h5.9v6.1h-5.9v-6.1zM42 56.1c2.6-1.2 5.1-1.8 7.8-1.8 3 0 5 .8 5.9 2.4.5.9.7 2 .7 4.5v12c-2.7.4-6 .7-8.5.7-5 0-7.2-1.7-7.2-5.6 0-4.2 3-6.1 10.2-6.7v-1.3c0-1.1-.5-1.5-2-1.5-2.2 0-4.7.6-7 1.8v-4.5h.1zm9.2 9.4c-3.9.4-5.2 1-5.2 2.5 0 1.2.7 1.7 2.3 1.7.9 0 1.7-.1 2.8-.3v-3.9h.1zM59.3 55.7c3.5-.9 6.4-1.3 9.3-1.3 3 0 5.2.7 6.5 2 1.2 1.3 1.6 2.7 1.6 5.6v11.6h-5.9v-11.4c0-2.3-.8-3.1-2.9-3.1-.8 0-1.5.1-2.7.4v14.1h-5.9v-17.9zM79 76.8c2.1 1.1 4.2 1.6 6.3 1.6 3.9 0 5.5-1.6 5.5-5.3v-.1c-1.2.6-2.3.8-3.8.8-5.2 0-8.5-3.4-8.5-8.8 0-6.7 4.9-10.5 13.5-10.5 2.5 0 4.9.3 7.7.8l-2 4.3c-1.6-.3-.1 0-1.3-.2v.6l.1 2.5v3.2c0 .8 0 1.6.1 2.4v1.6c0 5.1-.4 7.5-1.7 9.4-1.8 2.9-5 4.3-9.6 4.3-2.3 0-4.3-.3-6.4-1.2v-5.4h.1zm11.8-17.6h-.6000000000000001c-1.2 0-2.5.3-3.4.8-1.4.8-2.2 2.3-2.2 4.3 0 3 1.5 4.7 4.1 4.7.8 0 1.5-.2 2.2-.4v-9.4h-.1zM109 54.3c5.9 0 9.5 3.7 9.5 9.8 0 6.2-3.8 10.1-9.8 10.1-5.9 0-9.6-3.7-9.6-9.7.1-6.3 3.9-10.2 9.9-10.2zm-.1 15c2.3 0 3.6-1.9 3.6-5.2 0-3.2-1.3-5.2-3.6-5.2s-3.7 1.9-3.7 5.2c.1 3.4 1.4 5.2 3.7 5.2z"></path>
      </svg>
    </div>
  );
};

const ReactIcon = () => {
  return (
    <div style={{ width: 30, float: "left", margin: "0 5px 0 0" }}>
      <svg viewBox="0 0 128 128">
        <path
          d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3-12.5 4.8-19.3 11.4-19.3 18.8s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zm-14.8-30.5c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zm-11.2 59.3c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zm-25.6 27.1c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zm25.6-27.1c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zm-54.5-16.2c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zm-24.7 29c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5-13.8-4-22.1-10-22.1-15.6zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zm60.8-20.3c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z"></path>
      </svg>
    </div>
  );
};
