import EStatus from './status.enum';
import { IArticle } from './article.interface';
import IFormArticleValue from './form-article-value.interface';

export interface IScopedNote {
    id: number;
    deleteStatus: EStatus;
    deleteError: any;
    editStatus: EStatus;
    editError: any;
    data?: IArticle;
    form: IFormArticleValue;
}
