import EStatus from './status.enum';
import { IArticle } from './article.interface';

export interface IScopedArticle {
    id: number;
    deleteStatus: EStatus;
    deleteError: any;
    editStatus: EStatus;
    editError: any;
    data?: IArticle;
}
