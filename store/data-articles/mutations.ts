import { MutationTree } from 'vuex';
import { IArticle } from '~/types/article.interface';
import {
    EEntitiesMutations,
    IEntitiesState,
    mutationUpsertEntitiesFactory,
    mutationUpsertEntityFactory
} from '~/utils/store-entities';

export default {
    [EEntitiesMutations.UPSERT_ENTITIES]: mutationUpsertEntitiesFactory<IArticle>('id'),
    [EEntitiesMutations.UPSERT_ENTITY]: mutationUpsertEntityFactory<IArticle>('id')
} as MutationTree<IEntitiesState<IArticle>>;
