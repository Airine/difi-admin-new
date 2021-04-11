import React, { useState } from 'react';
import { Form, Card, List, Button, Descriptions, Divider, Statistic, Input, Row, Col } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from '../../model';
import styles from './index.less';
import center from '@/pages/account/center';
import { Guide } from 'bizcharts';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const modes = [
  {
    id: 0,
    name: 'Guaranteed',
  },
  {
    id: 1,
    name: 'Standard',
  }
]

interface Step2Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
  submitting?: boolean;
}

const Step2: React.FC<Step2Props> = (props) => {
  const [form] = Form.useForm();
  const { data, dispatch, submitting } = props;

  const v = data?.guaranteed ? 0 : 1;

  const [gaurunteed, setGaurunteed] = useState(v);

  if (!data) {
    return null;
  }
  const { validateFields, getFieldsValue } = form;
  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'formAndstepForm/saveStepFormData',
        payload: {
          ...data,
          ...values,
        },
      });
      dispatch({
        type: 'formAndstepForm/saveCurrentStep',
        payload: 'info',
      });
    }
  };
  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'formAndstepForm/submitStepForm',
        payload: {
          ...data,
          ...values,
        },
      });
    }
  };

  const { addr, bandwidth, burst } = data;
  return (
    <Form
      {...formItemLayout}
      form={form}
      layout="horizontal"
      className={styles.stepForm}
      initialValues={{ privateKey: '0x8f517cca15c489177c4daa5faf12fc59338895f6e47a9a7448c60623f5687c9b' }}
    >
      <Descriptions column={1}>
        <Descriptions.Item label="Address"> {addr} </Descriptions.Item>
        <Descriptions.Item label="Bandwidth">
          {bandwidth > 1024 ?
            <p>{bandwidth/1024} Mbps</p> :
            <p>{bandwidth} Kbps</p>}
        </Descriptions.Item>
        <Descriptions.Item label="Burst">
          {burst > 1024 ?
          <p>{burst/1024} MB</p> :
          <p>{burst} KB</p>}
        </Descriptions.Item>
        {/* <Descriptions.Item label="转账金额">
          <Statistic value={amount} suffix="元" />
        </Descriptions.Item> */}
      </Descriptions>
      <Form.Item>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 1,
            lg: 1,
            xl: 1,
            xxl: 1,
          }}
          dataSource={modes}
          renderItem={(item)=>{
            console.log(item.id);
            console.log(gaurunteed);
            return (
              <List.Item key={item.id}>
                <Card 
                  className={item?.id == gaurunteed ? styles.selected : styles.unselected }
                  onClick={
                    ()=>{
                      data.guaranteed = item.id == 0
                      setGaurunteed(item.id);
                    }
                  }
                  hoverable>
                  <Row gutter={16} justify="space-around" align="middle">
                    <Col className="gutter-row" span={7}>
                      <h2>{item.name}</h2>
                    </Col>
                    <Col span={2}/>
                    <Col className="gutter-row" span={15}>
                      <p>Need to pay approximately:</p>
                      <p><b>1.56</b> per second</p>
                      {item.id == 0 ?
                      <p>Guaranteed to receive in full:</p>:
                      <p>Receive approximately:</p>
                      }
                      <p><b>{(data.bandwidth/1024).toFixed(2)}</b> Mbps + <b>{(data.burst/1024).toFixed(2)}</b> MB burst</p>
                    </Col>
                  </Row>
                </Card>
              </List.Item>
            );
          }}
        />
      </Form.Item>
      <Divider style={{ margin: '24px 0' }} />
      <Form.Item
        label="Private Key"
        name="privateKey"
        required={false}
        rules={[{ required: true, message: '需要支付密码才能进行支付' }]}
      >
        <Input type="password" autoComplete="off" style={{ width: '80%' }} />
      </Form.Item>
      <Form.Item
        style={{ marginBottom: 8 }}
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: {
            span: formItemLayout.wrapperCol.span,
            offset: formItemLayout.labelCol.span,
          },
        }}
      >
        <Button type="primary" onClick={onValidateForm} loading={submitting}>
          提交
        </Button>
        <Button onClick={onPrev} style={{ marginLeft: 8 }}>
          上一步
        </Button>
      </Form.Item>
    </Form>
  );
};
export default connect(
  ({
    formAndstepForm,
    loading,
  }: {
    formAndstepForm: StateType;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    submitting: loading.effects['formAndstepForm/submitStepForm'],
    data: formAndstepForm.step,
  }),
)(Step2);
