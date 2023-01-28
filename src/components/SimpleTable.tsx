import LiveInfo from '../interface/LiveInfo';
import '../styles/simpleTable.scss'

const liveStatus = (status: number | string) => {
  if (typeof status === 'string') {
    status = parseInt(status);
  }
  switch (status) {
    case 0:
      return '未开播';
    case 1:
      return '直播中';
    case 2:
      return '轮播中';
    default:
      return '未知';
  }
};

const image = (url: string | undefined) => {
  if (!url) {
    return undefined;
  }
  return <img src={url} alt={url} />;
};

const SimpleTable = ({ data }: { data: LiveInfo }) => {
  return (
    <div className='table'>
      <div>
        <div>直播间号：</div>
        <div>{data.roomid?.toString() ?? ''}</div>
      </div>
      <div>
        <div>房间短号：</div>
        <div>{data.short_id?.toString() ?? <span>没有短号</span>}</div>
      </div>
      <div>
        <div>主播名（UID）：</div>
        <div>
          {data.uname ?? ''}
          {data.uid ? `（${data.uid}）` : ''}
        </div>
      </div>
      <div>
        <div>直播间标题：</div>
        <div>{data.title ?? ''}</div>
      </div>
      <div>
        <div>直播间封面：</div>
        <div>{image(data.room_cover) ?? image(data.user_cover) ?? image(data.cover) ?? <span>没有封面图</span>}</div>
      </div>
      <div>
        <div>关键帧封面：</div>
        <div>{image(data.cover) ?? <span>没有关键帧</span>}</div>
      </div>
      <div>
        <div>分区：</div>
        <div>
          {data.area_v2_name?.toString() ?? ''}
          {data.area_v2_id ? `（ID: ${data.area_v2_id}）` : ''}
        </div>
      </div>
      <div>
        <div>开播状态：</div>
        <div><span>{liveStatus(data.live_status)}</span></div>
      </div>
      <div>
        <div>开播时间：</div>
        <div>
          {!data.live_time || data.live_time?.toString() === '0000-00-00 00:00:00' ? (
            <span>目前没有直播</span>
          ) : (
            data.live_time.toString()
          )}
        </div>
      </div>
      <div>
        <div>人气值：</div>
        <div>{data.online?.toString() ?? ''}</div>
      </div>
      <div>
        <div>标签：</div>
        <div>{data.tags ? data.tags.split(',').map((t,idx) => <span key={idx}>{t}</span>) : ''}</div>
      </div>
      <div>
        <div>首播时间：</div>
        <div>{data.first_live_time ? new Date(data.first_live_time * 1000).toLocaleString() : ''}</div>
      </div>
    </div>
  );
};

export default SimpleTable;
