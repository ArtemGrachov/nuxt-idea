import { ActionTree } from 'vuex';

import { ECommonActions } from '~/store-utils/common/actions';
import { ECommonMutations } from '~/store-utils/common/mutations';
import { IRootState } from '~/store-utils/state.interface';
import { STORE_TOKENS } from '~/store-utils/tokens';

import { IApi } from '~/types/api.interface';
import IFormArticleValue from '~/types/form-article-value.interface';
import { IRequestGetNotesResponse } from '~/types/request-get-notes-response.interface';
import EStatus from '~/types/status.enum';
import { IArticle } from '~/types/article.interface';

import scopedNoteFactory from '~/utils/scoped-note-factory';
import { EEntitiesMutations } from '~/utils/store-entities';

import { IState } from './state';
import { EListMutations } from '~/utils/store-list';

export interface INoteEditSubmitPayload {
    id: number;
    formValue: IFormArticleValue;
}

export default {
    async [ECommonActions.GET]({ commit }, payload: number): Promise<void> {
        try {
            // @ts-ignore
            const $api: IApi = this.$api;

            commit(ECommonMutations.GET);

            const result: IRequestGetNotesResponse = await $api.notes.getNotes(payload, 3);

            commit(
                `${STORE_TOKENS.DATA_NOTES}/${EEntitiesMutations.UPSERT_ENTITIES}`,
                result.notes,
                { root: true }
            );
            commit(EEntitiesMutations.UPSERT_ENTITIES, result.notes.map(a => scopedNoteFactory(a)));
            commit(ECommonMutations.GET_SUCCESS, result);
        } catch (err) {
            console.log(err);

            commit(ECommonMutations.GET_ERROR, err);
        }
    },
    async [ECommonActions.EDIT]({ commit }, payload: INoteEditSubmitPayload): Promise<void> {
        try {
            // @ts-ignore
            const $api: IApi = this.$api;

            commit(
                EEntitiesMutations.UPSERT_ENTITY,
                { id: payload.id, editStatus: EStatus.PROCESSING, editError: null }
            );

            const result: IArticle = await $api
                .notes
                .updateNote(
                    payload.id,
                    { content: payload.formValue.content }
                );

            commit(
                `${STORE_TOKENS.DATA_NOTES}/${EEntitiesMutations.UPSERT_ENTITY}`,
                result,
                { root: true }
            );
            commit(
                EEntitiesMutations.UPSERT_ENTITY,
                { id: payload.id, editStatus: EStatus.SUCCESS, editError: null, form: { content: '' } }
            );
        } catch (err) {
            commit(
                EEntitiesMutations.UPSERT_ENTITY,
                { id: payload.id, editStatus: EStatus.ERROR, editError: err }
            );
        }
    },
    async [ECommonActions.DELETE]({ commit }, payload: number): Promise<void> {
        try {
            // @ts-ignore
            const $api: IApi = this.$api;

            commit(
                EEntitiesMutations.UPSERT_ENTITY,
                { id: payload, deleteStatus: EStatus.PROCESSING, editError: null }
            );

            await $api.notes.deleteNote(payload);

            commit(
                EListMutations.DELETE_ITEM,
                payload
            );
            commit(
                EEntitiesMutations.DELETE_ENTITY,
                payload
            );
            commit(
                `${STORE_TOKENS.DATA_NOTES}/${EEntitiesMutations.DELETE_ENTITY}`,
                payload,
                { root: true }
            );
        } catch (err) {
            console.log(err);

            commit(
                EEntitiesMutations.UPSERT_ENTITY,
                { id: payload, deleteStatus: EStatus.ERROR, editError: err }
            );
        }
    }
} as ActionTree<IState, IRootState>
