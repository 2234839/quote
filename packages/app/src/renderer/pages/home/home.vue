<template>
  <div class="container">
    <div class="card flex">
      搜索：
      <c-input
        type="text"
        v-model="searchStr"
        placeholder="输入需要搜索的内容"
      />
    </div>
    <div class="card">
      <div v-if="searchResults.pending">搜索中</div>
      <div class="card" v-for="(item, index) in searchResults.data">
        {{ item.html }}
      </div>
    </div>
  </div>
</template>

<script src="./_home" lang="ts"></script>
