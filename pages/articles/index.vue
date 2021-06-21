<template>
  <div>
    <h1>Articles page</h1>
    <p>Articles data:</p>
    <table>
        <tbody>
            <ArticleItem
                v-for="article in articles"
                :key="article.id"
                :article="article"
                @delete="deleteHandler(article.id)"
            />
        </tbody>
    </table>
    <p>
        Pagination: {{ pagination }}
    </p>
    <button type="button" @click="previousPage">Previous page</button>
    <button type="button" @click="nextPage">Next page</button>
    <hr>
    <p>Page state:</p>
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
import { Component, Watch } from 'nuxt-property-decorator';

import ComponentArticleItem from '~/components/articles/ArticleItem.vue';

import { STORE_TOKENS } from '~/store-utils/tokens';
import { ECommonActions } from '~/store-utils/common/actions';
import { ECommonGetters } from '~/store-utils/common/getters';

import EStatus from '~/types/status.enum';
import { IArticle } from '~/types/article.interface';
import { IPagination } from '~/types/pagination.interface';

import { EGetters as EPageArticlesGetters } from '~/store/page-articles-list/getters';

@Component({
    components: { ArticleItem: ComponentArticleItem }
})
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

    public get pagination(): IPagination | null {
        return this.$store.getters[
            `${STORE_TOKENS.PAGE_ARTICLES_LIST}/${ECommonGetters.PAGINATION}`
        ]
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

    private getPage(page: number): void {
        this.$store.dispatch(
            `${STORE_TOKENS.PAGE_ARTICLES_LIST}/${ECommonActions.GET}`,
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

    public deleteHandler(articleId: number): void {
        this.$store.dispatch(`${STORE_TOKENS.PAGE_ARTICLES_LIST}/${ECommonActions.DELETE}`, articleId);
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
