<template>
  <div class="xn-tree">
    <el-tree
      ref="tree"
      class="xn-tree-main"
      :data="data"
      :indent="0"
      default-expand-all
      :check-strictly="true"
      :props="defaultProps"
      :node-key="nodeKey"
      show-checkbox
      :render-content="renderContent"
      @check="clickDeal"
    />
  </div>
</template>

<script>
export default {
  name: 'XnTree',
  props: {
    data: {
      type: Array,
      default: () => {}
    },
    nodeKey: {
      type: String,
      default: 'menuId'
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: 'bossApplicationMenuVOS',
          label: 'menuName'
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.changeTreeClass()
    })
  },
  methods: {
    getCheckedKeys() {
      return this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys())
    },
    setCheckedKeys(data = []) {
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(data)
      })
    },
    renderContent(h, { data }) {
      let className = ''
      // let className1 = ''
      // perms这个是后台数据区分普通tree节点和横向tree节点的标志各位要根据实际情况做相对应的修改
      if (
        data.parentId &&
        data.parentId !== 0 &&
        !data[this.defaultProps.children].length
      ) {
        className = 'especially'
      }
      // if (!node.isLeaf) {
      //   node.parent.className1 = 'pl-20'
      // } else {
      //   className1 = 'pl-0'
      // }
      return (
        // 在需要做横向排列的模块做标记
        <div class={[className]}>{data[this.defaultProps.label]}</div>
      )
    },

    // 改变tree节点样式

    changeTreeClass() {
      // 找到之前做标记的class
      // var classDomList = document.getElementsByClassName('especially')
      // // 改变这几个样式
      // for (var i = 0; i < classDomList.length; i++) {
      //   // classDomList[i].parentNode.style.cssText = 'float: left'
      //   classDomList[i].parentNode.className =
      //     'el-tree-node__content option-wrapper'
      //   classDomList[i].parentNode.style.marginLeft =
      //     '-25px'
      // }
    },
    clickDeal(currentObj, treeStatus) {
      this.clickCheck(currentObj, treeStatus, this.$refs.tree)
    },
    clickCheck(currentObj, treeStatus, ref) {
      // 用于：父子节点严格互不关联时，父节点勾选变化时通知子节点同步变化，实现单向关联。
      const selected = treeStatus.checkedKeys.indexOf(currentObj[this.nodeKey]) // -1未选中
      // 选中
      if (selected !== -1) {
        // 子节点只要被选中父节点就被选中
        this.selectedParent(currentObj, ref)
        // 统一处理子节点为相同的勾选状态
        this.uniteChildSame(currentObj, true, ref)
      } else {
        // 取消子节点的选中状态触发
        if (currentObj.parentId !== -1) {
          this.removeParent(currentObj, ref)
        }

        // 未选中 处理子节点全部未选中
        if (
          currentObj[this.defaultProps.children] &&
          currentObj[this.defaultProps.children].length !== 0
        ) {
          this.uniteChildSame(currentObj, false, ref)
        }
      }
      this.$emit('on-check', this.getCheckedKeys())
    },
    /**   统一处理子节点为相同的勾选状态  **/
    uniteChildSame(treeList, isSelected, ref) {
      const treeListData = treeList[this.defaultProps.children] || []
      const len = treeListData.length

      ref.setChecked(treeList[this.nodeKey], isSelected)

      for (let i = 0; i < len; i++) {
        this.uniteChildSame(treeListData[i], isSelected, ref)
      }
    },

    /**    统一处理父节点为选中    **/
    selectedParent(currentObj, ref) {
      const currentNode = ref.getNode(currentObj)
      if (currentNode.parent.key !== undefined) {
        ref.setChecked(currentNode.parent, true)
        return this.selectedParent(currentNode.parent, ref)
      }
    },

    /**    子节点全没选中取消父级的选中状态   **/
    removeParent(currentObj, ref) {
      let a = 0
      let b = 0
      const currentNode = ref.getNode(currentObj)
      if (currentNode.parent !== null) {
        if (currentNode.parent.key !== undefined) {
          ref.setChecked(currentNode.parent, true) // 根节点
          this.removeParent(currentNode.parent, ref) // 递归判断子节点
        }
      }

      // 不为0表示为父节点
      if (currentNode.childNodes.length !== 0) {
        // 循环判断父节点下的子节点
        for (let i = 0; i < currentNode.childNodes.length; i++) {
          // 判断父节点下的子节点是否全为false
          if (currentNode.childNodes[i].checked === false) {
            ++a

            // a === currentNode.childNodes.length 表明子节点全为false
            if (a === currentNode.childNodes.length) {
              // 等于 undefined 跳过,不等于继续执行
              if (currentNode.childNodes[i].parent.key !== undefined) {
                ref.setChecked(currentNode.childNodes[i].parent, false) // 父元素设置为false
                // 循环上级父节点下的子节点
                for (let i = 0; i < currentNode.parent.childNodes.length; i++) {
                  // 判断父节点下的子节点是否全为false
                  if (currentNode.parent.childNodes[i].checked === false) {
                    ++b

                    // b === currentNode.parent.childNodes.length 表明子节点全为false
                    if (b === currentNode.parent.childNodes.length) {
                      ref.setChecked(currentNode.parent.key, false) // 父元素设置为false
                      return this.removeParent(currentNode.parent, ref) // 继续递归循环判断
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">

</style>
