<template>

    <div class="End" v-if="flag">
        <div class="wrapper">
            <div class="card">
                <div class="header">
                    <div>You are a winner!!!</div>
                    <div class="close" @click="close">x</div>
                </div>
                <div class="content">
                    <div class="result">{{result}}</div>
                    <el-button type='primary' class="btn" @click="close">close</el-button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang='ts'>
import { ref, reactive, defineProps,defineEmits } from 'vue'
let flag = ref<boolean>(true)
interface Props {
    result: string
}
defineProps<Props>()


const emit = defineEmits(["on-close"])

const close = ()=>{
    flag.value = false
    emit("on-close",true)
}

</script>

<style scoped lang="less">
.End {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(128, 128, 128, 0.5)
}

.wrapper {
    .card {
        width: 700px;
        height: 300px;
        background-color: white;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -350px;
        margin-top: -150px;
        border-radius: 20px;

        .header {
            position: relative;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            width: 100%;
            height: 30%;
            background: red;
            border-bottom: 2px solid black;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            color: #fff;

            .close {
                position: absolute;
                top: 0px;
                right: 0px;
                width: 10px;
                height: 10px;
                margin-top: -5px;
                margin-right: 25px;
                cursor: pointer;
            }
        }

        .content {
            height: 70%;
            width: 100%;
            position: relative;
            
            font-size: 40px;
            .result{
                position: absolute;
                top: 0;
                left: 0;
                margin: 20px;
            }

            .btn{
                position: absolute;
                bottom: 0;
                right: 0;
                margin: 20px;
                width: 100px;
                height: 45px;
                font-size: 20px;
            }
        }
    }
}
</style>