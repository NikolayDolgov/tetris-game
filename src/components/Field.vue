<script>
import "./Field.css"
import Buttonk from './button/Button.vue'
import "./button/Button.css"

import { matrix as constMatrix } from "../assets/utils/utils";

export default {
  components: {
    Buttonk,
  },
  computed: {
    count() {
      return this.$store.state.count
    },
    matrix() {
      return this.$store.state.matrixField
    }
  },
  data() {
    let end = false;
    let workMatrix;
    if (this.matrix) {
      workMatrix = this.matrix;
    }
    else {
      workMatrix = constMatrix;
    }

    const сalculateMovement = () => { // поиск квадрата с индексом 2, как только квадрат отпускается он равен 1
      let k = 0;
      for (let i in workMatrix) {
        for (let j in workMatrix[i]) {
          console.log("Не найден");
          if (workMatrix[i][j]["status"] === 2) { // поиск квадрата на строке
            if (i === '9') {
              console.log('Достигли низа');
              workMatrix[i][j]["status"] = 1;
              // проверяем заполнена ли девятая линия полностью.
              let check = 0;
              for (let y in workMatrix[i]) {
                if (workMatrix[i][y] === 0) {
                  break;
                }
                else {
                  check++
                }
              }
              if (check === 10) { // очищаем девятую линию
                let newWorkMatrix = {
                  '0': {
                    '0': { status: 0, id: 1 },
                    '1': { status: 0, id: 2 },
                    '2': { status: 0, id: 3 },
                    '3': { status: 0, id: 4 },
                    '4': { status: 0, id: 5 },
                    '5': { status: 0, id: 6 },
                    '6': { status: 0, id: 7 },
                    '7': { status: 0, id: 8 },
                    '8': { status: 0, id: 9 },
                    '9': { status: 0, id: 10 },
                  },
                };
                let newRow = 0;
                for (let row in workMatrix) {
                  /*newRow++
                  newWorkMatrix[String(newRow)] = workMatrix[row];
                  if(newRow === 9){
                    console.log(newWorkMatrix)
                    console.log(workMatrix)
                    workMatrix = newWorkMatrix
                    break;
                  }*/

                }


                doNewMatrix(0, Math.floor(Math.random() * 10));
              }
            }
            else if (i !== '9' && workMatrix[String(Number(i) + 1)][j]["status"] === 1) { // поиск квадарта под квадартом
              doNewMatrix(0, Math.floor(Math.random() * 10));
              console.log('Достигли низа (квадрат)');
              workMatrix[i][j]["status"] = 1;
            }
            else if (i === '0' && workMatrix[String(Number(i) + 1)][j]["status"] === 1) { // поиск квадарта под квадартом на проигрыш
              alert('Вы проиграли');
              end = true; // можно удалить счётчик
              workMatrix[i][j]["status"] = 3;
            }
            else {
              // смещаем чёрный квадрат вниз
              workMatrix[i][j]["status"] = 0;
              workMatrix[String(Number(i) + 1)][j]["status"] = 2;
            }
            console.log('ff')
            k = 1;
            //this.$store.commit('сhangeKey', workMatrix)
            break;
          }
        }
        if (k === 1) {
          break;
        }
      }
    }

    const doNewMatrix = (addressGlobal, addressLocal) => {
      const firstOrder = addressGlobal;
      const secondOrder = addressLocal;
      console.log(workMatrix)
      workMatrix[firstOrder][secondOrder]["status"] += 2
      //this.$store.commit('сhangeKey', workMatrix)
    }

    doNewMatrix(0, Math.floor(Math.random() * 10));
    //сalculateMovement(workMatrix);

    setInterval(() => {
      if (!end){
        сalculateMovement();
        //count++
        this.$store.commit('increment')
        //this.$store.commit('сhangeKey', workMatrix)
      }
        

      
      //this.$store.commit('сhangeKey', workMatrix)
    }, 50);


    //const updateTime = () => setTimeout(сalculateMovement(props.matrix), 3000);
    //updateTime();

    return {
      doNewMatrix,
      workMatrix,
    }
  },
}

//<Buttonk v-for="(itemTwo, indexTwo) in item" :key=itemTwo.id :mean=itemTwo.status :addressGlobal=index :addressLocal=indexTwo
//@newMatrix=doNewMatrix />
</script>

<template>
  <div>
    <p>{{ this.count }}</p>
    <div class="firstClass">
      <div v-for="(item, index) in this.matrix" class="twoClass">
        <div v-for="(itemTwo, indexTwo) in item" class="threeClass">
          <div v-if="itemTwo.status >= 3" class="cell cell__color_red">{{ itemTwo.status }}</div>
          <div v-if="itemTwo.status >= 1" class="cell cell__color_blue">{{ itemTwo.status }}</div>
          <div v-else class="cell">{{ itemTwo.status }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
