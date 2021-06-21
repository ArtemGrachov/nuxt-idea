import EStatus from '~/types/status.enum';
import { IScopedArticle } from '~/types/scoped-article.interface';
import { IEntityState } from '~/utils/store-entity';
import { IEntitiesState } from '~/utils/store-entities';
import { IFormState } from '~/utils/store-form';
import IFormArticleValue from '~/types/form-article-value.interface';

export interface IState extends IFormState<IFormArticleValue> {}

export default (): IState => {
    return {
        form: {
            content: ''
        },
        submitStatus: EStatus.INIT,
        submitError: null
    };
}
