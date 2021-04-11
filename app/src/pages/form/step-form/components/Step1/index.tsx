import React from 'react';
import { Form, List, Divider, Card, Typography } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from '../../model';
import styles from './index.less';

const { Title } = Typography;

// import { Item } from 'gg-editor';

// const { Option } = Select;

// const formItemLayout = {
//   labelCol: {
//     span: 5,
//   },
//   wrapperCol: {
//     span: 19,
//   },
// };
interface Step1Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
}

const options = [
  {
    id: 0,
    title: "Basic (Free)",
    description: "512 Kbps + 50 KB burst"
  },
  {
    id: 1,
    title: "Standard Videos",
    description: "2 Mbps + 2 MB burst"
  },
  {
    id: 2,
    title: "HD Videos",
    description: "4 Mbps + 4 MB burst"
  },
  {
    id: 3,
    title: "Web Surfing",
    description: "2 Mbps + 512 KB burst"
  },
  {
    id: 4,
    title: "File Transfer",
    description: "10 Mbps + 1 MB burst"
  },
]

const Step1: React.FC<Step1Props> = (props) => {
  const { dispatch, data } = props;
  const [form] = Form.useForm();

  if (!data) {
    return null;
  }
  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'formAndstepForm/saveStepFormData',
        payload: values,
      });
      dispatch({
        type: 'formAndstepForm/saveCurrentStep',
        payload: 'confirm',
      });
    }
  };
  return (
    <>
      {/* <Card></Card> */}
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        dataSource={options}
        renderItem={item => (
          <List.Item key={item.id}>
            <Card
              hoverable
            >
              <Title level={4}>{item.title}</Title>
              {item.description}
            </Card>
          </List.Item>
        )}
      />
      <Divider style={{ margin: '40px 0 24px' }} />
      <div className={styles.desc}>
        <h3>说明</h3>
        <h4>转账到支付宝账户</h4>
        <p>
          如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
        </p>
        <h4>转账到银行卡</h4>
        <p>
          如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
        </p>
      </div>
    </>
  );
};

export default connect(({ formAndstepForm }: { formAndstepForm: StateType }) => ({
  data: formAndstepForm.step,
}))(Step1);
