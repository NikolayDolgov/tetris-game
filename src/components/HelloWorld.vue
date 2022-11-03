<script>
import "./HelloWorld.css"
import Buttonk from './button/Button.vue'

export default {
  components: {
    Buttonk,
  },
  props: {
    matrix: Object,
  },
  data(props) {
    const randomCFirstCell = Math.floor(Math.random() * 10);

    doNewMatrix(0, randomCFirstCell);

    function сalculateMovement(matrix) {
      for (let i in matrix) {
        for (let j in matrix[i]) {
          console.log("Не найден чёрный квадрат");
          if (matrix[i][j] === 1) {
            console.log("Найден чёрный квадрат");
            break
          }
        }
      }
    }
    //сalculateMovement(matrix);
    const updateTime = () => setTimeout(сalculateMovement(props.matrix), 5000);
    updateTime();
    function doNewMatrix(addressGlobal, addressLocal) {
      const firstOrder = addressGlobal;
      const secondOrder = addressLocal;
      props.matrix[firstOrder][secondOrder] += 1
      
      return props.matrix;
    }
    return {
      doNewMatrix,
    }
  },
}

</script>

<template>
  <div class="firstClass">
    <div v-for="(item, index) in matrix" class="twoClass">
      <div v-for="(itemTwo, indexTwo) in item" class="cell">
        <Buttonk :mean=itemTwo :addressGlobal=index :addressLocal=indexTwo @newMatrix=doNewMatrix />
      </div>
    </div>
  </div>
</template>
