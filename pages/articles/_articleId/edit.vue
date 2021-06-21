<template>
    <div>
        <FormArticle />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Provide } from 'nuxt-property-decorator';

import EditArticleFormService from '~/services/edit-article-form.service';
import ComponentFormArticle, { TOKEN_FORM_ARTICLE_SERVICE } from '~/components/articles/FormArticle.vue';

@Component({
    components: {
        FormArticle: ComponentFormArticle
    }
})
export default class PageNotes extends Vue {
  public get articleId(): number | null {
    const rawId: string | undefined = this.$route.params.articleId;

    if (rawId == null) {
      return null;
    }

    return +rawId;
  }

    @Provide(TOKEN_FORM_ARTICLE_SERVICE)
    private get editArticleFormService(): EditArticleFormService {
        return new EditArticleFormService(this.$store, this.articleId as number);
    }
}
</script>
