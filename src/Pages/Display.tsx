import React from 'react';
import { message, Typography, Button, Form, Input, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface IProduct {
    NameP: String;
    P_oz: Number;
    SName: String;
    SLoc: String;
}
interface IProps { }
interface IState {
    data: Array<IProduct>;
    pname: String;
}

const tableColumns = [
    {
        title: 'Product Name',
        dataIndex: 'NameP',
        key: 'NameP',
    },
    {
        title: 'Price per Oz.',
        dataIndex: 'P_oz',
        key: 'P_oz',
    },
    {
        title: 'Station Name',
        dataIndex: 'SName',
        key: 'SName',
    },
    {
        title: 'Station Location',
        dataIndex: 'SLoc',
        key: 'SLoc',
    },
];

class Display extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            data: [],
            pname: "",
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        fetch("http://localhost:3001/display?pname=" + this.state.pname, {
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

    render() {
        return <div className="site-layout-content">
            <Title>Display</Title>
            <h2>Relevant Product Information</h2>
            <p>
                <Text>Enter the name of a product to get some data about it.</Text>
            </p>
            <Form
                wrapperCol={{ span: 4 }}
                name="relevant-product-info"
                onFinish={this.onSubmit}
                onValuesChange={(changedValues, allValues) => {
                    this.setState({
                        pname: changedValues.pname
                    })
                }}
            >
                <Form.Item
                    label="Product Name"
                    name="pname"
                    rules={[{ required: true, message: 'Please input a product to search'}]}>                            
                        <Input />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary" icon={<SearchOutlined/>}>Search</Button>
                </Form.Item>
            </Form>
            <Table<IProduct> columns={tableColumns} dataSource={this.state.data} />
        </div>;
    }
}

export default Display;