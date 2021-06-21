<template>
  <div>
    <h1>Notes page</h1>
    <hr>
    <p>Notes data:</p>
    <table>
        <tbody>
            <NotesItem
                v-for="note in notes"
                :key="note.id"
                :note="note"
            />
        </tbody>
    </table>
    <p>
        Pagination: {{ pagination }}
    </p>
    <button type="button" @click="previousPage">Previous page</button>
    <button type="button" @click="nextPage">Next page</button>
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
import { Component, Provide, Watch } from 'nuxt-property-decorator';

import CreateNoteFormService from '~/services/create-note-form.service';
import EditNoteContextService from '~/services/edit-note-context.service';

import ComponentFormArticle, { TOKEN_FORM_ARTICLE_SERVICE } from '~/components/articles/FormArticle.vue';
import ComponentNoteItem, { TOKEN_EDIT_NOTE_CONTEXT } from '~/components/notes/NotesItem.vue';

import { EGetters as EPageNotesGetters } from '~/store/page-notes-list/getters';
import { STORE_TOKENS } from '~/store-utils/tokens';
import { ECommonActions } from '~/store-utils/common/actions';
import { ECommonGetters } from '~/store-utils/common/getters';

import EStatus from '~/types/status.enum';
import { IArticle } from '~/types/article.interface';
import { IPagination } from '~/types/pagination.interface';

@Component({
    components: {
        FormArticle: ComponentFormArticle,
        NotesItem: ComponentNoteItem
    }
})
export default class PageNotes extends Vue {
    @Provide(TOKEN_FORM_ARTICLE_SERVICE)
    private get createNoteFormService(): CreateNoteFormService {
        return new CreateNoteFormService(this.$store);
    }

    @Provide(TOKEN_EDIT_NOTE_CONTEXT)
    private get editNoteContextService(): EditNoteContextService {
        return new EditNoteContextService(this.$store);
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

    public get pagination(): IPagination | null {
        return this.$store.getters[
            `${STORE_TOKENS.PAGE_NOTES_LIST}/${ECommonGetters.PAGINATION}`
        ]
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

    private getPage(page: number): void {
        this.$store.dispatch(
            `${STORE_TOKENS.PAGE_NOTES_LIST}/${ECommonActions.GET}`,
            page
        );
    }

    public previousPage(): void {
        if (!this.pagination) {
            return;
        }

        this.$router.push({
            query: {
                ...this.$route.query,
                page: (this.pagination.page - 1).toString()
            }
        });
    }

    public nextPage(): void {
        if (!this.pagination) {
            return;
        }

        this.$router.push({
            query: {
                ...this.$route.query,
                page: (this.pagination.page + 1).toString()
            }
        });
    }

    @Watch('$route.query.page')
    public onRoutePageChanged(newValue?: string): void {
        if (newValue == null) {
            return;
        }

        this.getPage(+newValue);
    }
}
</script>
