import { HitDTO } from './HitDTO';

export interface IndexDTO {
  took: number;
  timed_out: boolean;
  _shards: {
    total: number;
    successful: number;
    skipped: number;
    failed: number;
  };
  hits: {
    total: { value: number; relation: string };
    max_score: number;
    hits: HitDTO[];
  };
}
