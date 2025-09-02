<template>
  <button
    class="sort-indicator"
    :class="{ 'sort-indicator--active': currSortDirection !== null }"
    type="button"
    :aria-label="`Sort by ${field}`"
    @click="updateSortDirection"
  >
    <span class="sort-indicator__label">
      {{ label }}
    </span>

    <span class="sort-indicator__arrows">
      <sort-asc-arrow
        class="sort-indicator__arrow"
        :class="{ 'sort-indicator__arrow--active': currSortDirection === 'asc' }"
      />

      <sort-desc-arrow
        class="sort-indicator__arrow"
        :class="{ 'sort-indicator__arrow--active': currSortDirection === 'desc' }"
      />
    </span>
  </button>
</template>

<script setup lang="ts">
defineOptions({
  name: "sort-indicator",
});

defineProps<{
  label: string;
  field: string;
}>();

const currSortDirection = defineModel<"asc" | "desc" | null>({ required: true });

const updateSortDirection = () =>
  (currSortDirection.value = currSortDirection.value === "asc" ? "desc" : "asc");
</script>

<style lang="scss">
@mixin font-1 {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
}

.sort-indicator {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 8px;

  user-select: none;
  cursor: pointer;

  &--active &__label {
    color: #3eb57c;
  }

  &__label {
    @include font-1;
    color: #0b1739;
  }

  &__arrows {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__arrow {
    width: 7px;
    height: 4px;
    color: #0b1739;
    opacity: 0.4;
    line-height: 0;

    &--active {
      color: #3eb57c;
      opacity: 1;
    }
  }
}
</style>
