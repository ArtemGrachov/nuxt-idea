import { IArticle } from '~/types/article.interface';
import { IEntitiesState } from '~/utils/store-entities';

export interface IRootState {
    'data-articles': IEntitiesState<IArticle>;
    'data-notes': IEntitiesState<IArticle>;
    'page-article': any;
    'page-articles-form': any;
    'page-articles-list': any;
    'page-notes-form': any;
    'page-notes-list': any;
}
