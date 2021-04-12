import { Button, Result, Descriptions } from 'antd';
import React from 'react';
import type { Dispatch } from 'umi';
import { history, connect } from 'umi';
import type { StateType } from '../../model';
import styles from './index.less';

interface Step3Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
}

const Step3: React.FC<Step3Props> = (props) => {
  const { data, dispatch } = props;
  if (!data) {
    return null;
  }
  const { bandwidth, burst } = data;
  const onFinish = () => {
    if (dispatch) {
      dispatch({
        type: 'formAndstepForm/saveCurrentStep',
        payload: 'info',
      });
    }
  };
  const information = (
    <div className={styles.information}>
      <Descriptions column={1}>
      <Descriptions.Item label="Allocated Bandwidth">
          {bandwidth > 1024 ?
            <p>{bandwidth/1024} Mbps</p> :
            <p>{bandwidth} Kbps</p>}
        </Descriptions.Item>
        <Descriptions.Item label="Burst Data">
          {burst > 1024 ?
          <p>{burst/1024} MB</p> :
          <p>{burst} KB</p>}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
  const extra = (
    <>
      <Button type="primary" onClick={onFinish}>
        New Request
      </Button>
      <Button onClick={()=>{
        history.push(`/dashboard`)
      }}>View Allocation</Button>
    </>
  );
  return (
    <Result
      status="success"
      title="Request Successfully"
      subTitle="Please wait a little bit and validate the bandwidth"
      extra={extra}
      className={styles.result}
    >
      {information}
    </Result>
  );
};

export default connect(({ formAndstepForm }: { formAndstepForm: StateType }) => ({
  data: formAndstepForm.step,
}))(Step3);
