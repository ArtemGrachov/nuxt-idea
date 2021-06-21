<template>
  <div>
    <h1>Notes page</h1>
    <hr>
    <p>Notes data:</p>
    <table>
        <tbody>
            <tr v-for="note in notes" :key="note.id">
                <td>{{ note.id }}</td>
                <td>{{ note }}</td>
            </tr>
        </tbody>
    </table>
    <hr>
    <p>Notes state:</p>
    <table>
        <tbody>
            <tr>
                <td>getStatus</td>
                <td>{{ getStatus }}</td>
            </tr>
            <tr>
                <td>getError</td>
                <td>{{ getError }}</td>
            </tr>
        </tbody>
    </table>
    <hr>
    <FormArticle />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Provide } from 'nuxt-property-decorator';

import CreateNoteFormService from '~/services/create-note-form.service';
import ComponentFormArticle, { TOKEN_FORM_ARTICLE_SERVICE } from '~/components/articles/FormArticle.vue';

import { EGetters as EPageNotesGetters } from '~/store/page-notes-list/getters';
import { STORE_TOKENS } from '~/store-utils/tokens';
import { ECommonActions } from '~/store-utils/common/actions';
import { ECommonGetters } from '~/store-utils/common/getters';

import { IArticle } from '~/types/article.interface';
import EStatus from '~/types/status.enum';

@Component({
    components: {
        FormArticle: ComponentFormArticle
    }
})
export default class PageNotes extends Vue {
    @Provide(TOKEN_FORM_ARTICLE_SERVICE)
    private get createNoteFormService(): CreateNoteFormService {
        return new CreateNoteFormService(this.$store);
    }

    public get notes(): IArticle | null {
        return this
            .$store
            .getters
            [`${STORE_TOKENS.PAGE_NOTES_LIST}/${EPageNotesGetters.NOTES}`];
    }

    public get getStatus(): EStatus {
        return this.$store.getters[
            `${STORE_TOKENS.PAGE_NOTES_LIST}/${ECommonGetters.GET_STATUS}`
        ];
    }

    public get getError(): any {
        return this.$store.getters[
            `${STORE_TOKENS.PAGE_NOTES_LIST}/${ECommonGetters.GET_ERROR}`
        ];
    }

    public async asyncData({ query, store, error }: any): Promise<void> {
        try {
            const rawPage: string = query.page;
            const page: number = isNaN(+rawPage) ? 1 : +rawPage;

            store.dispatch(
                `${STORE_TOKENS.PAGE_NOTES_LIST}/${ECommonActions.GET}`,
                page
            );
        } catch (err) {
            error(err);
        }
    }
}
</script>
