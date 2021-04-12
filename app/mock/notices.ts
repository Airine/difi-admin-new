import { Request, Response } from 'express';

const getNotices = (req: Request, res: Response) => {
  res.json([
    {
      id: '000000001',
      // avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: 'Requested bandwidth promoted by system.',
      description: 'Congestion detected, bandwidth increased from 1Mbps to 2Mbps.',
      datetime: '2021-04-12T11:15:30',
      type: 'notification',
    },
    {
      id: '000000002',
      title: 'Price of bandwidth updated.',
      description: 'Current market price: 1.25 wei/Mbps per second.',
      datetime: '2021-04-12T15:00:00',
      type: 'notification',
    },
  ]);
};

export default {
  'GET /api/notices': getNotices,
};
