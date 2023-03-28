import { TypeOrmDataSource } from "../../config";

import { NewsEditorService } from "./editors.service";
import { NewsEditor } from "./editors.entity";

export const repository = TypeOrmDataSource.getRepository(NewsEditor);

export const newsEditorService = new NewsEditorService(repository);
