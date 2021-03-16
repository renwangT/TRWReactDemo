// let serverUrl = `https://ts.shop.tiancaixing.com/api/upload/innerUse`;
const prefix = process.env.BUILD_ENV !== 'prod' ? 'http://service.test.bbkedu.com' : 'http://service.test.bbkedu.com';

let serverUrl = prefix + '/api/file/upload';
let paramsName = 'file';
let fieldName = 'file';
// import { userStatus } from '@xtc/user-status';
// 500M
let maxSize = 524288000;
let urlPrefix = ``;
// let Token: string = 'Bearer ' + userStatus.getTokenSync();
export default {
  // UEDITOR_HOME_URL: DOMAIN.publicPath + "ueditor/",
  videoAllowFiles: ['.flv', '.swf', '.mkv', '.avi', '.rm', '.rmvb', '.mpeg', '.mpg', '.ogg', '.ogv', '.mov', '.wmv', '.mp4', '.webm', '.mp3', '.wav', '.mid'],
  fileAllowFiles: [
    '.xmind',
    '.rar',
    '.zip',
    '.tar',
    '.gz',
    '.bz2',
    '.doc',
    '.docx',
    '.pdf',
    '.mp3',
    '.xls',
    '.xlsx',
    '.chm',
    '.ppt',
    '.pptx',
    '.avi',
    '.rmvb',
    '.wmv',
    '.flv',
    '.swf',
    '.rm',
    '.exe',
    '.psd',
    '.txt',
    '.jpg',
    '.png',
    '.jpeg',
    '.gif',
    '.ico',
    '.bmp',
  ],
  imageUrlPrefix: urlPrefix,
  scrawlUrlPrefix: urlPrefix,
  snapscreenUrlPrefix: urlPrefix,
  catcherUrlPrefix: urlPrefix,
  videoUrlPrefix: urlPrefix,
  fileUrlPrefix: urlPrefix,
  imageFieldName: fieldName,
  videoFieldName: fieldName,
  videoMaxSize: maxSize,
  imageMaxSize: maxSize,
  scrawlMaxSize: maxSize,
  catcherMaxSize: maxSize,
  fileMaxSize: maxSize,
  fileActionName: serverUrl,
  catcherActionName: serverUrl,
  snapscreenActionName: serverUrl,
  scrawlActionName: serverUrl,
  fileFieldName: fieldName,
  catcherFieldName: fieldName,
  videoActionName: paramsName,
  imageActionName: paramsName,
  serverUrl: serverUrl,
  initialFrameWidth: '100%',
  autoHeightEnabled: false,
  headers: { Authorization: 'Token' },
};
