<template>
  <div class="range-slider">
    <label class="range-slider__label">
      {{ label }}
    </label>

    <div class="range-slider__body">
      <div class="range-slider__values">
        <output class="range-slider__value">
          <span class="range-slider__value-prefix">от</span>
          {{ formattedValues.min }}
        </output>

        <output class="range-slider__value">
          <span class="range-slider__value-prefix">до</span>
          {{ formattedValues.max }}
        </output>
      </div>

      <div class="range-slider__track-container">
        <vue-slider
          v-model="proxyValues"
          :min="min"
          :max="max"
          :interval="step"
          :dot-style="{ background: '#3EB57C' }"
          :process-style="{ background: '#3EB57C' }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueSlider from "vue-3-slider-component";

defineOptions({
  name: "range-slider",
});

const props = defineProps<{
  label: string;
  max: number;
  min: number;
  step?: number;
}>();

const model = defineModel<{ min: number; max: number }>({ required: true });

const proxyValues = computed({
  get: () => [model.value.min, model.value.max],
  set: ([min, max]) => {
    model.value = {
      min: min ?? props.min,
      max: max ?? props.max,
    };
  },
});

const formattedValues = computed(() => ({
  min: proxyValues.value[0]?.toLocaleString("ru-RU"),
  max: proxyValues.value[1]?.toLocaleString("ru-RU"),
}));
</script>

<style lang="scss">
.range-slider {
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__label {
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: 0px;

    color: #0b1739;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__values {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }

  &__value {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 8px;

    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0px;
    color: #0b1739;

    &-prefix {
      font-weight: 400;
    }
  }
}
</style>
