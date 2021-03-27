<template>
  <input
    class="px-2 rounded-sm text-base bg-gray-200"
    type="text"
    :value="modelValue"
    @input="onInput"
    placeholder="输入需要搜索的内容"
  />
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";

export default defineComponent({
  props: {
    modelValue: String,
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    function onInput(e: Event) {
      ctx.emit("update:modelValue", (<HTMLInputElement>e.target!).value);
    }
    return { onInput };
  },
});
</script>
