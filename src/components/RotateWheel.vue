<template>
  <div>
    <div class="wrapper">

      <div class="content">

        <div class="wheel">

          <div class="pointer" :style="animateStyle" v-show="twinkle"></div>

          <div class="middle-point">
            <img src="../assets/nilu.gif" class="imgPoint" v-if="!gameStarter">
            <img src="../assets/aniluya.jpg" class="imgPoint" v-else>
          </div>

          <div class="prize">

            <div v-for="item,index in data" :key="item.id" class="item"
              :style="{transform:`rotate(${index * singleAngle}deg)`}">
              <!-- :style="{transform:`rotate(${index * singleAngle}deg)`,background:getColor(index),opacity:`20%`,borderRadius:`50%`}" -->

              <div class="border" :style="{transform: `rotate(-${singleAngle / 2}deg)`}"></div>

              <p style="padding-top: 10px;">{{item.title}}</p>
            </div>
          </div>
        </div>
      </div>

      <el-button type="primary" @click="start" class="btn">START!!!!</el-button>
    </div>

  </div>

</template>

<script setup lang='ts'>
import { emitChangeFn } from 'element-plus';
import { ref, reactive, computed, defineEmits } from 'vue'
import { Prize, RotateConfig, PointerConfig } from '../interface'


const emit = defineEmits(["showResult"])



const twinkle = ref<boolean>(true)//指针旋转完之后闪烁

let startTwinkle = () => {
  let timer = setInterval(() => {
    twinkle.value = !twinkle.value
  }, 100)
  setTimeout(() => {
    clearInterval(timer)
  }, 600)
}



const getColor = (index: number) => {
  const data = ["red", "yellow", "green", "blue", "brown", "black"]
  return data[index]
}




let data = ref<Prize[]>([
  { id: 1, title: "一等奖", value: 10 },
  { id: 2, title: "二等奖", value: 20 },
  { id: 3, title: "三等奖", value: 30 },
  { id: 4, title: "四等奖", value: 40 },
  { id: 5, title: "五等奖", value: 50 },
  { id: 6, title: "六等奖", value: 60 },
])



const singleAngle = computed<number>(() => 360 / data.value.length)




let rotateConfig = ref<RotateConfig>({
  circle: 30,
  duration: 10000,
  easing: 'ease-in-out'
})


const getPointerRotate = () => 360 * rotateConfig.value.circle + Math.floor(Math.random() * 360)



const gameStarter = ref<boolean>(false)




let pointerConfig = ref<PointerConfig>({
  pointerRotate: 0,
  poniterTo: 0,
})


const flag1 = ref<boolean>(false)



const animateStyle = computed(() => {
  pointerConfig.value.pointerRotate = getPointerRotate()
  pointerConfig.value.poniterTo = Math.ceil(((pointerConfig.value.pointerRotate % 360) - singleAngle.value / 2) / singleAngle.value)
  if (gameStarter.value)
    return {
      transform: `rotate(${pointerConfig.value.pointerRotate}deg)`,
      transition: `all ${rotateConfig.value.duration}ms ${rotateConfig.value.easing}`
    }
  else return {
    transform: `rotate(0deg)`,
    transition: `all 0ms ${rotateConfig.value.easing}`
  }
})





const flag2 = ref<boolean>(false)

const start = () => {//点击按钮之后发生的事情
  if (gameStarter.value === false) {
    gameStarter.value = true
    // console.log(gameStarter.value)
    setTimeout(() => {
      startTwinkle()
      setTimeout(() => {
        showResulte()
      }, 601)
    }, rotateConfig.value.duration)
  }

}



const showResulte = () => {
  if (gameStarter.value === true) {
    twinkle.value = true
    console.log("rotateWheelemits",data.value[pointerConfig.value.poniterTo].title)
    emit("showResult",data.value[pointerConfig.value.poniterTo].title)
    // alert(`恭喜你，选中了${data.value[pointerConfig.value.poniterTo].title}`)
    gameStarter.value = false
  }

}



</script>

<style scoped lang="less">
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;



  .content {
    width: 600px;
    height: 600px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;



    .wheel {
      background: lightblue;
      width: 60%;
      height: 60%;
      border-radius: 50%;
      position: relative;
      box-shadow: 10px 10px 5px #888888;

      .middle-point {
        width: 8px;
        height: 8px;
        background: black;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -4px;
        margin-top: -4px;
        z-index: 10;
      }


      .pointer {
        height: 130px;
        width: 6px;
        background: red;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -3px;
        margin-top: -130px;
        border-radius: 20px;
        transform-origin: bottom;
        z-index: 5;
      }


      .prize {
        width: 100%;
        height: 100%;



        .item {
          text-align: center;
          width: 100%;
          height: 100%;
          position: absolute;
          font-size: 18px;

          .border {
            width: 2px;
            height: 50%;
            background: black;
            // transform: rotate(-30deg);
            transform-origin: bottom;
            left: 50%;
            margin-left: -1px;
            position: absolute;
            z-index: 5;
          }
        }
      }
    }

  }

  .btn {
    margin-top: 20px;
    width: 10%;
  }
}

.middle-point .imgPoint {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 80px;
  width: 80px;
  margin-left: -40px;
  margin-top: -40px;
}
</style>