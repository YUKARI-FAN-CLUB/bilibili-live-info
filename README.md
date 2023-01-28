# Bilibili 直播间信息 API 演示

获取B站直播间的基本信息，简单前端展示概念

![预览图](.assets/preview1.png)
![预览图2](.assets/preview2.png)

## 注意事项

- :warning: 这只是演示，供研究用途，不建议实际使用
- :no_entry_sign: 请勿同一时间多次存取B站API，短时间内发起过多请求会被B站暂时封禁
- :arrows_counterclockwise: B站API可能会随时更改，本文档及代码不一定会随着更新
- :no_entry: 由于浏览器直接请求B站API会有跨域限制，因此弄了个简单的后端作转接，如想直接在浏览器请求（**不建议！**），请自行在浏览器上设置好停用CORS策略

## Bilibili API 解析

> https://api.live.bilibili.com/room/v1/Room/get_info_by_id?ids[]={直播间号}

*如要更多信息可使用 https://api.live.bilibili.com/room/v1/Room/get_info?room_id={直播间号}*

| 字段              | 类型    | 内容                                                           |
| ----------------- |:------:|:--------------------------------------------------------- |
| roomid            | string | 房间号                                                         |
| uid               | string | 主播 UID                                                       |
| uname             | string | 主播名                                                         |
| cover             | string | 直播间封面                                                     |
| live_time         | string | 开播时间（*只在开播时显示，下播后会返回 0000-00-00 00:00:00*） |
| title             | string | 直播间标题                                                     |
| tags              | string | 直播间标签                                                     |
| user_cover        | string | 自定直播间封面                                                 |
| short_id          | string | 直播间短号                                                     |
| online            | string | 人气值                                                         |
| area_v2_id        | string | 分区 ID                                                        |
| area_v2_parent_id | string | 大分区 ID                                                      |
| background        | string | 直播间背景图                                                   |
| area_v2_name      | string | 分区名称                                                       |
| first_live_time   | number | 首播时间 （unix 时间戳）                                         |
| live_id           | number | 直播场次 ID                                                    |
| live_status       | number | 开播状态（0 为未开播，1 为直播中，2 为轮播中）                 |

## 安装及使用

1. `git clone` 或手动下载源码
2. `yarn` 或 `npm install` 安装依赖的模块
3. （选项）打开 `.env` 更改演示的设置

- `REACT_APP_USE_BACKEND`： 是否使用后端，预设`true`，设置`false`就会以浏览器直接请求B站API（需要先在浏览器设置好停用CORS限制）
- `REACT_APP_ROOM_ID`： 预设的直播间号，预设`196`
- `REACT_APP_BILIBILI_LIVE_INFO_API`： B站API的链接，使用`{ROOM_ID}`为直播间号占位符
- `REACT_APP_BACKEND_PORT`： 后端使用的端口，预设`3001`
- `PORT`： 前端使用的端口，Create React App 的参数，预设`3000`
- `BROWSER`： 前端运行时是否自动打开浏览器，Create React App 的参数，预设`none`为不打开浏览器，删除可自动打开预设浏览器，或自行指定喜欢的浏览器（[CRA 设置文档](https://create-react-app.dev/docs/advanced-configuration/)）

4. 如不使用后端，请跳到第 6 步。
5. `yarn run backend` 或 `npm run backend` 启动后端
6. `yarn start` 或 `npm start` 运行前端，也可以使用 `yarn run build` 或 `npm run build` 编译成静态档案

## 技术栈

- TypeScript
- React
- Node.js
- Create React App
- SASS

---

```
 __     ___    _ _  __          _____  _____       ______      _   _        _____ _     _    _ ____
 \ \   / / |  | | |/ /    /\   |  __ \|_   _|     |  ____/\   | \ | |      / ____| |   | |  | |  _ \
  \ \_/ /| |  | | ' /    /  \  | |__) | | |       | |__ /  \  |  \| |     | |    | |   | |  | | |_) |
   \   / | |  | |  <    / /\ \ |  _  /  | |       |  __/ /\ \ | . ` |     | |    | |   | |  | |  _ <
    | |  | |__| | . \  / ____ \| | \ \ _| |_      | | / ____ \| |\  |     | |____| |___| |__| | |_) |
    |_|   \____/|_|\_\/_/    \_\_|  \_\_____|     |_|/_/    \_\_| \_|      \_____|______\____/|____/

   小缘粉丝俱乐部 YUKARI FAN CLUB || https://yukari.top/ || https://xiaoyuan.club
```
小缘粉丝俱乐部 YUKARI FAN CLUB