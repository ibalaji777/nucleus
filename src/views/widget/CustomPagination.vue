<template>
  <div class="pagination">
    <!-- Render the pagination links here -->
    <button v-for="page in totalPages" :key="page" @click="changePage(page)">
      {{ page }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    totalItems: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    totalPages () {
      return Math.ceil(this.totalItems / this.itemsPerPage)
    }
  },
  methods: {
    changePage (page) {
      this.$emit('page-changed', page)
    }
  }
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
