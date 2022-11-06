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
      if (event.key === 'ArrowDown')
        this.movementToDown();
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
    movementToDown: function () { // слушатель
      clearInterval(this.timer);
      let k = 0;
      let s = 0;
      for (let i in this.workMatrix) {
        for (let j in this.workMatrix[i]) {
          console.log("Не найден");
          if (this.workMatrix[i][j]["status"] === 2) {
            k = 1;
            console.log('найден')
            // опускаем вниз

            if (Number(i) <= 8 && this.workMatrix[String(Number(i) + 1)][j]["status"] != 1) {
              this.workMatrix[i][j]["status"] = 0;
              this.workMatrix[String(Number(i) + 1)][j]["status"] = 2;
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

    function сheckingString(stringAdress, matrix) {
      let k = 0;
      for (let i in matrix[stringAdress]) {
        console.log(matrix[stringAdress][i]);
        if (matrix[stringAdress][i]["id"] === 2) {
          k = 1;
          if (i !== '9') {
            if (matrix[stringAdress][String(Number(i) + 1)]["id"] === 2) {
              if (matrix[String(Number(stringAdress) + 1)][i]["id"] !== 1 && matrix[String(Number(stringAdress) + 1)][String(Number(i) + 1)]["id"] !== 1) {
                matrix[stringAdress][i]["id"] = 0;
                matrix[stringAdress][String(Number(i) + 1)]["id"] = 0;
                matrix[stringAdress][i]["status"] = 0;
                matrix[stringAdress][String(Number(i) + 1)]["status"] = 0;

                matrix[String(Number(stringAdress) + 1)][i]["id"] = 2;
                matrix[String(Number(stringAdress) + 1)][String(Number(i) + 1)]["id"] = 2;
                matrix[String(Number(stringAdress) + 1)][i]["status"] = 2;
                matrix[String(Number(stringAdress) + 1)][String(Number(i) + 1)]["status"] = 2;
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
                matrix[stringAdress][i]["status"] = 0;
                matrix[stringAdress][i]["id"] = 0;
                matrix[String(Number(stringAdress) + 1)][i]["status"] = 2;
                matrix[String(Number(stringAdress) + 1)][i]["id"] = 2;
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
              matrix[stringAdress][i]["status"] = 0;
              matrix[stringAdress][i]["id"] = 0;
              matrix[String(Number(stringAdress) + 1)][i]["status"] = 2;
              matrix[String(Number(stringAdress) + 1)][i]["id"] = 2;
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
            console.log(`Найден ${i} ${j}`)
            // поиск на строке
            console.log("Не найден");
            if (i === '9') {
              console.log('Достигли абсолютного низа');
              workMatrix[i][j]["id"] = 1;
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
              if (j === '9' && workMatrix[i][String(Number(j) + 1)]["id"] === 2) {
                workMatrix[i][j]["id"] = 1;
                workMatrix[i][j]["status"] = 3;
                workMatrix[i][String(Number(j) + 1)]["id"] = 1;
                workMatrix[i][String(Number(j) + 1)]["status"] = 3;
              }
              else {
                workMatrix[i][j]["id"] = 1;
                workMatrix[i][j]["status"] = 3;
              }
              end = true; // можно удалить счётчик
            }
            else {
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
        doNewMatrix(0, Math.floor(Math.random() * 10));
      }
    }

    const doNewMatrix = (addressGlobal, addressLocal) => {
      // 0 - куб
      // 1 - полоска из 2-х кубов

      const figure = Math.floor(Math.random() * 2)
      //const figure = 1;
      const firstOrder = addressGlobal;
      const secondOrder = addressLocal;
      console.log("Сработал рандом");
      console.log(figure)
      if (figure === 0) {
        workMatrix[firstOrder][secondOrder]["status"] = 2;
        workMatrix[firstOrder][secondOrder]["id"] = 2;
        console.log('куб');
      }
      else if (figure === 1) {
        console.log('прямоугольник');
        workMatrix[firstOrder][secondOrder]["status"] = 2;
        workMatrix[firstOrder][secondOrder]["id"] = 2;
        if (secondOrder === 0) {
          workMatrix[firstOrder][secondOrder + 1]["status"] = 2;
          workMatrix[firstOrder][secondOrder + 1]["id"] = 2;
        }
        else if ((secondOrder === 9)) {
          workMatrix[firstOrder][secondOrder - 1]["status"] = 2;
          workMatrix[firstOrder][secondOrder - 1]["id"] = 2;
        }
        else {
          if (Math.floor(Math.random() * 2) === 1) {
            workMatrix[firstOrder][secondOrder + 1]["status"] = 2;
            workMatrix[firstOrder][secondOrder + 1]["id"] = 2;
          }
          else {
            workMatrix[firstOrder][secondOrder - 1]["status"] = 2;
            workMatrix[firstOrder][secondOrder - 1]["id"] = 2;
          }
        }
      }

      //this.$store.commit('сhangeKey', workMatrix)
    }

    doNewMatrix(0, Math.floor(Math.random() * 10)); // 1 - строка, 2 - индекс в строке
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
