import { IArticle } from './article.interface';
import { IPagination } from './pagination.interface';

export interface IRequestGetArticlesResponse {
    articles: IArticle[];
    pagination: IPagination;
}
