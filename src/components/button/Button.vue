<script>
import './Button.css';

export default {
  props: {
    mean: Number,
    addressGlobal: String,
    addressLocal: String,
  },
  data(props) {
    return {
      count: props.mean
    }
  },
}
</script>

<template>
  <button v-if="count >= 1" class="cell cell__color_black" @click="$emit('newMatrix', addressGlobal, addressLocal), count++" >{{ count }}</button>
  <button v-else class="cell" @click="$emit('newMatrix', addressGlobal, addressLocal), count++" >{{ count }}</button>
</template>