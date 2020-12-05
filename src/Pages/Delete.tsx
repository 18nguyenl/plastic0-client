
import React from 'react';
import { message, Typography, Button, Form, Input, Table, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface IProps { }
interface IState {
    fname: String;
    lname: String;
    ssn: Number;
}

class Delete extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            fname: "",
            lname: "",
            ssn: 0,
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        fetch(`http://localhost:3001/delete?fname=${this.state.fname}&lname=${this.state.lname}\&ssn=${this.state.ssn}`, {
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
           <p>Fire an employee</p>
            <Form
                wrapperCol={{ span: 4 }}
                name="relevant-product-info"
                onFinish={this.onSubmit}
                onValuesChange={(changedValues, allValues) => {
                    console.log(allValues)
                    this.setState({
                        fname: allValues.fname,
                        lname: allValues.lname,
                        ssn: allValues.ssn,
                    })
                }}
            >
                <Input.Group>
                    <Form.Item
                        label="First Name"
                        name="fname"
                        rules={[{ required: true, message: 'Please input an employee first name'}]}>                            
                            <Input />
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="lname"
                        rules={[{ required: true, message: 'Please input an employee last name'}]}>                            
                            <Input />
                    </Form.Item>
                </Input.Group>
                <Form.Item
                    label="SSN"
                    name="ssn"
                    rules={[{ required: true, message: 'Please input an employee SSN'}]}>                            
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