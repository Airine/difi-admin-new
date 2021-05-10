import { Axis, Chart, Coord, Geom, Guide, Shape } from 'bizcharts';

import React, { Component } from 'react';


const { Arc, Html, Line } = Guide;

var percent = 50;

function getPercent() {
  percent += Math.floor(Math.random()*20)-10;
  if (percent < 0) {
    percent = 0;
  } else if (percent > 100) {
    percent = 100;
  }
  return [{value: percent/10 }];
}

const defaultFormatter = (val: string): string => {
  switch (val) {
    case '2':
      return 'Under';
    case '4':
      return 'Medium';
    case '6':
      return 'Good';
    case '8':
      return 'Over';
    default:
      return '';
  }
};

if (Shape.registerShape) {
  Shape.registerShape('point', 'pointer', {
    drawShape(cfg: any, group: any) {
      let point = cfg.points[0];
      point = (this as any).parsePoint(point);
      const center = (this as any).parsePoint({
        x: 0,
        y: 0,
      });
      group.addShape('line', {
        attrs: {
          x1: center.x,
          y1: center.y,
          x2: point.x,
          y2: point.y,
          stroke: cfg.color,
          lineWidth: 2,
          lineCap: 'round',
        },
      });
      return group.addShape('circle', {
        attrs: {
          x: center.x,
          y: center.y,
          r: 6,
          stroke: cfg.color,
          lineWidth: 3,
          fill: '#fff',
        },
      });
    },
  });
}

class Gauge extends Component {

  state = {
    data: getPercent(),
  }

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
            data: getPercent(),
          },
          () => {
            this.loopData();
          },
        );
      }, 1000);
    });
  };

  renderHtml = (value: number) => `
  <div style="width: 300px;text-align: center;font-size: 12px!important;">
    <div style="font-size: 14px; color: rgba(0,0,0,0.43);margin: 0;">Utilization</div>
    <div style="font-size: 24px;color: rgba(0,0,0,0.85);margin: 0;">
      ${(value*10).toFixed(2)}%
    </div>
  </div>`;

  render() {
    const height = 180;
    const forceFit = true;
    const formatter = defaultFormatter;
    const color = '#2F9CFF';
    const bgColor = '#F0F2F5';

    const textStyle: {
      fontSize: number;
      fill: string;
      textAlign: 'center';
    } = {
      fontSize: 12,
      fill: 'rgba(0, 0, 0, 0.65)',
      textAlign: 'center',
    };
      
    const cols = {
      value: {
        type: 'linear',
        min: 0,
        max: 10,
        tickCount: 6,
        nice: true,
      },
    };
  return (
    <Chart height={height} data={this.state.data} scale={cols} padding={[-16, 0, 16, 0]} forceFit={forceFit}>
      <Coord type="polar" startAngle={-1.25 * Math.PI} endAngle={0.25 * Math.PI} radius={0.8} />
      <Axis name="1" line={undefined} />
      <Axis
        line={undefined}
        tickLine={undefined}
        subTickLine={undefined}
        name="value"
        zIndex={2}
        label={{
          offset: -12,
          formatter,
          textStyle,
        }}
      />
      <Guide>
        <Line
          start={[3, 0.905]}
          end={[3, 0.85]}
          lineStyle={{
            stroke: color,
            lineDash: undefined,
            lineWidth: 2,
          }}
        />
        <Line
          start={[5, 0.905]}
          end={[5, 0.85]}
          lineStyle={{
            stroke: color,
            lineDash: undefined,
            lineWidth: 3,
          }}
        />
        <Line
          start={[7, 0.905]}
          end={[7, 0.85]}
          lineStyle={{
            stroke: color,
            lineDash: undefined,
            lineWidth: 3,
          }}
        />
        <Arc
          start={[0, 0.965]}
          end={[10, 0.965]}
          style={{
            stroke: bgColor,
            lineWidth: 10,
          }}
        />
        <Arc
          start={[0, 0.965]}
          end={[this.state.data[0].value, 0.965]}
          style={{
            stroke: color,
            lineWidth: 10,
          }}
        />
        <Html position={['50%', '95%']} html={this.renderHtml(this.state.data[0].value)} />
      </Guide>
      <Geom
        line={false}
        type="point"
        position="value*1"
        shape="pointer"
        color={color}
        active={false}
      />
    </Chart>
  );
        }
};

export default Gauge;
