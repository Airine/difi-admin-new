import React, { useState } from 'react';
import { Form, List, Divider, Card, Button } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from '../../model';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    span: 1,
  },
  wrapperCol: {
    span: 23,
  },
};
interface Step1Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
}

const options = [
  {
    id: 0,
    title: "Basic (Free)",
    description: "512 Kbps + 50 KB burst",
    bandwidth: 512,
    burst: 50,
  },
  {
    id: 1,
    title: "Standard Videos",
    description: "2 Mbps + 2 MB burst",
    bandwidth: 2048,
    burst: 2048,
  },
  {
    id: 2,
    title: "HD Videos",
    description: "4 Mbps + 4 MB burst",
    bandwidth: 4096,
    burst: 4096,
  },
  {
    id: 3,
    title: "Web Surfing",
    description: "2 Mbps + 512 KB burst",
    bandwidth: 2048,
    burst: 512,
  },
  {
    id: 4,
    title: "File Transfer",
    description: "10 Mbps + 1 MB burst",
    bandwidth: 2048,
    burst: 512,
  },
]

const Step1: React.FC<Step1Props> = (props) => {
  const { dispatch, data } = props;
  const [form] = Form.useForm();
  
  const [selected, setSelected] = useState(data?.selected);

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

  console.log(data);

  // setSelected(data?.selected);

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
        initialValues={data}
        >
        <Form.Item>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 2,
              xl: 2,
              xxl: 2,
            }}
            dataSource={options}
            renderItem={(item) => {
                return (
                  <List.Item key={item.id}>
                    <Card 
                      className={selected == item.id ? styles.selected : styles.unselected }
                      onClick={
                        ()=>{
                          data.selected = item.id;
                          data.bandwidth = options[item.id].bandwidth;
                          data.burst = options[item.id].burst;
                          setSelected(item.id);
                        }
                      }
                      hoverable>
                      <h2>{item.title}</h2>
                      {item.description}
                    </Card>
                  </List.Item>
                );
            }}
          />

        </Form.Item>

          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 9 },
              sm: {
                span: 24,
                offset: 9.5
              },
            }}
          >
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
          </Form.Item>
        </Form>
      <Divider style={{ margin: '40px 0 24px' }} />
      <div className={styles.desc}>
        <h3>Information</h3>
        <h4>What do xMbps and xMB burst mean?</h4>
        <p>
          <b>xMbps</b> (Mega-bytes per second) is the maximum throughput of data transmission (the bandwidth), and <b>xMB</b> burst means a certain volume of data without bandwidth constraint in the short run.
        </p>
        <h4>How to specify the quality by your self?</h4>
        <p>
          Go to <a href="/form/advanced-form">Advanced Setting.</a>
        </p>
      </div>
    </>
  );
};

export default connect(({ formAndstepForm }: { formAndstepForm: StateType }) => ({
  data: formAndstepForm.step,
}))(Step1);
