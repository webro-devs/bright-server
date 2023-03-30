import { Client } from "@elastic/elasticsearch";
import {
  INewsCountResult,
  INewsSearchBody,
  INewsSearchResult,
} from "../../infra/shared/interface";
import { HttpException } from "../../infra/validation";
import { News } from "./news.entity";

const client = new Client({
  node: process.env.ELASTICSEARCH_NODE,
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD,
  },
});

const index = "news";
const fields = [
  "state",
  "ru.title",
  "ru.description",
  "ru.shortDescription",
  "ru.tags",
  "uz.title",
  "uz.description",
  "uz.shortDescription",
  "uz.tags",
  "en.title",
  "en.description",
  "en.shortDescription",
  "en.tags",
  "уз.title",
  "уз.description",
  "уз.shortDescription",
  "уз.tags",
];

export async function ElasticIndexNews(news: News) {
  try {
    return await client.index<INewsSearchResult | INewsSearchBody>({
      index,
      id: news.id,
      body: news,
    });
  } catch (err) {
    throw new HttpException(true, 500, err.message);
  }
}

export async function ElasticCount(query: string) {
  const body: INewsCountResult = await client.count({
    index,
    // body: {
    //   query: {
    //     multi_match: {
    //       query,
    //       fields,
    //     },
    //   },
    // },
  });
  return body.count;
}

export async function ElasticSearch(
  text: string,
  offset?: number,
  limit?: number,
  state?: string,
  startId = 0,
) {
  let separateCount = 0;
  if (startId) {
    separateCount = await this.count(text, fields);
  }

  const body = await client.search<INewsSearchResult>({
    index,
    from: offset,
    size: limit,
    body: {
      query: {
        bool: {
          must: [
            {
              multi_match: {
                query: text,
                fields,
              },
            },
            {
              match: {
                state,
              },
            },
          ],
        },
      },
      sort: {
        _score: {
          order: "desc",
        },
      },
    },
  });

  const count = body.hits.total;
  const hits = body.hits.hits;
  const results = hits.map((item) => item._source);

  return {
    count: startId ? separateCount : count["value"],
    results,
  };
}

export async function ElasticRemove(newsId: string) {
  client.deleteByQuery({
    index,
    body: {
      query: {
        match: {
          id: newsId,
        },
      },
    },
  });
}

export async function ElasticUpdate(news: News) {
  const newBody: INewsSearchBody = news;
  return client.update({
    index,
    id: news.id,
    body: {
      doc: newBody,
    },
  });
}
