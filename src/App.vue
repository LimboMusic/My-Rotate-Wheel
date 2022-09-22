<template>
    <div class="app">
        <RotateWheel @show-result="getResult"></RotateWheel>
        
        <Teleport to="body" >
            <Ending style="z-index: 100;" v-if="!endingFlag" :result = "result" @on-close="getEndingFlag"></Ending>
        </Teleport>
        
    </div>
    
    
</template>

<script setup lang='ts'>
import { ref,reactive} from 'vue'
import RotateWheel from './components/RotateWheel.vue'
import Ending from './components/Ending.vue';

const getEndingFlag = (flag)=>{
    endingFlag.value = flag
}



const endingFlag = ref<boolean>(true)



const getResult = (data)=>{
    result.value = data
    if(data !== ''){
        endingFlag.value = false
    }
    // console.log("result,app",result)
    // console.log("endingflag,app",endingFlag.value)
}


let result = ref<string>('');


</script>

<style scoped>

    .but{
        position: absolute;
        top: 10px;
        left: 0px;
    }
    .app{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>