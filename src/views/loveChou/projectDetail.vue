<template>
 <div class="projectDetail">
 	<h2>项目名称</h2>

	<ul class="object-list">
		<li v-for="o in 4">列表内容{{o}}</li>
	</ul>
	<div class="options">
		<el-button size="small">返回列表</el-button>
		<el-button size="small">评论维护</el-button>
		<el-button size="small">打款</el-button>
		<el-button size="small">动态</el-button>
	</div>
 </div>
</template>
<script>
import api from '../../api/api'
 export default {
  	name:"projectDetail",
  	data(){
  		return {
  			
  		}
  	},
    methods: {
    	
    }
}
</script>
<style>
	.projectDetail {
		padding: 20px;
	}
	.object-list {
		text-align: left;
	}
</style>