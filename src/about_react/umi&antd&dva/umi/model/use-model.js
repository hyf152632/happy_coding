import { connect } from "dva";
import { Table, Pagination, Popconfirm } from "antd";
import styles from "./Users.css";
import { PAGE_SIZE } from "../constants";

//此处试一下 装饰器 用法 (装饰器必须用在 class 前面)
@connect(({users, loading}) => ({
  profile,
  loading: loading.effects['users/fetch']
}))
function Users({ list: dataSource, total, page: current }) {
  function deleteHandler(id) {
    console.warn(`TODO: ${id}`);
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: text => <a href="">{text}</a>
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website"
    },
    {
      title: "Operation",
      key: "operation",
      render: (text, { id }) => (
        <span className={styles.operation}>
          <a href="">Edit</a>
          <Popconfirm
            title="Confirm to delete?"
            onConfirm={deleteHandler.bind(null, id)}
          >
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      )
    }
  ];
  return (
    <div className={styles.normal}>
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
        />
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  const { list, total, page } = state.users;
  // loading: state.loading.models.users,
  return {
    list,
    total,
    page
  };
}
export default connect(mapStateToProps)(Users);
