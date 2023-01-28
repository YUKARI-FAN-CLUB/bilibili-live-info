import CardData from '../interface/CardData';
import '../styles/card.scss';

const liveStatus = (status: number | string) => {
  if (typeof status === 'string') {
    status = parseInt(status);
  }
  switch (status) {
    case 0:
      return <><span className='status off'></span>未开播</>;
    case 1:
      return <><span className='status on'></span>直播中</>;
    case 2:
      return <><span className='status play'></span>轮播中</>;
    default:
      return <><span className='status unknown'></span>未知</>;
  }
};

const Card = ({ roomId, title, uname, cover, status, startTime }: CardData) => {
  return (
    <div className='card'>
      <img src={cover} alt='直播间封面' />
      <div className='card-content'>
        <h2>{title}</h2>
        <div>{uname}</div>
        <div>
          开播时间：
          {!startTime || startTime?.toString() === '0000-00-00 00:00:00' ? (
            <span>目前没有直播</span>
          ) : (
            startTime.toString()
          )}
        </div>
      </div>
      <div className='card-bottom'>
        <div className='card-status'>{liveStatus(status)}</div>
        <div>房间号：<span>{roomId}</span></div>
      </div>
    </div>
  );
};

export default Card;
