import { GetterTree } from 'vuex';
import { IRootState } from '~/store-utils/state.interface';
import { IArticle } from '~/types/article.interface';
import { EEntitiesGetters, getterEntities, IEntitiesState } from '~/utils/store-entities';

export default {
    [EEntitiesGetters.ENTITIES]: getterEntities
} as GetterTree<IEntitiesState<IArticle>, IRootState>;
