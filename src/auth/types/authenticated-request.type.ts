import { JwtPayload } from './jwt-payload.type';

export interface AuthenticatedRequest {
  headers: {
    authorization?: string;
  };
  user: JwtPayload;
}
