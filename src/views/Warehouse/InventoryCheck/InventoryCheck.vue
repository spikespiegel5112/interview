<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleChooseTab" type="card">
      <el-tab-pane name="inventoryCheckMeterial">
        <span slot="label">
          <i class="el-icon-warning-outline" v-if="!componentsDictionary[0].validated"></i> 普通顾客
        </span>
        <InventoryCheckMeterial ref="inventoryCheckMeterial"></InventoryCheckMeterial>
      </el-tab-pane>
      <el-tab-pane name="inventoryCheckLocation">
        <span slot="label">
          <i class="el-icon-warning-outline" v-if="!componentsDictionary[1].validated"></i> VIP顾客
        </span>
        <InventoryCheckLocation ref="inventoryCheckLocation"></InventoryCheckLocation>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer">
      <el-button class="blue" type="primary" @click="handleSubmit">提交</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script>
import InventoryCheckLocation from './InventoryCheckLocation.vue'
import InventoryCheckMeterial from './InventoryCheckMeterial.vue'
export default {
  name: 'InventoryCheck',
  components: {
    InventoryCheckLocation,
    InventoryCheckMeterial
  },
  data() {
    return {
      componentsDictionary: [{
        name: 'inventoryCheckMeterial',
        validated: true
      }, {
        name: 'inventoryCheckLocation',
        validated: true
      }],
      activeName: 'inventoryCheckMeterial',
      tableDictionary: ["inventoryCheckMeterial", "inventoryCheckLocation"]
    }
  },
  computed: {
    dialogStatus() {
      return this.dialogType === 0 ? '创建' : '编辑'
    },
    tableHeight() {
      return 'calc(100vh - 340px)'
    }
  },
  mounted() {
    this.getTab()
  },
  methods: {
    getTab() {
      const result = this.tableDictionary.find(item => item === this.$route.query.tabName)
      this.activeName = result ? result : this.activeName
    },
    handleChooseTab(data) {
      const path = this.$route.path;
      let location = {
        path,
        query: {
          tabName: data.name
        }
      }
      this.$router.push(location);
    },
    handleSubmit() {
      console.log(this.$refs)
      let result = true
      this.componentsDictionary.map(item2 => {
        return Object.assign(item2, {
          validated: true
        })
      })
      Object.keys(this.$refs).forEach(item => {
        this.$refs[item].$refs.formData.validate(valid => {
          if (!valid) {
            this.componentsDictionary.forEach((item2, index2) => {
              if (item2.name === item) {
                this.componentsDictionary[index2].validated = false
              }
            })
            result = false
          }

        })
      })

      if (result) {
        this.$message.success('提交成功')
      } else {
        this.$message.warning('表单验证未通过')
      }

    },
    reset() {
      Object.keys(this.$refs).forEach(item => {
        this.$refs[item].$refs.formData.resetFields()
      })
      this.componentsDictionary.map(item2 => {
        return Object.assign(item2, {
          validated: true
        })
      })
    },

  }
}

</script>

<style lang="scss" scoped></style>