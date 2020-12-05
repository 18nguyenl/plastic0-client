
import React from 'react';
import { message, Typography, Button, Form, Input, Table, InputNumber } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface IProps { }
interface IState {
    pname: String;
    oztotal: Number;
    statid: Number;
}

class Update extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            pname: "",
            oztotal: 0,
            statid: 0,
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        fetch(`http://localhost:3001/update?pname=${this.state.pname}&oztotal=${this.state.oztotal}\&statid=${this.state.statid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
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

    render() {
        return <div className="site-layout-content">
           <Title>Update</Title> 
           <p>Update the amount of oz in the station when there has been a refill done.</p>
            <Form
                wrapperCol={{ span: 4 }}
                name="relevant-product-info"
                onFinish={this.onSubmit}
                onValuesChange={(changedValues, allValues) => {
                    console.log(allValues)
                    this.setState({
                        pname: allValues.pname,
                        oztotal: allValues.oztotal,
                        statid: allValues.statid,
                    })
                }}
            >
                <Form.Item
                    label="Product Name"
                    name="pname"
                    rules={[{ required: true, message: 'Please input a product to search'}]}>                            
                        <Input />
                </Form.Item>
                <Input.Group>
                    <Form.Item
                        label="Amount of OZ Filled"
                        name="oztotal"
                        rules={[{ required: true, message: 'Please input an amount of oz filled'}]}>                            
                            <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item
                        label="Station ID"
                        name="statid"
                        rules={[{ required: true, message: 'Please input a product to search'}]}>                            
                            <InputNumber min={0} />
                    </Form.Item>
                </Input.Group>
                <Form.Item>
                    <Button htmlType="submit" type="primary" icon={<ArrowUpOutlined/>}>Update</Button>
                </Form.Item>
            </Form>
        </div>;
    }
}

export default Update;