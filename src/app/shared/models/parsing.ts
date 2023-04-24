import {RequireOnlyOne} from '../utils/utility-types';

export interface ParsingResponseDto<T = any> {
  data: T,
  success: boolean,
}

export interface ParseFormPayload {
  url: string | null;
  file: File |  null;
}
export type ParsePayload = RequireOnlyOne<ParseFormPayload, 'url' | 'file'>;

export interface ParseResponseDto {
  storeId: string;
  title: string;
}
