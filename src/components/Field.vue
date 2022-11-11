<script>
import "./Field.css"

import { matrix as constMatrix } from "../assets/utils/utils";

export default {
  computed: {
    count() {
      return this.$store.state.count
    },
    score() {
      return this.$store.state.score
    },
    matrix() {
      return this.$store.state.matrixField
    },
    status() {
      return this.$store.state.status
    }
  },
  methods: {
    listener: function (event) { // слушатель всех кнопок
      /*console.log('pressed');
      console.log(event.key);*/
      if (event.key === 'ArrowRight' && this.$store.state.status !== 'Старт') {
        console.log(this.$store.state.status);
        this.movementToRight();
      }
      
        
      if (event.key === 'ArrowLeft'  && this.$store.state.status !== 'Старт')
        this.movementToLeft();
      if (event.key === 'ArrowDown'  && this.$store.state.status !== 'Старт')
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
              }
              this.timer = setInterval(this.renderF, 200);
              s = 1;
              break;
            }
          }
        }
        if (k === 1)
          break;
      }
      if (s === 0 && this.$store.state.status !== 'Старт')
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
              }
              this.timer = setInterval(this.renderF, 200);
              s = 1;
              break;
            }
          }
          else if (this.workMatrix[i][j]["id"] === 2 && this.workMatrix[i][String(Number(j) + 1)]["id"] === 2 && Number(j) <= 7) {
            // для двух блоков
            if (Number(j) >= 0 && this.workMatrix[i][String(Number(j) + 2)]["id"] != 1) { // меняем статус ближнего квадрата
              this.workMatrix[i][String(Number(j) + 0)]["id"] = 0; // было 00 22 22 стало 22 22 00
              this.workMatrix[i][String(Number(j) + 2)]["id"] = 2;
              this.workMatrix[i][String(Number(j) + 2)]["status"] = this.workMatrix[i][String(Number(j) + 0)]["status"];
              this.workMatrix[i][String(Number(j) + 0)]["status"] = 0;
            }
            this.timer = setInterval(this.renderF, 200);
            k = 1;
            s = 1;
            break;
          }
          else if (this.workMatrix[i][j]["id"] === 2 && this.workMatrix[i][String(Number(j) + 1)]["id"] === 2) {
            // для двух блоков
            k = 1;
            s = 1;
            this.timer = setInterval(this.renderF, 200);
            break;
          }
          else {// для одного блока
            if (this.workMatrix[i][j]["id"] === 2) {
              k = 1;
              s = 1;
              if (Number(j) <= 8 && this.workMatrix[i][String(Number(j) + 1)]["id"] != 1) {
                this.workMatrix[i][j]["id"] = 0;
                this.workMatrix[i][String(Number(j) + 1)]["status"] = this.workMatrix[i][j]["status"];
                this.workMatrix[i][j]["status"] = 0;
                this.workMatrix[i][String(Number(j) + 1)]["id"] = 2;
              }
              this.timer = setInterval(this.renderF, 200);
              break;
            }
          }
        }
        if (k === 1)
          break;
      }
      if (s === 0 && this.$store.state.status !== 'Старт')
        this.timer = setInterval(this.renderF, 200);
    },
    movementToDown: function () {
      clearInterval(this.timer);
      let k = 0;
      let s = 0;
      for (let i in this.workMatrix) {
        for (let j in this.workMatrix[i]) {
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
      if (s === 0 && this.$store.state.status !== 'Старт')
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
    //let score = 0;
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
              if (matrix[String(Number(stringAdress) + 1)][i]["id"] !== 1 &&
                matrix[String(Number(stringAdress) + 1)][String(Number(i) + 1)]["id"] !== 1) {
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
                console.log('Достигли низа');
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
              console.log('Достигли низа');
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
      console.log('калькулятор работает')
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

              if (j !== '9') {
                if (workMatrix[i][String(Number(j) + 1)]["id"] === 2)
                  workMatrix[i][String(Number(j) + 1)]["id"] = 1;
              }

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
                this.$store.commit('incrementScore');
              }
            }
            else if (i === '0' && workMatrix[String(Number(i) + 1)][j]["id"] === 1) { // поиск квадарта под квадартом на проигрыш
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

        // проверка на наличие любой заполненой строки кроме 0 и 9
        for (let row in workMatrix) {
          if (row === '9')
            break;

          let check = 0;
          for (let y in workMatrix[row]) {
            if (workMatrix[row][y]['id'] === 0) {
              break;
            }
            else {
              check++;
            }
          }
          if (check === 10) {
            // функция очистки, изменения данных циклом на строку ниже.
            console.log('Удаление не 9');
            console.log(row);
            let oooo = 0;
            for (let rows in workMatrix) {
              oooo++;
              if (rows !== '9') {
                for (let rowtt in workMatrix[rows]) {
                  if (Number(row) < oooo)
                    break;
                  console.log(String(Number(row) - oooo), 'и', rowtt)
                  const newObj = Object.assign({}, workMatrix[String(Number(row) - oooo)][rowtt]);
                  workMatrix[String(Number(row) - oooo + 1)][rowtt] = newObj;
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
            this.$store.commit('incrementScore');
            break;
          }
        }
        doNewMatrix(0, Math.floor(Math.random() * 10), (Math.floor(Math.random() * 7) + 1));
      }
    }

    const doNewMatrix = (addressGlobal, addressLocal, color) => {
      // 0 - куб
      // 1 - полоска из 2-х кубов
      const figure = Math.floor(Math.random() * 2);
      //const color = Math.floor(Math.random() * 7) + 1; // 0 отсутствует цвет
      const firstOrder = addressGlobal;
      const secondOrder = addressLocal;
      console.log("Сработал рандом");
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
    }

    const renderF = () => {
      if (!end) {
        сalculateMovement();
        //count++
        this.$store.commit('increment')
        //this.$store.commit('сhangeKey', workMatrix)
      }
    }

    const gameStatus = () => {
      if (this.$store.state.status === 'Старт') {
        this.$store.commit('сhangeStatus', 'Стоп');

        let newCheck = 0;
        for (let i in workMatrix) {
          for (let j in workMatrix[i]) {
            if (workMatrix[i][j]['id'] === 2) {
              newCheck = 1;
              break;
            }
          }
          if (newCheck === 1) {
            break;
          }
        }
        if (newCheck !== 1) {
          doNewMatrix(0, Math.floor(Math.random() * 10), (Math.floor(Math.random() * 7) + 1));
        }
        this.timer = setInterval(renderF, 200);
      }
      else {
        this.$store.commit('сhangeStatus', 'Старт');
        clearInterval(this.timer);
      }
    }

    return {
      doNewMatrix,
      workMatrix,
      timer,
      rowDeleteColor,
      renderF,
      gameStatus,
    }
  },
}
</script>

<template>
  <div class="field">
    <h1 class="field__title">Тетрис</h1>
    <button class="field__button" v-on:click="gameStatus">{{ this.$store.state.status }}</button>
    <p class="field__hidden-text">{{ this.count }}</p>
    <div class="field__field">
      <div v-for="(item, index) in this.matrix" class="field__field-row">
        <div v-for="(itemTwo, indexTwo) in item" class="field__field-colomn">
          <div v-if="itemTwo.status === 1" class="cell cell__color_red"></div>
          <div v-else-if="itemTwo.status === 7" class="cell cell__color_orange"></div>
          <div v-else-if="itemTwo.status === 6" class="cell cell__color_yellow"></div>
          <div v-else-if="itemTwo.status === 4" class="cell cell__color_green"></div>
          <div v-else-if="itemTwo.status === 5" class="cell cell__color_blue"></div>
          <div v-else-if="itemTwo.status === 2" class="cell cell__color_lightblue"></div>
          <div v-else-if="itemTwo.status === 3" class="cell cell__color_purple"></div>
          <div v-else class="cell"></div>
        </div>
      </div>
    </div>
    <p class="field__score">Ваш счёт: {{ this.$store.state.score }}</p>
  </div>
</template>
