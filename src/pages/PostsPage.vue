<script>
import { usePosts } from 'src/stores/usePosts'
import { computed, ref } from 'vue'
import Popup from 'src/components/Popup.vue'

export default {
  preFetch ({ store }) {
    return usePosts(store).fetch()
  }
}
</script>

<script setup>
const posts = computed(() => {
  return usePosts().getData
})

const popupModel = ref(false)
const selectedCard = ref(null)
const openPopup = (post) => {
  if (!post) {
    selectedCard.value = null
  } else {
    selectedCard.value = post
  }
  popupModel.value = true
}
</script>

<template>
  <q-page class="flex flex-center">
    <div
      v-for="post in posts"
      :key="post.id"
      class="post-card-wrapper q-pa-md"
    >
      <q-card
        @click="openPopup(post)"
        class="cursor-pointer text-white"
        :class="post.id % 2 === 0 ? 'bg-blue' : 'bg-cyan'"
        v-ripple
      >
        <q-card-section>
          {{ post.title }}
        </q-card-section>
      </q-card>
    </div>

    <Popup
      persistent
      v-model="popupModel"
      :post="selectedCard"
      full-width
    />
  </q-page>
</template>
