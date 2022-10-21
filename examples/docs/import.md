## 导入

:::demo

```html

    <template>
        <div>
            <el-button type="priamry" @click="onOpen">open</el-button>
            <xn-import ref="import" :template-config="templateConfig" :show.sync="show" @on-import="handleImportFile">
            </xn-import>
        </div>
    </template>
    <script>
        export default {
            data(){
                return {
                    show:false,
                    templateConfig:{
                        url: '//i.xianniu.cn/accessory/2022/09/28/14fe799e59e5423eb40a2e3749f97e10.xlsx',
                        name: '导入部门公海线索模板'
                    }
                }
            },
            methods:{
                onOpen(){
                    this.show = true
                },
                handleImportFile(file){
                    console.log('file: ', file);
                    // 走接口
                    this.$refs.import.clearFiles() // 清除文件列表
                },

            }
        }
    </script>

```

:::

### 属性
| 参数           | 说明                     | 类型    | 可选值     | 默认值           |
| -------------- | ------------------------ | ------- | ---------- | ---------------- |
| show           | 是否打开导出             | boolean | true/false | false            |
| tip            | 提示                     | string  | -          | -                |
| accept         | 上传格式                 | array   | []         | ['.xls','.xlsx'] |
| templateConfig | 配置模板的下载地址和名称 | object  | {}         | {url:'',name:''} |

### 插槽
| 参数 | 说明     | 类型 | 可选值 | 默认值 |
| ---- | -------- | ---- | ------ | ------ |
| desc | 描述信息 | html | -      | -      |
