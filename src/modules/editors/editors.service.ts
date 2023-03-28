import { DeleteResult, Repository } from "typeorm";
import { NewsEditor } from "./editors.entity";
import { CreateEditorDto } from "./dto";
import { HttpException } from "../../infra/validation";
import { IsSameDate } from "../../infra/helpers";

export class NewsEditorService {
  constructor(private readonly newsEditorRepository: Repository<NewsEditor>) {}

  async getAll(): Promise<NewsEditor[]> {
    try {
      const newsEdits = await this.newsEditorRepository.find();
      return newsEdits;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getById(id: string): Promise<NewsEditor> {
    try {
      const category = await this.newsEditorRepository.findOne({
        where: { id },
      });
      return category;
    } catch (error) {
      throw new HttpException(true, 500, error.message);
    }
  }

  async getByNewsId(id: string): Promise<NewsEditor> {
    try {
      const category = await this.newsEditorRepository.findOne({
        where: { news: { id } },
        order: {
          editedDate: "DESC",
        },
      });
      return category;
    } catch (error) {
      throw new HttpException(true, 500, error.message);
    }
  }

  async create(values: CreateEditorDto) {
    try {
      const response = await this.newsEditorRepository
        .createQueryBuilder()
        .insert()
        .into(NewsEditor)
        .values(values as unknown as NewsEditor)
        .execute();
      return response;
    } catch (error) {
      throw new HttpException(true, 500, error.message);
    }
  }

  async updateEditDate(id: string, date: Date) {
    try {
      const edition = await this.getById(id);
      if (IsSameDate(date, edition.editedDate)) {
        const response = await this.newsEditorRepository.update(id, {
          editedDate: date,
        });
        return response;
      } else {
        const response = await this.create({
          editor: edition.editor.id,
          news: edition.news.id,
          editedDate: date,
        });
        return response;
      }
    } catch (err) {
      return new HttpException(true, 500, err.message);
    }
  }

  async remove(id: string): Promise<DeleteResult | HttpException> {
    try {
      const response = await this.newsEditorRepository.delete(id);
      return new HttpException(false, 204, "Edition removed!");
    } catch (error) {
      return new HttpException(true, 500, error.message);
    }
  }

  async removeMoreByIds(ids: string): Promise<DeleteResult | HttpException> {
    try {
      const response = await this.newsEditorRepository
        .createQueryBuilder()
        .delete()
        .where("id IN(:...ids)", { ids })
        .execute();
      return response;
    } catch (error) {
      throw new HttpException(true, 500, error.message);
    }
  }
}
