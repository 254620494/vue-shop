
<template>
  <div id="app">
    
    <div class="container">
      <div class="cart">
        <div class="checkout-title">
          <span>购物车</span>
        </div>

        <!-- table -->
        <div class="item-list-wrap">
          <div class="cart-item">
            <div class="cart-item-head">
              <ul>
                <li>商品信息</li>
                <li>商品金额</li>
                <li>商品数量</li>
                <li>总金额</li>
                <li>编辑</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="(item,index) in productList">
                <div class="cart-tab-1">
                  <div class="cart-item-check">
                    <a href="javascript:void 0" class="item-check-btn" v-bind:class="{check:item.check}" @click="checkLeft(item)">
                      <svg class="icon icon-ok"><use xlink:href="#icon-ok"></use></svg>
                    </a>
                  </div>
                  <div class="cart-item-pic">
                    <img v-bind:src="item.imgPic">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.name}}</div>
                  </div>
                  <div class="item-include">
                    <dl>
                      <dd v-for="(items,indexx) of item.gifts">{{items.partName}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">{{item.price | money("元")}}</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self select-self-open">
                      <div class="quantity">
                        <a href="javascript:void 0" @click="change(item,-1)">-</a>
                        <input type="text" value="0" v-model="item.amount" >
                        <a href="javascript:void 0"  @click="change(item,1)">+</a>
                      </div>
                    </div>
                    <div class="item-stock">有货</div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{item.amount*item.price| money("元")}}</div>
                </div>
                <div class="cart-tab-5">
                  <div class="cart-item-operation">
                    <a href="javascript:void 0" class="item-edit-btn" @click="deleteItem(item)">
                    	删除
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- footer -->
        <div class="cart-foot-wrap">
          <div class="cart-foot-l">
            <div class="item-all-check">
              <a href="javascript:void 0">
                    <span class="item-check-btn" :class="{check:checkPoint}"  >
                      <svg class="icon icon-ok"><use xlink:href="#icon-ok"></use></svg>
                    </span>
              </a>
            </div>
            <div class="item-all-check">
              <a href="javascript:void 0" class="item-del-btn" @click="checkAll(true)">
                <span>全选</span>
              </a>
            </div>
            <div class="item-all-del">
              <a href="javascript:void 0" class="item-del-btn" @click="checkAll(false)">
                <span style="margin-left: 20px">取消全选</span>
              </a>
            </div>
          </div>
          <div class="cart-foot-r">
            <div class="item-total">
              Item total: <span class="total-price" >{{totalMoney| money("元")}}</span>
            </div>
            <div class="next-btn-wrap">
             	<router-link :to="'/address'"><a class="btn btn--red" style="width: 200px">结账</a></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="md-modal modal-msg md-modal-transition" id="showModal" v-bind:class="{'md-show':deleteShow}">
      <div class="md-modal-inner">
        <div class="md-top">
          <button class="md-close" >关闭</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <p id="cusLanInfo" >你确认删除此订单信息吗?</p>
          </div>
          <div class="btn-wrap col-2">
            <button class="btn btn--m" id="btnModalConfirm" @click="delConfirm">Yes</button>
            <button class="btn btn--m btn--red" id="btnModalCancel" @click="deleteShow=false">No</button>
          </div>
        </div>
      </div>
    </div>
  <div class="md-overlay" v-if="deleteShow"></div>
  </div>
</template>



<script>
	import Vue from 'vue';
  import VueResource from 'vue-resource';
  Vue.use(VueResource);
  
  Vue.filter('money', function (value,index) {
  	value = Number(value)
		return  "￥ "+ value.toFixed(2)+ index
	})
  
  
	export default {
	name: 'ddz',
	data: function() {
		return {
			productList:[1, 2, 3, 4],
			name:'',
			amount: 0,
			checkPoint: false,
			totalMoney: 0,
			deleteShow: false,
			confirmIndex: ''
		}
	},
	mounted: function () {
	  this.$nextTick(function () {
	    this.getData();// Code that will run only after the
	    // entire view has been rendered
	  })
	},
	
	methods: {
		getData () {
			var _this=this;
			this.$http.get('../static/data/cart.json').then(function(res){
				console.log(res.body)
				_this.productList=res.body.result.list;
				_this.price=_this.productList.price;
				_this.name=_this.productList.name;
				_this.amount=_this.productList.amount;
			//	_this.partName=_this.productList.gifts.partName;
			})
		},
		change (item,x) {
			if(x==1){
				item.amount++;
				this.totalMoneyy();
			}if(x==-1){
				item.amount--;
				if(item.amount<2){
					item.amount=1;
					this.totalMoneyy()
				}
			}
		},
		checkLeft (item) {
			if(typeof item.check== 'undefined'){
				this.$set(item,'check',true)
			}else{
				item.check=!item.check
			}
			this.totalMoneyy();
		},
/*		checked () {
			var _this=this;
			this.productList.forEach(function(item,index){
					if(typeof item.check == 'undefined'){
						_this.$set(item,'check',true)
					}else{
						item.check=!item.check
					}
					this.totalMoneyy(item,index);
			})
			this.checke=!this.checke;
			
		},*/
		checkAll (tt) {
			var _this=this;
			this.checkPoint=tt;
			this.productList.forEach(function(item,index){
					if(typeof item.check == 'undefined'){
						_this.$set(item,'check',_this.checkPoint)
					}else{
						item.check=_this.checkPoint
					}
					
			})
			this.totalMoneyy()
		
		},

		totalMoneyy () {
				var _this=this ;
				this.totalMoney= 0;
				this.productList.forEach(function(value,index){
					if(value.check){
						_this.totalMoney+=value.price*value.amount
					}
				})
		},
		
		deleteItem (item) {
			this.confirmIndex = item ;
			this.deleteShow = true ;
		},
		delConfirm () {
			var index = this.productList.indexOf(this.confirmIndex);
			this.productList.splice(index,1);
			this.deleteShow = false ;
		},
	},
		
}
	
</script>

<style src="../static/css/base.css" rel="stylesheet"></style>
<style src="../static/css/checkout.css" rel="stylesheet"></style>
<style src="../static/css/modal.css" rel="stylesheet"></style>

<style type="text/css">
  .quentity input {
    width: 40px;
    padding: 5px 10px;
    text-align: center;
  }
</style>
