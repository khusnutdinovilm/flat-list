<template>
  <div class="chip-selector">
    <div
      v-for="item in items"
      :key="item.value"
      class="chip-selector__item"
      :class="{
        'chip-selector__item--selected': model.includes(item.value),
        'chip-selector__item--disabled': item.disabled,
      }"
      @click="toggleItem(item.value)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface IChip {
  value: number;
  label: string;
  disabled?: boolean;
}

defineOptions({
  name: "chip-multi-selector",
});

defineProps<{
  items: IChip[];
}>();

const model = defineModel<IChip["value"][]>({ required: true });

const selectedSet = computed<Set<IChip["value"]>>({
  get: () => new Set(model.value),
  set: (newSet: Set<IChip["value"]>) => {
    model.value = Array.from(newSet);
  },
});

const toggleItem = (value: IChip["value"]) => {
  const newSet = new Set(selectedSet.value);

  if (newSet.has(value)) {
    newSet.delete(value);
  } else {
    newSet.add(value);
  }

  selectedSet.value = newSet;
};
</script>

<style lang="scss">
.chip-selector {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 16px;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 44px;
    height: 44px;

    border-radius: 50%;

    background-color: #ffffff;

    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0px;

    cursor: pointer;
    user-select: none;

    color: #0b1739;

    transition: all 0.3s ease-in;

    &--selected {
      background-color: #3eb57c;
      color: #ffffff;
      box-shadow: 0px 6px 20px 0px #95d0a1;
    }

    &--disabled {
      color: #0b1739;
      opacity: 0.2;
      cursor: default;
      pointer-events: none;
    }
  }
}
</style>
