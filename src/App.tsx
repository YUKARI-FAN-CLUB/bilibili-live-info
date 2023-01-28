import React, { useEffect, useState } from 'react';
import './styles/App.scss';
import SmallCard from './components/SmallCard';
import Card from './components/Card';
import SimpleTable from './components/SimpleTable';
import LiveInfo from './interface/LiveInfo';

const setRoomId = (roomId: number | string, url: string) => {
  return url.replace(/\{ROOM_ID\}/g, roomId.toString() ?? '196');
};

const getInfo = async (roomId: number): Promise<LiveInfo | undefined> => {
  if (!process.env.REACT_APP_BILIBILI_LIVE_INFO_API) {
    return;
  }
  let url = setRoomId(roomId, process.env.REACT_APP_BILIBILI_LIVE_INFO_API);
  if (process.env.REACT_APP_USE_BACKEND?.toLowerCase() === 'true') {
    url = setRoomId(roomId, `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/?room={ROOM_ID}`);
  }
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  });
  const json = await response.json();
  if (!json.data) {
    return;
  }
  const result: LiveInfo[] = Object.values(json.data);
  return result[0];
};

const App = () => {
  const [room, setRoom] = useState(196);
  const [liveInfo, setLiveInfo] = useState<LiveInfo>();

  const changeRoom = async () => {
    const info = await getInfo(room);
    setLiveInfo(info);
  };

  useEffect(() => {
    (async () => {
      await changeRoom();
    })();
  }, []);

  return (
    <div>
      <div className='input'>
        <label htmlFor='roomId'>直播间号：</label>
        <input
          type={'number'}
          id='roomId'
          name='roomId'
          value={room}
          min='0'
          onChange={(e) => setRoom(parseInt(e.target.value))}
        />
        <button onClick={changeRoom}>获取直播间信息</button>
      </div>

      <h1>卡片</h1>
      {liveInfo && <SmallCard roomId={liveInfo.short_id?.toString() ?? liveInfo.roomid.toString()} title={liveInfo.title} uname={liveInfo.uname} cover={liveInfo.room_cover ?? liveInfo.user_cover ?? liveInfo.cover} status={parseInt(liveInfo.live_status.toString())} />}

      {liveInfo && <Card roomId={liveInfo.short_id?.toString() ?? liveInfo.roomid.toString()} title={liveInfo.title} uname={liveInfo.uname} cover={liveInfo.room_cover ?? liveInfo.user_cover ?? liveInfo.cover} status={parseInt(liveInfo.live_status.toString())} startTime={liveInfo.live_time?.toString() === '0000-00-00 00:00:00' ? '目前没有直播' : liveInfo.live_time?.toString()} />}

      <h1>表格</h1>
      {liveInfo && <SimpleTable data={liveInfo} />}
    </div>
  );
};

export default App;
