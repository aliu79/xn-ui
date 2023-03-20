<template>
  <div>
    <xn-tag
      :key="item"
      v-for="item in ['grey', 'blue', 'yellow', 'orange', 'red', 'green']"
      :default-color="item"
      effect="dark"
      icon="el-icon-edit"
      >
      
      Tag</xn-tag
    >
  </div>
</template>

<script>
export default {};
</script>