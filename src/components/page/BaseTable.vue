  <template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-pagination small layout="prev, pager, next" @size-change="pageSizeChange" @current-change="pageCurrentChange" :total="total" :page-size="pageSize" :current-page="currentPage">
                </el-pagination>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="createAt" label="日期" width="210"></el-table-column>

                    <el-table-column label="商品ID" width="140">
                        <template scope="scope">
                            <span style="margin-left: 0px"><a target="_blank" :href="'https://item.taobao.com/item.htm?id='+scope.row.num_iid">{{ scope.row.num_iid }}</a></span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="oldtitle" label="名称" width="360"></el-table-column>
                    <el-table-column sortable prop="coupon_start_time" label="开始" width="100"></el-table-column>
                    <el-table-column sortable prop="coupon_end_time" label="结束" width="100"></el-table-column>
                    <el-table-column sortable prop="price" label="原价" width="100"></el-table-column>
                    <el-table-column sortable prop="quan" label="优惠券" width="100"></el-table-column>
                    <el-table-column sortable prop="yugu_price" label="佣金" width="100"></el-table-column>
                    <el-table-column sortable prop="volume" label="销量" width="100"></el-table-column>

                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-pagination small layout="prev, pager, next" @size-change="pageSizeChange" @current-change="pageCurrentChange" :total="total" :page-size="pageSize" :current-page="currentPage">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios';
import Datasource from 'vue-datasource';
export default {

    data() {
        return {
            tableData: [],
            total: 0,
            currentPage: 1,
            pageSize: 20
        }
    },

    methods: {
        delete: function(index,data) {
        this.$confirm('此操作将该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.deleteData(data.num_iid)
            this.tableData.splice(index,1)
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
        pageSizeChange: function (size) {
            this.pageSize = size
            console.log("size:" + size)
        },
        pageCurrentChange: function (currentPage) {
            this.currentPage = currentPage
            console.log("currentPage:" + currentPage)
            this.getData()
        },
        handleEdit: function(index, row) {
            alert(index + '---' + JSON.stringify(row))
        },
        handleDelete: function(index, row) {
            this.delete(index, row)
        },
        getData: function () {
            var instance = axios.create();
            instance.defaults.timeout = 2500;
            var pageinfo = {};
            pageinfo.skip = (this.currentPage - 1) * this.pageSize;
            pageinfo.limit = this.pageSize;
            console.log(JSON.stringify(pageinfo))
            // instance.defaults.headers.common['X-Custom-Header'] = JSON.stringify(pageinfo);
            // instance.get("http://localhost:3030/api/v1/items").then((res) => {
            //     console.log(res.data);
            //     this.tableData = res.data.data;
            //     this.total = res.data.total;
            // });
        },
        deleteData: function (id) {
            var instance = axios.create();
            instance.defaults.timeout = 2500;
            // instance.delete("http://localhost:3030/api/v1/items/"+id).then((res) => {
            //     console.log(res.data);
            //     this.tableData = res.data.data;
            //     this.total = res.data.total;
            // });
        }
    },

    created() {
        this.getData()
    }

}
</script>

<style>
el-col hover {
    color: #FFF;
    border: 1px solid #F00
}

.active {
    padding: '5px';
    margin: '0px';
    border: 'solid 1px red'
}

.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>