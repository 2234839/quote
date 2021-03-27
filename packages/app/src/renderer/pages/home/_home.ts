import { defineComponent, ref, watchEffect } from "vue";
import { useService } from "/@/hooks";
import { usePromiseComputed } from "/@/lib/vue.composition.api";
import CInput from "/@/components/base/input.vue";
export default defineComponent({
  components: {
    CInput,
  },
  setup(props, context) {
    const { searchAll } = useService("SearchService");
    const searchStr = ref("");
    const searchResults = usePromiseComputed({
      getter() {
        return searchAll(searchStr.value);
      },
      defaultData: [],
    });

    watchEffect(() => {
      console.log(searchResults.value.data);
    });

    return {
      searchStr,
      searchResults,
    };
  },
});
