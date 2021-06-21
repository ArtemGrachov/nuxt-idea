import { MutationTree } from 'vuex';
import { IArticle } from '~/types/article.interface';
import {
    EEntitiesMutations,
    IEntitiesState,
    mutationDeleteEntity,
    mutationUpsertEntitiesFactory,
    mutationUpsertEntityFactory
} from '~/utils/store-entities';

export default {
    [EEntitiesMutations.UPSERT_ENTITIES]: mutationUpsertEntitiesFactory<IArticle>('id'),
    [EEntitiesMutations.UPSERT_ENTITY]: mutationUpsertEntityFactory<IArticle>('id'),
    [EEntitiesMutations.DELETE_ENTITY]: mutationDeleteEntity
} as MutationTree<IEntitiesState<IArticle>>;
