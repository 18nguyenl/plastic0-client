
import React from 'react';
import { message, Typography, Button, Form, Input, Table, InputNumber, DatePicker, Radio } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface IEmployee {
    FName: String;
    Hours: Number;
    Date: String;
}
interface IProps { }
interface IState {
    type: String;
    isDisplay: Boolean;
    fname: String;
    prevdate: String;
    currdate: String;
    statid: Number;
    data: Array<IEmployee>;
}

const tableColumns = [
    {
        title: 'First Name',
        dataIndex: 'Fname',
        key: 'Fname',
        render: (text: String) => <Text strong>{text}</Text>
    },
    {
        title: 'Hours',
        dataIndex: 'Hours',
        key: 'Hours',
    },
    {
        title: 'Date',
        dataIndex: 'Date',
        key: 'Date',
    },
];

class EmployeeTaskView extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            fname: "",
            prevdate: "",
            currdate: "",
            statid: 0,
            isDisplay: true,
            type: "display",
            data: [],
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        if (this.state.isDisplay) {
            fetch("http://localhost:3001/display/employee?fname=" + this.state.fname, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .then((res) => {
                    console.log(res);

                    this.setState({
                        data: res
                    })

                    message.success("Search successful!");
                })
        } else {
            fetch(`http://localhost:3001/update/task`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fname: this.state.fname,
                    prevdate: this.state.prevdate,
                    currdate: this.state.currdate,
                    statid: this.state.statid,
                })
            }).then(res => res.json())
                .then((res) => {
                    console.log(res);

                    if (res.changedRows > 0) {
                        message.success("Update success!");
                        message.info(`Updated ${res.changedRows} rows`);
                    } else {
                        message.warning("Nothing updated");
                    }
                })
        }
    }

    render() {
        return <div className="site-layout-content">
            <Title>Manage Employee Tasks</Title>
            <Title level={2}>There are update and display operations</Title>
            <p>For display, enter the employee name, and it will display all the tasks performed, how long they took, the dates</p>
            <p>For update, you can update the old date the task was completed to the new date by entering the old date, and the station ID where the task was done, and who did the task.</p>
            <Radio.Group value={this.state.type} onChange={(e) => {
                this.setState({
                    type: e.target.value === "display" ? "display" : "update",
                    isDisplay: e.target.value === "display" ? true : false
                });
            }}>
                <Radio.Button value="display">Display</Radio.Button>
                <Radio.Button value="update">Update</Radio.Button>
            </Radio.Group>

            <br />
            <br />
            <Form
                wrapperCol={{ span: 4 }}
                name="relevant-product-info"
                onFinish={this.onSubmit}
                onValuesChange={(changedValues, allValues) => {
                    console.log(allValues)
                    this.setState({
                        fname: allValues.fname,
                        prevdate: allValues.prevdate,
                        currdate: allValues.currdate,
                        statid: allValues.statid,
                    })
                }}
            >
                <Form.Item
                    label="First Name"
                    name="fname"
                    rules={[{ required: true, message: 'Please enter an employee\'s first name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Previous Task Date"
                    name="prevdate"
                    rules={[{ required: this.state.isDisplay ? false : true, message: 'Please input a date' }]}>
                    <DatePicker format="YYYY-MM-DD" disabled={this.state.isDisplay ? true : false} />
                </Form.Item>
                <Form.Item
                    label="Current Task Date"
                    name="currdate"
                    rules={[{ required: this.state.isDisplay ? false : true, message: 'Please input a date' }]}>
                    <DatePicker format="YYYY-MM-DD" disabled={this.state.isDisplay ? true : false} />
                </Form.Item>
                <Form.Item
                    label="Station ID"
                    name="statid"
                    rules={[{ required: this.state.isDisplay ? false : true, message: 'Please enter a station ID' }]}>
                    <InputNumber min={0} disabled={this.state.isDisplay ? true : false} />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary" icon={<CheckOutlined />}>Submit</Button>
                </Form.Item>
            </Form>
            <Table<IEmployee> columns={tableColumns} dataSource={this.state.data} />
        </div>;
    }
}

export default EmployeeTaskView;