import { IArticle } from '~/types/article.interface';
import { IScopedArticle } from '~/types/scoped-article.interface';
import EStatus from '~/types/status.enum';

export default function scopedArticleFactory(article: IArticle): IScopedArticle {
    return {
        id: article.id,
        editStatus: EStatus.INIT,
        editError: null,
        deleteStatus: EStatus.INIT,
        deleteError: null
    };
}
