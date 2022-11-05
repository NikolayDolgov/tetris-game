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
  methods: {
    listener: function (event) { // слушатель
      console.log('pressed');
      console.log(event.key);
      if (event.key === 'ArrowRight')
        this.movementToRight();
      if (event.key === 'ArrowLeft')
        this.movementToLeft();
    },
    movementToLeft: function () { // слушатель // смещаем в право
      clearInterval(this.timer);
      let k = 0;
      let s = 0;
      for (let i in this.workMatrix) {
        for (let j in this.workMatrix[i]) {
          console.log("Не найден");
          if (this.workMatrix[i][j]["status"] === 2) {
            k = 1;
            console.log('найден')

            if (Number(j) > 0 && this.workMatrix[i][String(Number(j) - 1)]["status"] != 1) {
              this.workMatrix[i][j]["status"] = 0;
              if (this.workMatrix[i][String(Number(j) - 1)] === undefined) {
                this.workMatrix[i][String(Number(j) - 1)] = {}
              };
              if (this.workMatrix[i][String(Number(j) - 1)]["status"] === undefined) {
                this.workMatrix[i][String(Number(j) - 1)]["status"] = {}
              };
              this.workMatrix[i][String(Number(j) - 1)]["status"] = 2;
              this.timer = setInterval(this.renderF, 200);
              s = 1;
              break;
            }
            else {
              this.timer = setInterval(this.renderF, 200);
              s = 1;
              break;
            }
          }
        }
        if (k === 1)
          break;
      }
      if (s === 0)
        this.timer = setInterval(this.renderF, 200);
    },
    movementToRight: function () { // слушатель
      clearInterval(this.timer);
      let k = 0;
      let s = 0;
      for (let i in this.workMatrix) {
        for (let j in this.workMatrix[i]) {
          console.log("Не найден");
          if (this.workMatrix[i][j]["status"] === 2) {
            k = 1;
            console.log('найден')
            // смещаем в право

            if (Number(j) <= 8 && this.workMatrix[i][String(Number(j) + 1)]["status"] != 1) {
              this.workMatrix[i][j]["status"] = 0;
              if (this.workMatrix[i][String(Number(j) + 1)] === undefined) {
                this.workMatrix[i][String(Number(j) + 1)] = {}
              };
              if (this.workMatrix[i][String(Number(j) + 1)]["status"] === undefined) {
                this.workMatrix[i][String(Number(j) + 1)]["status"] = {}
              };
              this.workMatrix[i][String(Number(j) + 1)]["status"] = 2;
              this.timer = setInterval(this.renderF, 200);
              s = 1;
              break;
            }
            else {
              this.timer = setInterval(this.renderF, 200);
              s = 1;
              break;
            }
          }
        }
        if (k === 1)
          break;
      }
      if (s === 0)
        this.timer = setInterval(this.renderF, 200);
    },
  },
  mounted() {
    document.addEventListener('keydown', this.listener); // регистрация
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.listener); // удаление
  },
  data() {
    let timer;
    let rowDeleteColor;
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
              console.log('Достигли абсолютного низа');
              workMatrix[i][j]["status"] = 1;
              // проверяем заполнена ли девятая линия полностью.
              let check = 0;
              for (let y in workMatrix[i]) {
                if (workMatrix[i][y]['status'] === 0) {
                  break;
                }
                else {
                  check++;
                }
              }
              if (check === 10) {
                // новая функция очистки, изменения данных циклом на строку ниже.
                console.log('Удаление')

                for (let rows in workMatrix) {
                  if (rows !== '9') {
                    for (let row in workMatrix[rows]) {
                      workMatrix[String(9 - Number(rows))][row] = workMatrix[String(8 - Number(rows))][row];
                    }
                  }
                }
                workMatrix['0'] = {
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
                  console.log(workMatrix);
              }
              doNewMatrix(0, Math.floor(Math.random() * 10));
              k = 1;
              break;
            }
            else if (i !== '9' && workMatrix[String(Number(i) + 1)][j]["status"] === 1) { // поиск квадарта под квадартом
              console.log('Достигли низа (квадрат)');
              workMatrix[i][j]["status"] = 1;
              doNewMatrix(0, Math.floor(Math.random() * 10));
            }
            else if (i === '0' && workMatrix[String(Number(i) + 1)][j]["status"] === 1) { // поиск квадарта под квадартом на проигрыш
              end = true; // можно удалить счётчик
              workMatrix[i][j]["status"] = 3;
            }
            else {
              // смещаем чёрный квадрат вниз
              workMatrix[i][j]["status"] = 0;
              workMatrix[String(Number(i) + 1)][j]["status"] = 2;
              /*if (workMatrix[String(Number(i) + 1)] === undefined && Number(i) + 1 !== 10) {
                workMatrix[String(Number(i) + 1)] = {}
              };
              console.log([String(Number(i) + 1)])
              if (workMatrix[String(Number(i) + 1)][j] === undefined && (Number(i) + 1) !== 10) {
                workMatrix[String(Number(i) + 1)][j] = {}
              };
              if (workMatrix[String(Number(i) + 1)][j]["status"] === undefined && Number(i) + 1 !== 10) {
                workMatrix[String(Number(i) + 1)][j]["status"] = {}
              };
              if (String(Number(i) + 1) !== 10) {
                workMatrix[String(Number(i) + 1)][j]["status"] = 2;
              }*/
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
      console.log("Сработал рандом");
      workMatrix[firstOrder][secondOrder]["status"] = 2;
      //this.$store.commit('сhangeKey', workMatrix)
    }

    doNewMatrix(0, Math.floor(Math.random() * 10));
    //сalculateMovement(workMatrix);

    const renderF = () => {
      if (!end) {
        сalculateMovement();
        //count++
        this.$store.commit('increment')
        //this.$store.commit('сhangeKey', workMatrix)
      }
    }

    timer = setInterval(renderF, 200);


    //const updateTime = () => setTimeout(сalculateMovement(props.matrix), 3000);
    //updateTime();

    return {
      doNewMatrix,
      workMatrix,
      timer,
      rowDeleteColor,
      renderF,
    }
  },
}

//<Buttonk v-for="(itemTwo, indexTwo) in item" :key=itemTwo.id :mean=itemTwo.status :addressGlobal=index :addressLocal=indexTwo
//@newMatrix=doNewMatrix />
</script>

<template>
  <div class="topNo">
    <p>{{ this.count }}</p>
    <div class="firstClass">
      <div v-for="(item, index) in this.matrix" class="twoClass">
        <div v-for="(itemTwo, indexTwo) in item" class="threeClass">
          <div v-if="itemTwo.status >= 3" class="cell cell__color_red">{{ itemTwo.status }}</div>
          <div v-else-if="itemTwo.status >= 1"
            v-bind:class="{ 'cell__color_orange': (rowDeleteColor && indexTwo === '9') }" class="cell cell__color_blue">
            {{ itemTwo.status }}</div>
          <div v-else class="cell">{{ itemTwo.status }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
