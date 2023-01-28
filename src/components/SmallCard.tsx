import CardData from '../interface/CardData';
import '../styles/smallCard.scss';

const liveStatus = (status: number | string) => {
  if (typeof status === 'string') {
    status = parseInt(status);
  }
  switch (status) {
    case 0:
      return <span className='status off'><span>&#9679;</span> 未开播</span>;
    case 1:
      return <span className='status on'><span>&#9679;</span> 直播中</span>;
    case 2:
      return <span className='status play'><span>&#9679;</span> 轮播中</span>;
    default:
      return <span className='status unknown'><span>&#9679;</span> 未知</span>;
  }
};

const SmallCard = ({ roomId, title, uname, cover, status }: CardData) => {
  return (
    <div className='small-card'>
      <div className='small-card-body small-card-cover'><img src={cover} alt='直播间封面' /></div>
      <div className='small-card-body'>
        <div className='small-card-caption'><span>{uname} &#9474; {roomId}</span></div>
        <h3>{title}</h3>
        <div className='small-card-status'>{liveStatus(status)}</div>
      </div>
    </div>
  );
};

export default SmallCard;
