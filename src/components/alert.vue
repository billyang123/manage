<template>
  	<el-dialog title="提示" v-model="visible" size="tiny">
	  <span>{{content}}</span>
	  <span slot="footer" class="dialog-footer">
	    <el-button type="primary" @click="visible = false">确 定</el-button>
	  </span>
	</el-dialog>
</template>
<script>
export default {
	name:"alert",
	ready (){
		console.log(this.visible)
	},
	props:["visible","content"]
}
</script>