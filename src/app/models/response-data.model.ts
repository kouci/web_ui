export interface Response<T = any> {
    timestamp?: string; 
    statusCode: number;
    status: string; 
    message?: string;
    reason?: string;
    developerMessage?: string;
    data?: T; 
  }
  