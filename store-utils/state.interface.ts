import { IArticle } from '~/types/article.interface';
import { IEntitiesState } from '~/utils/store-entities';
import { IState as IPageArticleState } from '~/store/page-article/state';
import { IState as IPageArticlesListState } from '~/store/page-articles-list/state';
import { IState as IPageNotesListState } from '~/store/page-notes-list/state';
import { IState as IPageArticleEditForm } from '~/store/page-article-edit-form/state';

export interface IRootState {
    'data-articles': IEntitiesState<IArticle>;
    'data-notes': IEntitiesState<IArticle>;
    'page-article': IPageArticleState;
    'page-articles-form': any;
    'page-articles-list': IPageArticlesListState;
    'page-notes-form': IPageNotesListState;
    'page-notes-list': any;
    'page-article-edit-form': IPageArticleEditForm;
}
