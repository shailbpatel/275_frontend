import React, { useState } from "react";
import moment from "moment";
import {
  Table,
  Button,
  Modal,
  Col,
  Card,
  Statistic,
  Row,
  Typography,
} from "antd";
import "./styles.css";

const AttendanceReport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [meetRate, setMeetRate] = useState("0");
  const [complianceRate, setComplianceRate] = useState("0");
  const [additionalSeats, setAdditionalSeats] = useState("0");

  const showModal = (week) => {
    setModalTitle(
      <Typography style={{ fontWeight: "bold", fontSize: "16px" }}>
        Attendance Report for week {week.key} ({week.from} to {week.to})
      </Typography>
    );
    setMeetRate("87");
    setComplianceRate("80");
    setAdditionalSeats("20");
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Week",
      dataIndex: "week",
      key: "week",
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
    },
  ];

  const data = [];
  let startOfWeek = moment().startOf("isoWeek");

  for (let i = 1; i <= 10; i++) {
    const from = startOfWeek.format("MM/DD/YYYY");
    const to = startOfWeek.clone().add(4, "days").format("MM/DD/YYYY");
    const key = i;

    const week = {
      key: key,
      week: (
        <Button
          type="primary"
          shape="round"
          onClick={() => showModal({ from, to, key })}
        >
          <b>Week {i}</b>
        </Button>
      ),
      from,
      to,
    };

    data.push(week);
    startOfWeek.add(1, "week");
  }

  const App = () => (
    <>
      <Modal
        title={modalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Card bordered={false} className="my-card">
              <Statistic
                title={
                  <Typography style={{ fontWeight: "600" }}>
                    Overall Attendance Meet Rate
                  </Typography>
                }
                value={meetRate}
                precision={2}
                valueStyle={{
                  color: "#3f8600",
                  fontWeight: "500",
                }}
                titleStyle={{
                  fontWeight: "bold", // set the desired font weight value for the title
                }}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title={
                  <Typography style={{ fontWeight: "600" }}>
                    Employee Compliance Rate
                  </Typography>
                }
                value={complianceRate}
                precision={2}
                valueStyle={{
                  color: "#3f8600",
                  fontWeight: "500",
                }}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title={
                  <Typography style={{ fontWeight: "600" }}>
                    Number of Additional Seats
                  </Typography>
                }
                value={additionalSeats}
                valueStyle={{
                  color: "#3f8600",
                  fontWeight: "500",
                }}
              />
            </Card>
          </Col>
        </Row>
      </Modal>
      <div className="attendance_report_tbl">
        <div className="title">
          <h3>Attendance Reporting Dashboard</h3>
          <h5>(Pick a week from below list)</h5>
        </div>

        <div>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </>
  );

  return <App />;
};

export default AttendanceReport;
