<template>
  <div style="background-color: #ccc">
    <xn-card title="什么东西" :body-style="{ padding: '18px 0' }">
      <template #more>
        <el-button-group>
          <el-button type="" size="mini">1111</el-button>
          <el-button type="" size="mini">22222</el-button>
        </el-button-group>
        <el-button class="ml-20" type="primary" size="mini">按钮</el-button>
      </template>
      <xn-table border :columns="[{ label: 'ID', prop: 'id' }]" :data="[{id:123}]"></xn-table>
    </xn-card>
    <xn-card title="什么玩意">
      <el-descriptions>
        <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
        <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
        <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-tag size="small">学校</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="联系地址"
          >江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item
        >
      </el-descriptions>
    </xn-card>
    <xn-card title="啐！">
     <xn-empty></xn-empty>
    </xn-card>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>