<template>
    <div class="title">
        <div class="ssg dom fade-in">
          <DomSVG></DomSVG>
        </div>
        <div class="titlesplit">
            <div class="hide">
                <h1 class="shadow-text risetext">Tankstellen</h1>
            </div>
            <div class="row">
                <h1 class="cologne shadow-text droptext ">Köln</h1>
                <div class="ssg gas fade-in">
                  <GasStationSVG />
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import GasStationSVG from "./GasStationSVG.vue";
import DomSVG from "./DomSVG.vue";

</script>

<style scoped>

.row{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
  overflow: hidden;
}
.title{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 3em;
}

.titlesplit{
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0;
    margin: 0;
}

.cologne{
    padding-left: 50px;
}

h1{
    margin:0;
}

.ssg{
  color: black;
}

.dom{
    height: 300px;
    width: 200px;
    position: relative;
    left: 100px; 
    top: -20px;
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

}

.risetext{
    display: inline-block;
    position: relative;
    animation: slide-in-up .5s ease-out forwards, shift-shadow .5s ease-in-out .5s forwards;
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
    animation: slide-in-down .5s ease-out forwards, shift-shadow .5s ease-in-out .5s forwards;
}

@keyframes slide-in-down {
    0% {
        transform: translateY(-200%);
    }
    100% {
        transform: translateY(0);
    }
}


</style>