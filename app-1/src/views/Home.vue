<template>
  <v-layout row wrap justify-center class="mt-4">
    <v-flex xs12 sm10 text-xs-center>
      <v-textarea
        outlined
        readonly
        label="The text"
        v-model="text"
      ></v-textarea>
    </v-flex>
    <v-flex xs12 sm8 md4 text-xs-center>
      <speech-to-text :text.sync="text" @speechend="speechEnd"></speech-to-text>
    </v-flex>
    <v-flex xs12 text-xs-center class="mt-4">
      {{sentences}}
    </v-flex>
  </v-layout>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    'speech-to-text': HelloWorld
  },
  data() {
    return {
      sentences: null,
      text: ''
    }
  },
  methods: {
    speechEnd ({sentences, text}) {
      console.log('text', text)
      console.log('sentences', sentences)
      this.sentences = sentences
    }
  }
}
</script>
