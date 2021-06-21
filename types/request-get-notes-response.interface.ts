import { IArticle } from './article.interface';
import { IPagination } from './pagination.interface';

export interface IRequestGetNotesResponse {
    notes: IArticle[];
    pagination: IPagination;
}
