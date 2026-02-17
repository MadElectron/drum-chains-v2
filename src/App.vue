<script setup lang="ts"></script>

<template>
  <el-container id="app">
    <el-header></el-header>
    <el-main>
      <el-container> <RouterView /> </el-container
    ></el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<style scoped lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
  font-family:
    Inter, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
    '微软雅黑', Arial, sans-serif;
}
body {
  min-height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  padding-top: 20px;
  background: #fff;
}

.el-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  overflow-x: hidden;

  & > .el-container {
    width: 100%;
    max-width: 768px;
    padding: 20px;
  }
}
</style>
