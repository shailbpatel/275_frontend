import React from "react";
import moment from "moment";
import { Space, Table, Tag } from "antd";
import "./styles.css";

const ComplianceCheck = () => {
  const columns = [
    {
      title: "Week",
      dataIndex: "week",
      key: "week",
    },
    {
      title: "Mon",
      dataIndex: "mon",
      key: "mon",
      render: (_, { mon }) => moment(mon).format("MM/DD/YYYY"),
    },
    {
      title: "Tue",
      dataIndex: "tue",
      key: "tue",
      render: (_, { tue }) => moment(tue).format("MM/DD/YYYY"),
    },
    {
      title: "Wed",
      dataIndex: "wed",
      key: "wed",
      render: (_, { wed }) => moment(wed).format("MM/DD/YYYY"),
    },
    {
      title: "Thu",
      dataIndex: "thu",
      key: "thu",
      render: (_, { thu }) => moment(thu).format("MM/DD/YYYY"),
    },
    {
      title: "Fri",
      dataIndex: "fri",
      key: "fri",
      render: (_, { fri }) => moment(fri).format("MM/DD/YYYY"),
    },
    {
      title: "GTD",
      dataIndex: "gtd",
      key: "gtd",
      render: (_, { gtd }) => (
        <Tag color={gtd === "yes" ? "green" : "red"}>{gtd}</Tag>
      ),
    },
    {
      title: "MOP",
      dataIndex: "mop",
      key: "mop",
      render: (_, { mop }) => (
        <Tag color={mop === "yes" ? "green" : "red"}>{mop}</Tag>
      ),
    },
    {
      title: "OCC",
      dataIndex: "occ",
      key: "occ",
      render: (_, { occ }) => (
        <Tag color={occ === "yes" ? "green" : "red"}>{occ}</Tag>
      ),
    },
    {
      title: "Preemptable",
      dataIndex: "preemptable",
      key: "preemptable",
      render: (_, { preemptable }) => (
        <Tag color={preemptable === "yes" ? "green" : "red"}>{preemptable}</Tag>
      ),
    },
  ];

  const data = [];
  let startOfWeek = moment().startOf("isoWeek");

  for (let i = 1; i <= 10; i++) {
    const week = `Week ${i}`;
    const mon = startOfWeek.format();
    const tue = startOfWeek.clone().add(1, "day").format();
    const wed = startOfWeek.clone().add(2, "days").format();
    const thu = startOfWeek.clone().add(3, "days").format();
    const fri = startOfWeek.clone().add(4, "days").format();

    const gtd = "no";
    const mop = "yes";
    const occ = gtd === "yes" && mop === "yes" ? "yes" : "no";
    const preemptable = occ === "yes" ? "yes" : "no";

    data.push({
      key: i,
      week,
      mon,
      tue,
      wed,
      thu,
      fri,
      gtd,
      mop,
      occ,
      preemptable,
    });

    startOfWeek.add(1, "week");
  }

  const App = () => (
    <div className="compliance_tbl">
      <h3 className="title">Compliance Check</h3>
      <Table columns={columns} dataSource={data} />
    </div>
  );

  return <App />;
};

export default ComplianceCheck;
