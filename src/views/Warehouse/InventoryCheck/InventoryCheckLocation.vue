<template>
  <div class="common_table_container">
    <div class="form_wrapper">
      <el-form
        ref="formData"
        :rules="rules"
        :model="formData"
        label-width="80px"
        label-position="top"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-select v-model="formData.age" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <!-- <el-button class="blue" type="primary" @click="handleSubmit">提交</el-button> -->
        <!-- <el-button @click="reset">重置</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InventoryCheckLocation',
  components: {

  },
  data() {
    return {
      formData: {
        "name": '',
        "age": ''
      },
      options: [{
        value: 0,
        label: '20-29'
      }, {
        value: 1,
        label: '30-39'
      }, {
        value: 2,
        label: '40-49'
      }, {
        value: 3,
        label: 'etc'
      }],
      rules: {
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'change'
        }],
        age: [{
          required: true,
          message: '请选择年龄',
          trigger: 'change'
        }],
      },
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {


  },
  methods: {

    async handleEdit(scope) {
      this.dialogVisible = true
      this.dialogType = 1
      await this.$nextTick()
      this.formData = {
        "name": scope.row.name,
        "birthday": scope.row.birthday
      }
    },

    handleSubmit() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.$message.success('提交成功')
        }
      })

    },
    reset() {
      this.$refs.formData.resetFields()
    },




  }
}

</script>

<style lang="scss" scoped></style>