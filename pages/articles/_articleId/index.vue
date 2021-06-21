<template>
  <div>
    <h1>Article page</h1>
    <p>Article data:</p>
    <p>
      {{ article }}
    </p>
    <p>Scoped article state:</p>
    <table>
      <tr>
        <td>getStatus</td>
        <td>{{ getStatus }}</td>
      </tr>
      <tr>
        <td>getError</td>
        <td>{{ getError }}</td>
      </tr>
      <tr>
        <td>editStatus</td>
        <td>{{ editStatus }}</td>
      </tr>
      <tr>
        <td>editError</td>
        <td>{{ editError }}</td>
      </tr>
      <tr>
        <td>deleteStatus</td>
        <td>{{ deleteStatus }}</td>
      </tr>
      <tr>
        <td>deleteError</td>
        <td>{{ deleteError }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "nuxt-property-decorator";
import { STORE_TOKENS } from "~/store-utils/tokens";
import { ECommonActions } from "~/store-utils/common/actions";
import { IArticle } from "~/types/article.interface";
import { EEntitiesGetters } from "~/utils/store-entities";
import EStatus from "~/types/status.enum";
import { ECommonGetters } from "~/store-utils/common/getters";

@Component({})
export default class PageArticle extends Vue {
  public get articleId(): number | null {
    const rawId: string | undefined = this.$route.params.articleId;

    if (rawId == null) {
      return null;
    }

    return +rawId;
  }

  public get article(): IArticle | null {
    if (this.articleId == null) {
      return null;
    }

    return (
      this.$store.getters[
        `${STORE_TOKENS.DATA_ARTICLES}/${EEntitiesGetters.ENTITIES}`
      ][this.articleId] || null
    );
  }

  public get getStatus(): EStatus {
    return this.$store.getters[
      `${STORE_TOKENS.PAGE_ARTICLE}/${ECommonGetters.GET_STATUS}`
    ];
  }

  public get getError(): any {
    return this.$store.getters[
      `${STORE_TOKENS.PAGE_ARTICLE}/${ECommonGetters.GET_ERROR}`
    ];
  }

  public get editStatus(): EStatus {
    return this.$store.getters[
      `${STORE_TOKENS.PAGE_ARTICLE}/${ECommonGetters.EDIT_STATUS}`
    ];
  }

  public get editError(): any {
    return this.$store.getters[
      `${STORE_TOKENS.PAGE_ARTICLE}/${ECommonGetters.EDIT_ERROR}`
    ];
  }

  public get deleteStatus(): EStatus {
    return this.$store.getters[
      `${STORE_TOKENS.PAGE_ARTICLE}/${ECommonGetters.DELETE_STATUS}`
    ];
  }

  public get deleteError(): any {
    return this.$store.getters[
      `${STORE_TOKENS.PAGE_ARTICLE}/${ECommonGetters.DELETE_ERROR}`
    ];
  }

  public async asyncData({ params, store, error, app }: any): Promise<void> {
    try {
      const rawId: string = params.articleId;
      const articleId: number = +rawId;

      store.dispatch(
        `${STORE_TOKENS.PAGE_ARTICLE}/${ECommonActions.GET}`,
        articleId
      );
    } catch (err) {
      error(err);
    }
  }
}
</script>
