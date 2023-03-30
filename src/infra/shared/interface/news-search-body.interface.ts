interface IAdmin {
  id: string;
  login: string;
  phone: string;
  fullName: string;
  city: string;
  education: string;
  avatar: string;
  isActive: boolean;
  lastSeen: Date;
  isOnline: boolean;
  news: INews[];
  permissions: IPermission[];
  position: IPosition;
}

interface ICategory {
  id: string;
  uz: string;
  ru: string;
  en: string;
  уз: string;
  news: INews[];
}

interface IPermission {
  id: string;
  title: string;
  admins: IAdmin[];
}

interface IPosition {
  id: string;
  title: string;
  description: string;
  admins: IAdmin[];
}

interface INewsLanguage {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  descImg: string[];
  shortLink: string;
  file: string;
  tags: string[];
  uz?: INews;
  ru?: INews;
  en?: INews;
  уз?: INews;
}

interface INews {
  id: string;
  state: string;
  publishDate: Date;
  created_at: Date;
  updated_at: Date;
  isEditing: boolean;
  uz: INewsLanguage;
  ru: INewsLanguage;
  en: INewsLanguage;
  уз: INewsLanguage;
  creator: IAdmin;
  categories: ICategory[];
  mainCategory: ICategory;
}

interface INewsSearchBody extends INews {}

export default INewsSearchBody;
