<script>
import "./General.css"

export default {
  data() {
    return {}
  },
}
</script>

<template>
  <section class="general">
    <h1 class="general__title">Тетрис</h1>
    <p class="general__description">
      Данная работа разрабатывается на фреймворке VueJS в учебных целях.
      Проект уже можно использовать, так как минимальный функционал тетриса реализован.
      Используются состояния из библиотеки Vuex, используется роутинг.
    </p>
    <p class="general__list-title">Технологии:</p>
    <ul class="general__list">
      <li class="general__element">VueJS</li>
      <li class="general__element">БЭМ</li>
      <li class="general__element">API</li>
      <li class="general__element">JS</li>
      <li class="general__element">CSS3</li>
      <li class="general__element">HTML5</li>
      <li class="general__element">Адаптивность (для устройств до 400px и от 1000px)</li>
      <li class="general__element">NodeJS (2 запроса POST/GET)</li>
    </ul>
    <button class="general__button"> Начать игру</button>
  </section>
</template>
