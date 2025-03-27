<template>
    <div class="title">
        <div class="titlesplit">
            <div class="ssg dom dom1 fade-in">
              <DomSVG></DomSVG>
            </div>
            <div class="row">
                <h1 class="shadow-text droptext cologne ">
                    Kölner
                </h1>
                <div class="ssg dom dom2 fade-in">
                  <DomSVG></DomSVG>
                </div>
            </div>
            <div class="hide">
                <h1 class="shadow-text risetext tankstellen">Tankstellen</h1>
            </div>
        </div>
        <div class="subtitlecont">
            <div class="subtitle">Finden Sie eine passende Tankstelle in Ihrer nähe!</div>
        </div>
    </div>
</template>

<script setup>
import GasStationSVG from "./GasStationSVG.vue";
import DomSVG from "./DomSVG.vue";

</script>

<style scoped>

.subtitle{
    text-align: end;
    font-size: 0.4em;
    padding-right: 90px;
}

.row{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: end;
    gap: 20px;
    overflow: hidden;
}

.title{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 3em;
    gap: 50px;
}

.titlesplit{
    display: flex;
    flex-direction: row;
    height: 100%;
    padding: 0;
    margin: 0;
}

@media screen and (max-width: 1000px){
    .titlesplit{
        flex-direction: column;
    }
}

h1{
    margin:0;
}

.ssg{
  color: black;
}

.dom{
    height: 200px;
    width: 200px;
}

.gas{
    height: 80px;
    width: 80px;
}

@keyframes shift-shadow {
  100% {
    text-shadow: 
      -2px -2px 0 white,
      -4px -4px 0 black;
  }
}

.hide{
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: end;
}

.risetext{
    display: inline-block;
    position: relative;
    animation: slide-in-up .5s cubic-bezier(0.55, 0, 0.1, 1) forwards, shift-shadow .5s ease-in-out .5s forwards;
}

@keyframes slide-in-up {
    0% {
        transform: translateY(200%);
    }
    100% {
        transform: translateY(0);
    }
}

.droptext{
    display: inline-block;
    position: relative;
    animation: slide-in-down .5s cubic-bezier(0.55, 0, 0.1, 1) forwards, shift-shadow .5s ease-in-out .5s forwards;
}

@keyframes slide-in-down {
    0% {
        transform: translateY(-200%);
    }
    100% {
        transform: translateY(0);
    }
}

@media (min-width: 1000px) {
  .dom2 {
    display: none;
  }
}

@media (max-width: 1000px) {
  .dom1 {
    display: none;
  }
}

.tankstellen{
    padding-left: 30px;
}

</style>