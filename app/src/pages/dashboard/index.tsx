import { Card, Col, Row, Statistic } from 'antd';
import type { Dispatch } from 'umi';
import { FormattedMessage, connect, formatMessage } from 'umi';
import React, { Component } from 'react';

import { GridContent } from '@ant-design/pro-layout';
import numeral from 'numeral';
import type { StateType } from './model';
import { Pie, WaterWave, Gauge, TagCloud, Map } from './components/Charts';
import ActiveChart from './components/ActiveChart';
import styles from './style.less';

const { Countdown } = Statistic;

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

interface MonitorProps {
  dashboardAndmonitor: StateType;
  dispatch: Dispatch;
  loading: boolean;
}

class Monitor extends Component<MonitorProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAndmonitor/fetchTags',
    });
  }

  render() {
    return (
      <GridContent>
        <React.Fragment>
          <Row gutter={24}>
            <Col xl={6} lg={24} md={24} sm={24} xs={24}>
              <Card
                title={
                  "Un-used bandwidth within 5 mins"
                }
                style={{ marginBottom: 24 }}
                bordered={false}
              >
                <ActiveChart />
              </Card>
              <Card
                title={
                  "Your Bandwidth Utilization"
                }
                style={{ marginBottom: 24 }}
                bodyStyle={{ textAlign: 'center' }}
                bordered={false}
              >
                <Gauge/>
              </Card>
            </Col>
          </Row>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default connect(
  ({
    dashboardAndmonitor,
    loading,
  }: {
    dashboardAndmonitor: StateType;
    loading: {
      models: Record<string, boolean>;
    };
  }) => ({
    dashboardAndmonitor,
    loading: loading.models.dashboardAndmonitor,
  }),
)(Monitor);
