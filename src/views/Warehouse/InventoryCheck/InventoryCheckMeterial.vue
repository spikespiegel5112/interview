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
            <el-form-item label="生日" prop="birthday">
              <el-date-picker v-model="formData.birthday" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- <div slot="footer">
        <el-button class="blue" type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </div> -->
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
        "birthday": ''
      },

      rules: {
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'change'
        }],
        birthday: [{
          required: true,
          message: '请选择生日',
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
    getTableDataPromise(advanceQueryParams) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {

        })
      })
    },
    getTableData() {
      this.tableLoading = true
      let advanceQueryParams = JSON.parse(JSON.stringify(this.$trimParams(this.advanceQueryParams)))
      advanceQueryParams = Object.assign(advanceQueryParams, {
        updateDateStart: advanceQueryParams.updateDate instanceof Array ? advanceQueryParams
          .updateDate[0] || null : null,
        updateDateEnd: advanceQueryParams.updateDate instanceof Array ? advanceQueryParams
          .updateDate[1] || null : null,
        updateDate: null
      })
      this.getTableDataPromise(advanceQueryParams).then(response => {
        console.log('getTableData+++++', response)
        response = response.data
        this.tableData = response.content
        this.pagination = {
          page: response.pageRequest.page,
          size: response.pageRequest.size,
          limit: response.pageRequest.totalElements
        }
        this.availableAdvanceQueryParams = advanceQueryParams
        this.tableLoading = false
      }).catch(error => {
        this.tableLoading = false
      })

    },

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