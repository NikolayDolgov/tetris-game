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
      console.log(this.workMatrix)
      console.log('pressed');
      console.log(event.key);
      if (event.key === 'ArrowRight')
        this.movementToRight();
      if (event.key === 'ArrowLeft')
        this.movementToLeft();
      if (event.key === 'ArrowDown')
        this.movementToDown();
    },
    movementToLeft: function () { // слушатель // смещаем в право
      clearInterval(this.timer);
      let k = 0;
      let s = 0;
      for (let i in this.workMatrix) {
        for (let j in this.workMatrix[i]) {
          if (this.workMatrix[i][j]["id"] === 2 && Number(j) === 9) {
            if (this.workMatrix[i][j]["id"] === 2) {
              k = 1;
              if (Number(j) > 0 && this.workMatrix[i][String(Number(j) - 1)]["id"] != 1) {
                this.workMatrix[i][String(Number(j) - 1)]["id"] = 2;
                this.workMatrix[i][String(Number(j) - 1)]["status"] = this.workMatrix[i][j]["status"];
                this.workMatrix[i][j]["id"] = 0;
                this.workMatrix[i][j]["status"] = 0;
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
          else if (this.workMatrix[i][j]["id"] === 2 && this.workMatrix[i][String(Number(j) + 1)]["id"] === 2) {
            // для двух блоков
            k = 1;
            if (Number(j) > 0 && this.workMatrix[i][String(Number(j) - 1)]["id"] != 1) { // меняем статус дальнего квадрата
              this.workMatrix[i][String(Number(j) + 1)]["id"] = 0; // было 00 22 22 стало 22 22 00
              this.workMatrix[i][String(Number(j) - 1)]["id"] = 2;
              this.workMatrix[i][String(Number(j) - 1)]["status"] = this.workMatrix[i][String(Number(j) + 1)]["status"];
              this.workMatrix[i][String(Number(j) + 1)]["status"] = 0;
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
          else {// для одного блока
            if (this.workMatrix[i][j]["id"] === 2) {
              k = 1;
              if (Number(j) > 0 && this.workMatrix[i][String(Number(j) - 1)]["id"] != 1) {
                this.workMatrix[i][j]["id"] = 0;
                this.workMatrix[i][String(Number(j) - 1)]["id"] = 2;
                this.workMatrix[i][String(Number(j) - 1)]["status"] = this.workMatrix[i][j]["status"];
                this.workMatrix[i][j]["status"] = 0;
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
        }
        if (k === 1)
          break;
      }
      if (s === 0)
        this.timer = setInterval(this.renderF, 200);
    },
    movementToRight: function () { // слушатель // смещаем в право
      clearInterval(this.timer);
      let k = 0;
      let s = 0;
      for (let i in this.workMatrix) {
        for (let j in this.workMatrix[i]) {
          if (this.workMatrix[i][j]["id"] === 2 && Number(j) === 9) {
            if (this.workMatrix[i][j]["id"] === 2) {
              k = 1;

              if (Number(j) <= 8 && this.workMatrix[i][String(Number(j) + 1)]["id"] != 1) {
                this.workMatrix[i][j]["id"] = 0;
                this.workMatrix[i][String(Number(j) + 1)]["status"] = this.workMatrix[i][j]["status"];
                this.workMatrix[i][String(Number(j) + 1)]["id"] = 2;
                this.workMatrix[i][j]["status"] = 0;
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
          else if (this.workMatrix[i][j]["id"] === 2 && this.workMatrix[i][String(Number(j) + 1)]["id"] === 2 && Number(j) <= 7) {
            // для двух блоков
            k = 1;
            if (Number(j) >= 0 && this.workMatrix[i][String(Number(j) + 2)]["id"] != 1) { // меняем статус ближнего квадрата
              this.workMatrix[i][String(Number(j) + 0)]["id"] = 0; // было 00 22 22 стало 22 22 00
              this.workMatrix[i][String(Number(j) + 2)]["id"] = 2;
              this.workMatrix[i][String(Number(j) + 2)]["status"] = this.workMatrix[i][String(Number(j) + 0)]["status"];
              this.workMatrix[i][String(Number(j) + 0)]["status"] = 0;
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
          else if (this.workMatrix[i][j]["id"] === 2 && this.workMatrix[i][String(Number(j) + 1)]["id"] === 2) {
            // для двух блоков
            k = 1;

            this.timer = setInterval(this.renderF, 200);
            s = 1;
            break;
          }
          else {// для одного блока
            if (this.workMatrix[i][j]["id"] === 2) {
              k = 1;
              console.log('найден')
              // смещаем в право

              if (Number(j) <= 8 && this.workMatrix[i][String(Number(j) + 1)]["id"] != 1) {
                this.workMatrix[i][j]["id"] = 0;
                this.workMatrix[i][String(Number(j) + 1)]["status"] = this.workMatrix[i][j]["status"];
                this.workMatrix[i][j]["status"] = 0;
                this.workMatrix[i][String(Number(j) + 1)]["id"] = 2;
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
        }
        if (k === 1)
          break;
      }
      if (s === 0)
        this.timer = setInterval(this.renderF, 200);
    },
    movementToDown: function () { // слушатель
      clearInterval(this.timer);
      console.log(this.workMatrix);
      let k = 0;
      let s = 0;
      for (let i in this.workMatrix) {
        for (let j in this.workMatrix[i]) {
          console.log("Нажат даун");
          if (this.workMatrix[i][j]["id"] === 2 && Number(i) <= 8) {
            k = 1;
            if (Number(j) !== 9) {
              if (this.workMatrix[i][j]["id"] === 2 && this.workMatrix[i][String(Number(j) + 1)]["id"] === 2) {
                if (this.workMatrix[String(Number(i) + 1)][j]["id"] !== 1 && this.workMatrix[String(Number(i) + 1)][String(Number(j) + 1)]["id"] !== 1) {
                  this.workMatrix[String(Number(i) + 1)][j]["id"] = 2;
                  this.workMatrix[String(Number(i) + 1)][j]["status"] = this.workMatrix[String(Number(i))][j]["status"];
                  this.workMatrix[String(Number(i))][j]["id"] = 0;
                  this.workMatrix[String(Number(i))][j]["status"] = 0;

                  this.workMatrix[String(Number(i) + 1)][String(Number(j) + 1)]["id"] = 2;
                  this.workMatrix[String(Number(i) + 1)][String(Number(j) + 1)]["status"] = this.workMatrix[String(Number(i))][String(Number(j) + 1)]["status"];
                  this.workMatrix[String(Number(i))][String(Number(j) + 1)]["id"] = 0;
                  this.workMatrix[String(Number(i))][String(Number(j) + 1)]["status"] = 0;
                }
              }
              else {
                if (this.workMatrix[String(Number(i) + 1)][j]["id"] !== 1) {
                  this.workMatrix[String(Number(i) + 1)][j]["id"] = 2;
                  this.workMatrix[String(Number(i) + 1)][j]["status"] = this.workMatrix[String(Number(i))][j]["status"];
                  this.workMatrix[String(Number(i))][j]["id"] = 0;
                  this.workMatrix[String(Number(i))][j]["status"] = 0;
                }
              }
            }
            else {
              if (this.workMatrix[String(Number(i) + 1)][j]["id"] !== 1 && Number(i) <= 8) {
                this.workMatrix[String(Number(i) + 1)][j]["id"] = 2;
                this.workMatrix[String(Number(i) + 1)][j]["status"] = this.workMatrix[String(Number(i))][j]["status"];
                this.workMatrix[String(Number(i))][j]["id"] = 0;
                this.workMatrix[String(Number(i))][j]["status"] = 0;
              }
            }
            break;
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

    function сheckingString(stringAdress, matrix) {
      let k = 0;
      for (let i in matrix[stringAdress]) {
        if (matrix[stringAdress][i]["id"] === 2) {
          k = 1;
          if (i !== '9') {
            if (matrix[stringAdress][String(Number(i) + 1)]["id"] === 2) {
              if (matrix[String(Number(stringAdress) + 1)][i]["id"] !== 1 && matrix[String(Number(stringAdress) + 1)][String(Number(i) + 1)]["id"] !== 1) {
                matrix[String(Number(stringAdress) + 1)][i]["id"] = 2;
                matrix[String(Number(stringAdress) + 1)][String(Number(i) + 1)]["id"] = 2;
                matrix[String(Number(stringAdress) + 1)][i]["status"] = matrix[stringAdress][String(Number(i) + 1)]["status"];
                matrix[String(Number(stringAdress) + 1)][String(Number(i) + 1)]["status"] = matrix[stringAdress][String(Number(i) + 1)]["status"];

                matrix[stringAdress][i]["id"] = 0;
                matrix[stringAdress][String(Number(i) + 1)]["id"] = 0;
                matrix[stringAdress][i]["status"] = 0;
                matrix[stringAdress][String(Number(i) + 1)]["status"] = 0;
              }
              else {
                matrix[stringAdress][i]["id"] = 1;
                matrix[stringAdress][String(Number(i) + 1)]["id"] = 1;
              }
              break;
            }
            else {
              if (stringAdress !== '9' && workMatrix[String(Number(stringAdress) + 1)][i]["id"] === 1) { // поиск квадарта под квадартом
                console.log('Достигли низа (квадрат)');
                workMatrix[String(Number(stringAdress))][i]["id"] = 1;
              }
              else {
                matrix[String(Number(stringAdress) + 1)][i]["status"] = matrix[stringAdress][i]["status"];
                matrix[String(Number(stringAdress) + 1)][i]["id"] = 2;
                matrix[stringAdress][i]["status"] = 0;
                matrix[stringAdress][i]["id"] = 0;
              }

              break;
            }
          }
          else {
            if (workMatrix[String(Number(stringAdress) + 1)][i]["id"] === 1) { // поиск квадарта под квадартом
              console.log('Достигли низа (квадрат)');
              workMatrix[String(Number(stringAdress))][i]["id"] = 1;
            }
            else {
              matrix[String(Number(stringAdress) + 1)][i]["status"] = matrix[stringAdress][i]["status"];
              matrix[String(Number(stringAdress) + 1)][i]["id"] = 2;
              matrix[stringAdress][i]["status"] = 0;
              matrix[stringAdress][i]["id"] = 0;
            }

            break;
          }

        }
        if (k === 1)
          break;
      }
      return matrix;
    }

    const сalculateMovement = () => {
      // status - цвет фигуры
      // поиск фигуры по id. Фигура, которая может перемещаться id = 2, пустое поле - 0, занятое - 1
      let k = 0;
      let doRandom = 0;
      for (let i in workMatrix) {
        for (let j in workMatrix[i]) {
          if (workMatrix[i][j]["id"] === 2) {
            doRandom = 1;
            k = 1;
            // поиск на строке
            if (i === '9') {
              console.log('Достигли абсолютного низа');
              workMatrix[i][j]["id"] = 1;
              if (workMatrix[i][String(Number(j) + 1)]["id"] === 2)
                workMatrix[i][String(Number(j) + 1)]["id"] = 1;

              // проверяем заполнена ли девятая линия полностью.
              let check = 0;
              for (let y in workMatrix[i]) {
                if (workMatrix[i][y]['id'] === 0) {
                  break;
                }
                else {
                  check++;
                }
              }
              if (check === 10) {
                // функция очистки, изменения данных циклом на строку ниже.
                console.log('Удаление')

                for (let rows in workMatrix) {
                  if (rows !== '9') {
                    for (let row in workMatrix[rows]) {
                      workMatrix[String(9 - Number(rows))][row] = workMatrix[String(8 - Number(rows))][row];
                    }
                  }
                }
                workMatrix['0'] = {
                  '0': { status: 0, id: 0 },
                  '1': { status: 0, id: 0 },
                  '2': { status: 0, id: 0 },
                  '3': { status: 0, id: 0 },
                  '4': { status: 0, id: 0 },
                  '5': { status: 0, id: 0 },
                  '6': { status: 0, id: 0 },
                  '7': { status: 0, id: 0 },
                  '8': { status: 0, id: 0 },
                  '9': { status: 0, id: 0 },
                };
              }
            }
            else if (i === '0' && workMatrix[String(Number(i) + 1)][j]["id"] === 1) { // поиск квадарта под квадартом на проигрыш
              end = true; // можно удалить счётчик
            }
            else {
              console.log(workMatrix);
              workMatrix = сheckingString(i, workMatrix);
              break;
            }
          }
          if (k === 1)
            break;
        }
        if (k === 1)
          break;
      }
      if (doRandom === 0) {
        doNewMatrix(0, Math.floor(Math.random() * 10), (Math.floor(Math.random() * 7) + 1));
      }
    }

    const doNewMatrix = (addressGlobal, addressLocal, color) => {
      // 0 - куб
      // 1 - полоска из 2-х кубов

      const figure = Math.floor(Math.random() * 2);
      //const color = Math.floor(Math.random() * 7) + 1; // 0 отсутствует цвет
      //const figure = 1;
      const firstOrder = addressGlobal;
      const secondOrder = addressLocal;
      console.log("Сработал рандом");
      console.log(workMatrix);
      if (figure === 0) {
        workMatrix[firstOrder][secondOrder]["status"] = color;
        workMatrix[firstOrder][secondOrder]["id"] = 2;
        console.log('куб');
      }
      else if (figure === 1) {
        console.log('прямоугольник');
        workMatrix[firstOrder][secondOrder]["status"] = color;
        workMatrix[firstOrder][secondOrder]["id"] = 2;
        if (secondOrder === 0) {
          workMatrix[firstOrder][secondOrder + 1]["status"] = color;
          workMatrix[firstOrder][secondOrder + 1]["id"] = 2;
        }
        else if ((secondOrder === 9)) {
          workMatrix[firstOrder][secondOrder - 1]["status"] = color;
          workMatrix[firstOrder][secondOrder - 1]["id"] = 2;
        }
        else {
          if (Math.floor(Math.random() * 2) === 1) {
            workMatrix[firstOrder][secondOrder + 1]["status"] = color;
            workMatrix[firstOrder][secondOrder + 1]["id"] = 2;
          }
          else {
            workMatrix[firstOrder][secondOrder - 1]["status"] = color;
            workMatrix[firstOrder][secondOrder - 1]["id"] = 2;
          }
        }
        console.log(workMatrix);
      }

      //this.$store.commit('сhangeKey', workMatrix)
    }

    doNewMatrix(0, Math.floor(Math.random() * 10), (Math.floor(Math.random() * 7) + 1));
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
          <div v-if="itemTwo.status === 1" class="cell cell__color_red"></div>
          <div v-else-if="itemTwo.status === 7" class="cell cell__color_orange"></div>
          <div v-else-if="itemTwo.status === 6" class="cell cell__color_yellow"></div>
          <div v-else-if="itemTwo.status === 4" class="cell cell__color_green"></div>
          <div v-else-if="itemTwo.status === 5" class="cell cell__color_blue"></div>
          <div v-else-if="itemTwo.status === 2" class="cell cell__color_lightblue"></div>
          <div v-else-if="itemTwo.status === 3" class="cell cell__color_purple"></div>
          <div v-else class="cell"></div>
        </div>
      </div>г
    </div>
  </div>
</template>
