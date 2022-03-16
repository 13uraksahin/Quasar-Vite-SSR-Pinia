<script>
import { usePosts } from 'src/stores/usePosts'
import { computed, ref } from 'vue'
import Popup from 'src/components/Popup.vue'

export default {
  preFetch ({ store, currentRoute }) {
    return usePosts(store).fetch({ postId: currentRoute.params.postId })
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
    <template v-if="posts.length > 1">
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
    </template>

    <div
      v-else
      class="post-card-wrapper q-pa-md"
    >
      <q-card class="bg-positive text-white">
        <q-list>
          <q-item
            v-for="(value, key) in posts"
            :key="key"
            clickable
            v-ripple
            @click="notify({ value, key, post: props.post })"
          >
            <q-item-section class="col-auto">
              <q-item-label>{{ `${key}: ` }}</q-item-label>
            </q-item-section>
            <q-item-section side class="col">
              <q-item-label class="text-white text-right">{{ value }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
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
