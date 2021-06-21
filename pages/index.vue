<template>
  <div>
    <h1>Vuex example main page</h1>
    <ul>
      <li>

      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { ECommonActions } from '~/store-utils/common/actions';
import { STORE_TOKENS } from '~/store-utils/tokens';

@Component({})
export default class PageIndex extends Vue {
    public mounted(): void {
        this.$store.dispatch(`${STORE_TOKENS.PAGE_ARTICLE}/${ECommonActions.GET}`);
    }
}
</script>
