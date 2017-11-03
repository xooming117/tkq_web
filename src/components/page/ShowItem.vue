<template>
    <div>
        <div style="margin:10px">
            <el-input placeholder="请输入商品关键字" icon="search" v-model="name" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
            </el-input>
            <el-row type="flex" class="row-bg　ctag">
                <el-col :span="24">
                    <el-radio-group size="small" v-model="radio6">
                        <el-radio-button v-for="tt in tagss" :key="tt"　style="margin-left:0px;margin-top:5px" :label="tt" @click.native="handleTagClick(tt)"></el-radio-button>
                    </el-radio-group>
                </el-col>
            </el-row>
        </div>

        <el-row justify="space-between">
            <el-col :xs="8" :sm="8" :md="8" :lg="18">
             <span style="margin-left:20px">价格区间：</span>
             <el-input-number size="small" @change="handleChange1" v-model="numprice1" :min="0"></el-input-number>
             <el-input-number size="small" @change="handleChange2" v-model="numprice2" :min="0"></el-input-number>

             <span style="margin-left:20px">销量区间：</span>
             <el-input-number size="small" @change="handleChange3" v-model="numsales1" :min="0"></el-input-number>
             <el-input-number size="small" @change="handleChange4" v-model="numsales2" :min="0"></el-input-number>

             <span style="margin-left:20px">佣金区间：</span>
             <el-input-number size="small" @change="handleChange5" v-model="numyong1" :min="0"></el-input-number>
             <el-input-number size="small" @change="handleChange6" v-model="numyong2" :min="0"></el-input-number>
            </el-col>
            <el-col :xs="16" :sm="16" :md="16" :lg="6">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    :total="total">
                </el-pagination>
            </el-col>
        </el-row>

        <div style="text-align:left">
        <el-row style="background:#fff;margin-top:10px;">
            <el-col style="margin:10px 20px 10px 20px;background:#ff0;width:355px;" :xs="24" :sm="12" :md="8" :lg="4" v-for="(item, index) in itemdata" :key="item.id" :offset="1">
                <el-card :body-style="selectIndex === index?bb1:bb">
  
                        <div class="clearfix" v-bind:style="selectIndex === index?cc1:cc">
                            <div style='height:7px'></div>
                            <span style='font-size:16px; margin-top:10px; color:white; height:65px'>生成文案　｜</span>
                            <span style='font-size:16px; color:white; height:65px'>　复制文案</span> 
                        </div>

                        <a v-bind:href="item.auctionUrl" target="_blank">
                            <img v-on:mouseover="test(index)" v-bind:src="item.pictUrl" class="image">
                        </a>
                    <div style="padding: 14px;">
                        <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:18px;font-weight:bold">{{item.title}}</span>
                        <div class="bottom clearfix" style="color:#939393;margin-top: 25px;">
                            <span>券后：
                                <span style="color:red;font-size:28px;font-weight:bold">{{(item.zkPrice-item.couponAmount).toFixed(2)}}</span>　元</span>
                            <span class="button">月销：
                                <span style="color:red;font-size:28px">{{item.biz30day}}</span>
                            </span>
                        </div>
                        <div class="bottom clearfix" style="color:#939393;margin-top: 25px;">
                            <span>佣金：
                                <span style="color:red;font-size:28px;font-weight:bold">{{item.tkCommFee}}</span>
                            </span>
                            <span style="margin-left:10px;">{{yxjh[item.yxjh]}}:
                                <span style="color:red;font-size:28px">{{item.tkRate}}%</span>
                            </span>
                            <span class="button">
                                <i class="icons" v-bind:class="{ icons_shopB: item.userType==1}"　_id="shopB"></i>
                            </span>
                            <span class="button">
                                <i class="icons" v-bind:class="{ icons_shopC: item.userType==0}"　_id="shopB"></i>
                            </span>
                        </div>
                        <div class="demo1">
                            <a v-bind:href="item.couponShortLinkUrl" target="_blank" class="progress_container">
                                <em class="progress_bar tip" style="width:100%"></em>
                            </a>
                        </div>

                        <div  class="bottom clearfix" style="color:#000;margin-top: 25px;">
                            <span>券 <span style="color:rgb(54, 113, 177);font-size:16px;font-weight:bold">{{item.couponAmount}}</span> 元</span>
                            <span> / 余 <span style="color:rgb(54, 113, 177);font-size:16px;font-weight:bold">{{item.couponLeftCount}}</span> 张</span>
                            
                            <span class="button">
                                <span style="font-size:16px">时间：{{item.couponEffectiveStartTime.slice(5)}} / {{item.couponEffectiveEndTime.slice(5)}}</span>
                            </span>
                        </div>

                        <div class="bottom clearfix" style="color:#939393;margin-top:35px;">
                            <span style="color:rgb(54, 113, 177);font-size:14px;font-weight:bold"></span>
                            <span class="button" style="color:#ccc">
                                <i class="icon-home icon-hammer"></i>投诉</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        </div>

        <el-row :gutter="20">
            <el-col :span="24">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    :total="total">
                </el-pagination>
            </el-col>
        </el-row>
</div>

</template>

