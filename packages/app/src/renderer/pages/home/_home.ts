import { defineComponent, ref, watchEffect } from "vue";
import { useClipboard, useIpc, useService } from "/@/hooks";
import { usePromiseComputed } from "/@/lib/vue.composition.api";
import CInput from "/@/components/base/input.vue";
import { mainWindowState } from "/@shared/hook/ipc";
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
      console.log("[mainWindowState]", mainWindowState);
    });

    watchEffect(() => {
      console.log("searchResults", searchResults.value.data);
    });
    watchEffect(() => {
      console.log("mainWindowState", mainWindowState.value.isShow);
    });

    const { 切换应用, 粘贴, test: Test2 } = useService("RobotService");

    async function test() {
      // const ipc = useIpc();
      // console.log("[ipc.on]", ipc.on);
      // ipc.send("a", Date.now());
      // Test2();
      mainWindowState.value = { ...mainWindowState.value, isShow: false };
    }
    const clipboard = useClipboard();
    async function paste(s: string) {
      切换应用();
      clipboard.writeText(s);
      粘贴();
    }
    return {
      searchStr,
      searchResults,
      test,
      paste,
    };
  },
});
