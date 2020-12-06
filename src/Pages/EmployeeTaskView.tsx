
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
    isTask: Boolean;
    fname: String;
    statid: Number;
    data: Array<IEmployee>;
}

const tableColumnsTask = [
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

const tableColumnsName = [
    {
        title: 'First Name',
        dataIndex: 'Fname',
        key: 'Fname',
        render: (text: String) => <Text strong>{text}</Text>
    },
    {
        title: 'Station ID',
        dataIndex: 'StatID',
        key: 'StatID',
    },
];

class EmployeeTaskView extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            fname: "",
            statid: 0,
            isTask: true,
            type: "task",
            data: [],
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        if (this.state.isTask) {
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
            fetch(`http://localhost:3001/display/name?fname=${this.state.fname}&statid=${this.state.statid}`, {
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
        }
    }

    render() {
        return <div className="site-layout-content">
            <Title>View Employee Tasks</Title>
            <Title level={2}>These are display operations</Title>
            <p>For display, enter the employee name, and it will display all the tasks performed, how long they took, the dates</p>
            <p>For the next display, you can add information for a new task that was completed.</p>
            <Radio.Group value={this.state.type} onChange={(e) => {
                this.setState({
                    type: e.target.value === "task" ? "task" : "name",
                    isTask: e.target.value === "task" ? true : false
                });
            }}>
                <Radio.Button value="task">Task</Radio.Button>
                <Radio.Button value="name">Name</Radio.Button>
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
                        statid: allValues.statid,
                    })
                }}
            >
                <Form.Item
                    label="First Name"
                    name="fname"
                    rules={[{ required: this.state.isTask ? true : false, message: 'Please enter an employee\'s first name' }]}>
                    <Input disabled={ this.state.isTask ? false : true }/>
                </Form.Item>
                <Form.Item
                    label="Station ID"
                    name="statid"
                    rules={[{ required: this.state.isTask ? false : true, message: 'Please enter a station ID' }]}>
                    <InputNumber min={0} disabled={this.state.isTask ? true : false} />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary" icon={<CheckOutlined />}>Submit</Button>
                </Form.Item>
            </Form>
            <Table<IEmployee> columns={this.state.isTask ? tableColumnsTask : tableColumnsName} dataSource={this.state.data} />
        </div>;
    }
}

export default EmployeeTaskView;