interface LiveInfo {
  roomid: string | number;
  uid: string | number;
  uname: string;
  cover: string;
  title: string;
  live_status: number | string;
  tags?: string;
  user_cover?: string;
  short_id?: string | number;
  online?: string | number;
  area_v2_name?: string;
  live_time?: string;
  first_live_time?: number;
  room_cover?: string;
  [key: string]: string | Number | undefined;
}

export default LiveInfo;
