<script>
import "./Field.css"
import Buttonk from './button/Button.vue'

export default {
  components: {
    Buttonk,
  },
  props: {
    matrix: Object,
  },
  methods: {
    methodThatForcesUpdate() {
      // ...
      console.log('dd');
      this.$forceUpdate();  // Заметьте, что мы используем $ в качестве префикса
      // ...
    }
  },
  data(props) {
    const randomCFirstCell = Math.floor(Math.random() * 10);
    let indexUpdate = 0;
    console.log(props.matrix);
    function сalculateMovement(matrix, indexUpdate) {
      let found = 0;
      for (let i in matrix) {
        for (let j in matrix[i]) {
          console.log("Не найден чёрный квадрат");
          if (matrix[i][j]["status"] === 1) {
            console.log("Найден чёрный квадрат");
            // смещаем чёрный квадрат вниз
            matrix[i][j]["status"] = 0;
            console.log(String(Number(i)))
            matrix[String(Number(i) + 1)][j]["status"] = 1;
            matrix[i][j]["id"] = String(String(matrix[i][j]["id"]) + "new");
            found = 1;
            return indexUpdate += 1;
            break
          }
        }
        if (found === 1)
          break;
      }
    }

    function doNewMatrix(addressGlobal, addressLocal) {
      const firstOrder = addressGlobal;
      const secondOrder = addressLocal;
      props.matrix[firstOrder][secondOrder]["status"] += 1
      return props.matrix;
    }

    doNewMatrix(0, randomCFirstCell);
    сalculateMovement(props.matrix);

    setInterval(() => {
      indexUpdate = сalculateMovement(props.matrix, indexUpdate);
      console.log(indexUpdate)
      this.forceRerender()
    }, 3000);


    //const updateTime = () => setTimeout(сalculateMovement(props.matrix), 3000);
    //updateTime();

    return {
      doNewMatrix,
      indexUpdate,
      renderComponent: true,
    }
  },
  methods: {
    forceRerender() {
      // Сначала скроем компонент
      this.renderComponent = false;

      this.$nextTick(() => {
        // А потом покажем снова
        console.log('ddddddddddddddddddddddd')
        this.renderComponent = true;
      });
    }
  },
}
</script>

<template>
  <div class="firstClass">
    <div v-for="(item, index) in matrix" class="twoClass">
      <Buttonk v-for="(itemTwo, indexTwo) in item" 
        :key=itemTwo.id 
        :mean=itemTwo.status 
        :addressGlobal=index
        :addressLocal=indexTwo 
        @newMatrix=doNewMatrix />
    </div>
  </div>
</template>
