<template>
  <div>
    <h1>Articles page</h1>
    <p>Articles data:</p>
    <table>
        <tbody>
            <tr v-for="article in articles" :key="article.id">
                <td>{{ article.id }}</td>
                <td>{{ article }}</td>
            </tr>
        </tbody>
    </table>
    <p>Pase state:</p>
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
import { EGetters as EPageArticlesGetters } from '~/store/page-articles-list/getters';

@Component({})
export default class PageArticlesIndex extends Vue {
  public get articles(): IArticle | null {
    return this
        .$store
        .getters
        [`${STORE_TOKENS.PAGE_ARTICLES_LIST}/${EPageArticlesGetters.ARTICLES}`];
  }

  public get getStatus(): EStatus {
    return this.$store.getters[
      `${STORE_TOKENS.PAGE_ARTICLES_LIST}/${ECommonGetters.GET_STATUS}`
    ];
  }

  public get getError(): any {
    return this.$store.getters[
      `${STORE_TOKENS.PAGE_ARTICLES_LIST}/${ECommonGetters.GET_ERROR}`
    ];
  }

  public async asyncData({ query, store, error }: any): Promise<void> {
    try {
        const rawPage: string = query.page;
        const page: number = isNaN(+rawPage) ? 1 : +rawPage;

        store.dispatch(
            `${STORE_TOKENS.PAGE_ARTICLES_LIST}/${ECommonActions.GET}`,
            page
        );
    } catch (err) {
      error(err);
    }
  }
}
</script>