<script>
import axios from 'axios';
export default {
    data: function () {
        return {
            hot : 0,
            name:'',
            numprice1:0,
            numprice2:10000,

            numsales1:0,
            numsales2:10000,

            numyong1:0,
            numyong2:10000,

            pageSize:60,
            currentPage:1,
            total:0,

            yxjh: ['通用','营销','定向'],

            radio6: "女装",
            tagss: ["全部", "最热", "衣", "裤", "食", "书",　"闲", "童"],
            input2: '',
            itemdata: [],
            selectIndex: -1,
            bb: {position: 'relative', padding: '0px', margin: '0px', border: 'solid 1px white', width: '350px' },
            bb1: {position: 'relative', padding: '0px', margin: '0px', border: 'solid 1px blue' , width: '350px'},

            cc: {position: 'absolute', left:'0px', bottom:'230px', 
                    background:'#fff', width:'350px', height:'55px',display:'none'},
            cc1: {position: 'absolute', left:'0px', bottom:'250px', 'text-align':'center', 'margin-top':'30px',
                    background:'#00f', width:'350px', height:'40px', opacity: '0.6', display:'block'
                    },

            information: {
                pagination: {},
                data: []
            }
        }
    },
    methods: {
        handleCurrentChange() {
            console.log(this.currentPage)
            this.getData1()
        },
        handleSizeChange() {
            handleSizeChange
        },
        handleTagClick(tag) {
            console.log(tag)
            if("全部"===tag) {
               this.name=''
               this.hot = 0
            } else if("最热"===tag) {
               this.hot = 1
            } else {
                this.name = tag
                this.hot = 0
            }
            this.getData1()
        },
        handleIconClick(ev) {
            // alert(this.name + '111')
            this.getData1()
        },
        changePage(values) {
            this.information.pagination.per_page = values.perpage;
            this.information.data = this.information.data;
        },
        onSearch(searchQuery) {
            this.query = searchQuery;
        },
        changeBorder() {
            alert(11);
        },
        test(index) {
            this.selectIndex = index;
            console.log(this.ind);
        },
        handleChange1 (value) {
            this.numprice1 = value;
            this.getData1()
        },
        handleChange2 (value) {
            this.numprice2 = value;
            this.getData1()
        },
        handleChange3 (value) {
            this.numsales1 = value;
            this.getData1()
        },
        handleChange4 (value) {
            this.numsales2 = value;
            this.getData1()
        },
        handleChange5 (value) {
            this.numyong1 = value;
            this.getData1()
        },
        handleChange6 (value) {
            this.numyong2 = value;
            this.getData1()
        },
        getData1: function () {
            var pageinfo = {};

            pageinfo.hot = this.hot;
            pageinfo.skip = (this.currentPage - 1) * this.pageSize;
            pageinfo.limit = this.pageSize;
            if (this.name) {
                pageinfo.name = this.name
            }

            pageinfo.coupon_price1 = this.numprice1;
            pageinfo.coupon_price2 = this.numprice2;
            pageinfo.volume1 = this.numsales1;
            pageinfo.volume2 = this.numsales2;
            pageinfo.commission_rate1 = this.numyong1;
            pageinfo.commission_rate2 = this.numyong2;

            if (pageinfo.coupon_price1 >= pageinfo.coupon_price2) {
                pageinfo.coupon_price1 = pageinfo.coupon_price2 - 1
            }
            if (pageinfo.volume1 >= pageinfo.volume2) {
                pageinfo.volume1 = pageinfo.volume2 - 1
            }
            if (pageinfo.commission_rate1 >= pageinfo.commission_rate2) {
                pageinfo.commission_rate1 = pageinfo.commission_rate2 - 1
            }

            console.log(JSON.stringify(pageinfo))

            var instance = axios.create();
            instance.defaults.timeout = 2500;
            instance.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token')
            //instance.defaults.headers.common['X-Custom-Header'] = JSON.stringify(pageinfo);
            instance.get("http://118.178.95.171:3030/api/v1/os/tbk_database/goods", {params:pageinfo}).then((res) => {
                console.log(res.data);
                this.itemdata = res.data.data;
                this.total = res.data.total;
            });
        }
    },
    computed: {
        computeStyle() {
            return {
                padding: '5px', margin: '0px', border: !this.ind ? 'solid 1px red' : 'solid 1px blue'
            }
        },

        getData() {
            const self = this;
            return self.information.data.filter(function (d) {
                if (d.name.indexOf(self.query) > -1) {
                    return d;
                }
            })
        }
    },
    beforeMount() {
        this.getData1()
    }
}
</script>

<style>
el-col hover {
    color: #FFF;
    border: 1px solid #F00
}

.demo1 {
    width: 100%;
    margin: auto;
    margin-top: 20px;
}

.progress_container {
    height: 10px;
    overflow: hidden;
    background-color: lightgray;
    display: block;
    border-radius: 50px;
}

.tags {
    float: left;
    padding: 10px;
    border: 1px soild #1D8CE0;
}

.ctag {
    margin-top: 5px;
}

.header {
    width: 100%;
    background: #E5E9F2
}

.center {
    margin-top: 5px;
    height: 60px;
    width: 100%;
    margin-top: 20px;
    background: #f00;
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
    width: 350px;
    height: 350px;
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