export interface HttpResponse {
  status: number;
  data: any;
}
export interface HttpFileResponse extends HttpResponse {
  filename: string;
  mimeType: string;
}
