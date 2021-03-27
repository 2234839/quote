import { defineComponent, ref, watchEffect } from "vue";
import { useService } from "/@/hooks";
import { usePromiseComputed } from "/@/lib/vue.composition.api";
import CInput from "/@/components/base/input.vue";
import { sleep } from "/@/../common_ts";
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

    const { 切换应用, 粘贴 } = useService("RobotService");

    async function test() {
      切换应用();
      await sleep(50);
      粘贴();
    }
    return {
      searchStr,
      searchResults,
      test,
    };
  },
});
