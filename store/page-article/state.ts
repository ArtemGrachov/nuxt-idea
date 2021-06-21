import EStatus from '~/types/status.enum';
import { IScopedArticle } from '~/types/scoped-article.interface';
import { IEntityState } from '~/utils/store-entity';

export interface IState extends IEntityState<number> {
    getStatus: EStatus;
    getError: any;
    deleteStatus: EStatus;
    deleteError: any;
}

export default (): IState => {
    return {
        getStatus: EStatus.INIT,
        getError: null,
        deleteStatus: EStatus.INIT,
        deleteError: null,
        entity: null
    };
}
