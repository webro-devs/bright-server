import { INewsSearchBody } from '.';

interface INewsSearchResult {
  hits: {
    total: {
      value: number;
    };
    hits: Array<{
      _source: INewsSearchBody;
    }>;
  };
}

export default INewsSearchResult;
