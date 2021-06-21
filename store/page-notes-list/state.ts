import EStatus from '~/types/status.enum';
import { IScopedArticle } from '~/types/scoped-article.interface';
import { IEntityState } from '~/utils/store-entity';
import { IEntitiesState } from '~/utils/store-entities';
import { IPagination } from '~/types/pagination.interface';
import { IListState } from '~/utils/store-list';

export interface IState extends IEntitiesState<IScopedArticle>, IEntityState<IPagination>, IListState<number> {
    getStatus: EStatus;
    getError: any;
}

export default (): IState => {
    return {
        getStatus: EStatus.INIT,
        getError: null,
        entities: {},
        entity: null,
        items: []
    };
}
