
<template>
  <div >
    <input v-model="inputValue"/>
    <button @click="handleInput">提交</button>
    
    <ul>
    	<todo-item
    		v-for="(item , index) of list" 
				:key="index"
				:index="index"
				:content="item"
				@delete='Delete'
    		></todo-item>
    </ul>
  </div>
</template>

<script>
import todoitem from './components/TodoItem'

export default {
	components:{
		'todo-item' : todoitem
	},
  data () {
  	return {
  		inputValue : '',
  		list : []
  	}
  },
  methods: {
  	handleInput () {
  		this.list.push(this.inputValue)
  		this.inputValue = ''
  	},
  	Delete (index) {
  		this.list.splice(index, 1)
 		}
  }
}
</script>

<style>

</style>
