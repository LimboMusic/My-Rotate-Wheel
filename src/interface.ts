export interface Prize {//转盘的数值
    id: number,
    title: string,
    value: number
}

export interface RotateConfig {//旋转圈数的参数
    circle: number,
    duration: number,
    easing: string
}

export interface PointerConfig{//指针相关的参数
    pointerRotate:number  //指针转多少度
    poniterTo:number      //指针最终指向的位置
}
  
  