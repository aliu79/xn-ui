## 文本省略

对长文本进行省略，支持展开/收起，默认溢出显示'...'，显示`el-tooltip`，支持自定义插槽。


:::demo
```html
    <template>
        <div class="app-container">
            <xn-text :content="msg" :rows="2" showAction></xn-text>
            <div class="mt-20 mb-20">
                <hr />
            </div>
            <el-descriptions title="配合描述列表使用">
                <el-descriptions-item label="标签">
                    <xn-text :content="msg" show-action></xn-text>
                </el-descriptions-item>
                <el-descriptions-item label="标签">
                    <xn-text :content="msg">
                    <el-link
                        :underline="false"
                        type="success"
                        @click="$confirm('关上！', '友情提示', { type: 'error',showCancelButton:false,confirmButtonText:'好的' })"
                        >点击插槽按钮</el-link
                    >
                    </xn-text>
                </el-descriptions-item>
                <el-descriptions-item label="标签">
                    <xn-text empty-text="缺省默认值"></xn-text>
                </el-descriptions-item>
                <el-descriptions-item label="默认空值">
                    <xn-text :content="text"></xn-text>
                </el-descriptions-item>
                <el-descriptions-item label="标签">
                    <xn-text :content="msg" class="text-primary"></xn-text>
                </el-descriptions-item>
                <el-descriptions-item label="标签">
                    <xn-text :content="msg" class="text-success"></xn-text>
                </el-descriptions-item>
                <el-descriptions-item label="六个字的标签">
                    <xn-text @click-action="onClickAction" :content="msg" :rows="3" show-action></xn-text>
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </template>
    <script>
        export default {
            data() {
                return {
                    text: null,
                    msg: "先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。　　宫中府中，俱为一体；陟罚臧否，不宜异同。若有作*犯科及为忠善者，宜付有司论其刑赏，以昭陛下平明之理，不宜偏私，使内外异法也。侍中、侍郎郭攸之、费祎、董允等，此皆良实，志虑忠纯，是以先帝简拔以遗陛下。愚以为宫中之事，事无大小，悉以咨之，然后施行，必能裨补阙漏，有所广益。将军向宠，性行淑均，晓畅军事，试用于昔日，先帝称之曰能，是以众议举宠为督。愚以为营中之事，悉以咨之，必能使行阵和睦，优劣得所。亲贤臣，远小人，此先汉所以兴隆也；亲小人，远贤臣，此后汉所以倾颓也。先帝在时，每与臣论此事，未尝不叹息痛恨于桓、灵也。侍中、尚书、长史、参军，此悉贞良死节之臣，愿陛下亲之信之，则汉室之隆，可计日而待也。臣本布衣，躬耕于南阳，苟全性命于乱世，不求闻达于诸侯。先帝不以臣卑鄙，猥自枉屈，三顾臣于草庐之中，咨臣以当世之事，由是感激，遂许先帝以驱驰。后值倾覆，受任于败军之际，奉命于危难之间，尔来二十有一年矣。先帝知臣谨慎，故临崩寄臣以大事也。受命以来，夙夜忧叹，恐托付不效，以伤先帝之明；故五月渡泸，深入不毛。今南方已定，兵甲已足，当奖率三军，北定中原，庶竭驽钝，攘除*凶，兴复汉室，还于旧都。此臣所以报先帝而忠陛下之职分也。至于斟酌损益，进尽忠言，则攸之、祎、允之任也。愿陛下托臣以讨贼兴复之效，不效，则治臣之罪，以告先帝之灵。若无兴德之言，则责攸之、祎、允等之慢，以彰其咎；陛下亦宜自谋，以咨诹善道，察纳雅言，深追先帝遗诏。臣不胜受恩感激。今当远离，临表涕零，不知所言。",
                }
            },
            methods:{
                onClickAction(val,event){
                    console.log(val,event)
                }
            }
        }
    </script>
```
:::
### 参数

| 参数     | 说明         | 类型    | 可选值     | 默认值 |
| -------- | ------------ | ------- | ---------- | ------ |
| rows    | 最大行数     | number    | -          | 1      |
| content | 文本内容     | string    | -          | -      |
| show-action | 是否显示展开收起按钮 | boolean | - | false |
| expand-text | 展开按钮文字  | string | - | 展开 |
| collapse-text | 收起按钮文字  | string | - | 收起 |
| trigger | 触发方式  | string | hover/click | click |
| empty-text | 空值显示内容 | string | - |'-' |


### 插槽

| 参数     | 说明         | 类型    | 可选值     | 默认值 |
| -------- | ------------ | ------- | ---------- | ------ |
| -    | 内容插槽     | -  | -          | -      |