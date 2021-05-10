import React, { Component } from 'react';
import { MiniArea } from '../Charts';
import styles from './index.less';

function fixedZero(val: number) {
  return val * 1 < 10 ? `0${val}` : val;
}

const activeData: { x: string; y: number; }[] = [];

function getActiveData() {
  if (activeData.length == 0) {
    const now = new Date();
    var time = new Date(now.getTime() - 1 * 60000);
    while (time < now) {
      var time = new Date(time.getTime() + 1000);
      activeData.push({
        x: `${fixedZero(time.getHours())}:${fixedZero(time.getMinutes())}:${fixedZero(time.getSeconds())}`,
        y: Math.floor(Math.random() * 50) + 50,
      });
    }
  } else {
    var time = new Date();
    const [hours, mins, seconds] = activeData[activeData.length-1].x.split(':');
    time.setHours(parseInt(hours));
    time.setMinutes(parseInt(mins));
    time.setSeconds(parseInt(seconds));
    const now = new Date();
    while (time < now) {
      time = new Date(time.getTime() + 1000);
      activeData.shift();
      activeData.push({
        x: `${fixedZero(time.getHours())}:${fixedZero(time.getMinutes())}:${fixedZero(time.getSeconds())}`,        y: Math.floor(Math.random() * 50) + 50,
      });
    }
  }
  return activeData;
}

export default class ActiveChart extends Component {
  state = {
    activeData: getActiveData(),
  };

  timer: number | undefined = undefined;

  requestRef: number | undefined = undefined;

  componentDidMount() {
    this.loopData();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    if (this.requestRef) {
      cancelAnimationFrame(this.requestRef);
    }
  }

  loopData = () => {
    this.requestRef = requestAnimationFrame(() => {
      this.timer = window.setTimeout(() => {
        this.setState(
          {
            activeData: getActiveData(),
          },
          () => {
            this.loopData();
          },
        );
      }, 1000);
    });
  };

  render() {
    const { activeData = [] } = this.state;

    return (
      <div className={styles.activeChart}>
        {/* <Statistic title="目标评估" value="有望达到预期" /> */}
        <div style={{ marginTop: 32 }}>
          <MiniArea
            animate={false}
            line
            borderWidth={2}
            height={84}
            scale={{
              y: {
                tickCount: 3,
              },
            }}
            yAxis={{
              tickLine: undefined,
              label: undefined,
              title: undefined,
              line: undefined,
            }}
            data={activeData}
          />
        </div>
        {activeData && (
          <div className={styles.activeChartLegend}>
            <span>{activeData[0].x}</span>
            <span>{activeData[Math.floor(activeData.length / 2)].x}</span>
            <span>{activeData[activeData.length - 1].x}</span>
          </div>
        )}
      </div>
    );
  }
}
