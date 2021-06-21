<template>
  <div>
    <h1>Notes page</h1>
    <p>Notes data:</p>
    <table>
        <tbody>
            <tr v-for="note in notes" :key="note.id">
                <td>{{ note.id }}</td>
                <td>{{ note }}</td>
            </tr>
        </tbody>
    </table>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { STORE_TOKENS } from '~/store-utils/tokens';
import { ECommonActions } from '~/store-utils/common/actions';
import { IArticle } from '~/types/article.interface';
import EStatus from '~/types/status.enum';
import { ECommonGetters } from '~/store-utils/common/getters';
import { EGetters as EPageNotesGetters } from '~/store/page-notes-list/getters';

@Component({})
export default class PageNotes extends Vue {
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
