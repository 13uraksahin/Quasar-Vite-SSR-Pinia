<script setup>
import { defineProps } from 'vue'
import { useQuasar } from 'quasar'

const props = defineProps({
  post: { required: true }
})

const $q = useQuasar()

const notify = ({ value, key, post }) => {
  $q.notify({
    message: `You clicked the post with the ID of: ${post.id}`,
    color: 'orange'
  })
  console.log('value: ', value)
  console.log('key: ', key)
  console.log('post: ', post)
}
</script>

<template>
  <q-dialog>
    <q-card>
      <div class="full-width row items-center">
        <div class="text-h6 q-pl-md">Details</div>
        <q-space />
        <q-btn class="full-height" icon="close" padding="12px" flat v-close-popup />
      </div>
      <q-separator />
      <q-card-section>
        <q-list>
          <q-item
            v-for="(value, key) in props.post"
            :key="key"
            clickable
            v-ripple
            @click="notify({ value, key, post: props.post })"
          >
            <q-item-section class="col-auto">
              <q-item-label>{{ `${key}: ` }}</q-item-label>
            </q-item-section>
            <q-item-section side class="col">
              <q-item-label class="text-right">{{ value }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
