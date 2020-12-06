
import React from 'react';
import { message, Typography, Button, Form, Input, Table, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface IProps { }
interface IState {
    pname: String;
    statid: Number;
}

class Delete extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            pname: "",
            statid: 0,
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        fetch(`http://localhost:3001/delete?pname=${this.state.pname}&statid=${this.state.statid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
        .then((res) => {
            console.log(res);

            if (res.affectedRows > 0) {
                message.success("Delete success!");
                message.info(`Deleted ${res.affectedRows} rows`);
            } else {
                message.warning("Nothing deleted");
            }
        })
    }

    render() {
        return <div className="site-layout-content">
           <Title>Delete</Title> 
           <p>Remove a product</p>
            <Form
                wrapperCol={{ span: 4 }}
                name="relevant-product-info"
                onFinish={this.onSubmit}
                onValuesChange={(changedValues, allValues) => {
                    console.log(allValues)
                    this.setState({
                        pname: allValues.pname,
                        statid: allValues.statid,
                    })
                }}
            >
                <Form.Item
                    label="Product Name"
                    name="pname"
                    rules={[{ required: true, message: 'Please input a product name'}]}>                            
                        <Input />
                </Form.Item>
                <Form.Item
                    label="Station ID"
                    name="statid"
                    rules={[{ required: true, message: 'Please input a station ID'}]}>                            
                        <InputNumber style={{ width: "60%" }} min={0} />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary" icon={<DeleteOutlined/>}>Delete</Button>
                </Form.Item>
            </Form>
        </div>;
    }
}

export default Delete;