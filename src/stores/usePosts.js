import { defineStore } from 'pinia'
import axios from 'axios'

export const usePosts = defineStore('usePosts', {
  state: () => ({
    data: []
  }),

  getters: {
    getData: (state) => state.data
  },

  actions: {
    fetch ({ postId }) {
      return new Promise((resolve, reject) => {
        const config = {
          method: 'get',
          url: postId ? `https://jsonplaceholder.typicode.com/posts/${postId}` : 'https://jsonplaceholder.typicode.com/posts'
        }

        axios.request(config).then(response => {
          console.log('response: ', response)
          this.data = response.data
          resolve(response)
        }).catch(error => {
          console.log('error: ', error)
          reject(error)
        })
      })
    }
  }
})
