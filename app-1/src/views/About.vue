<template>
  <section class="display">
    <video
      ref="video"
      autoplay="true"
      playsinline
      @loadedmetadata="runModel"
    />
    <canvas ref="canvas" />
    <li class="board">
      <ul
        v-for="(item,key) in board"
        :key="key"
      >
        {{ key }} ： {{ item }}
      </ul>
    </li>
  </section>
</template>

<script>
import * as faceAPI from 'face-api.js'
export default {
  name: 'Video',
  data() {
    return {
      constraints: {
        video: {
          width: {
            min: 320,
            ideal: 1280,
            max: 1920
          },
          height: {
            min: 240,
            ideal: 720,
            max: 1080
          },
          frameRate: {
            min: 15,
            ideal: 30,
            max: 60
          },
          facingMode: 'environment'
        },
      },
      board: {
        realTimeCountsFace: 0,
      },
      forwardTimes: []
    }
  },
  computed: {
    initParams() {
      const data = {
        modelUri: 'models',
        option: new faceAPI.SsdMobilenetv1Options({ minConfidence: 0.5 })
      }

      return data
    },
    // updateTimeStats = (timeInMs) => {
    //   forwardTimes = [timeInMs].concat(forwardTimes).slice(0, 30)
    //   const avgTimeInMs = forwardTimes.reduce((total, t) => total + t) / forwardTimes.length
    //   board.fps = faceAPI.utils.round(1000 / avgTimeInMs)
    // },
  },
  async mounted() {
    await this.initModel()
    this.startStream()
    this.runModel()
    // this.updateTimeStats
  },
  methods: {
    async startStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        console.log(stream);
        this.$refs.video.srcObject = stream
        this.$refs.video.play();
      } catch (error) {
        console.error(error.message)
        console.log('here');
      }
    },
    async initModel(){
      await faceAPI.nets.ssdMobilenetv1.loadFromUri(this.initParams.modelUri)
      await faceAPI.nets.ageGenderNet.loadFromUri(this.initParams.modelUri)
    },
    async runModel(){
      console.log('sini run model');
      const result = await faceAPI.detectAllFaces(this.$refs.video, this.initParams.option)
      
      // console.log(result);

      let canvas = this.$refs.canvas;
      let ctx = canvas.getContext("2d");
      let vid = this.$refs.video;

      canvas.width = vid.width;
      canvas.height = vid.height;
      ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);

      if (result) {
        const dims = faceAPI.matchDimensions(canvas, this.$refs.video, true)
        const resizeResults = faceAPI.resizeResults(result, dims)
        this.board.realTimeCountsFace = resizeResults.length
        // faceAPI.draw.drawDetections(canvas, resizeResults)
      }
      setTimeout(() => this.runModel())
    }
  }
}
</script>

<style scoped>
.display{
  width: 100%;
  height: 100vh;
  position: absolute;
}
video {
  /* position: absolute; */
  object-fit: cover;
  width: 250px;
  height: 150px;
  position: fixed;
  right: 1%;
  bottom: 3%;
  border-radius: 15px;
}
canvas {
  position: fixed;
  right: 1%;
  bottom: 3%;
  z-index: 10;
  width: 250px;
  height: 150px;
}
.board{
  font-size: 30px;
  list-style: none;
  background-color: rgba(255, 255, 255, 0.65);
  border-radius: 10px;
  left: 10px;
  padding: 15px;
  position: absolute;
  top: 10px;
  z-index: 20;
}
</style>
