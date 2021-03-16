let serverUrl = `https://ts.shop.tiancaixing.com/api/upload/innerUse`;
let fieldName = 'file';
// 500M
let maxSize = 524288000;
let urlPrefix = ``;
export default {
  videoAllowFiles: ['.flv', '.swf', '.mkv', '.avi', '.rm', '.rmvb', '.mpeg', '.mpg', '.ogg', '.ogv', '.mov', '.wmv', '.mp4', '.webm', '.mp3', '.wav', '.mid'],
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
  videoActionName: serverUrl,
  imageActionName: serverUrl,
  serverUrl: serverUrl,
};
