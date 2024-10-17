export type ProxyDataStatus = {
  url: string;
  content_type: string;
  http_code: number;
  response_time: number;
  content_length: number;
}

export type ProxyData = {
  contents: string;
  status: ProxyDataStatus;
}
