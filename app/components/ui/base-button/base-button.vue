<template>
  <button class="base-button" :class="btnClasses" :disabled="disabled">
    <span v-if="loading" class="base-button__loader"></span>
    <span v-else class="base-button__label">
      {{ btnLabel }}
    </span>
  </button>
</template>

<script setup lang="ts">
defineOptions({
  name: "base-button",
});

const { btnType = "primary", ...props } = defineProps<{
  btnLabel: string;
  btnType?: "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
}>();

const btnClasses = computed(() => ({
  "base-button--primary": btnType === "primary",
  "base-button--secondary": btnType === "secondary",
  "base-button--loading": props.loading,
}));
</script>

<style lang="scss">
@mixin font-1 {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0px;
}

.base-button {
  --border-color: transparent;
  --bg-color: transparent;

  padding: 8px 24px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-color);
  border-radius: 25px;
  cursor: pointer;

  transition: all 0.3s ease-in;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  &__label {
    @include font-1;
    color: var(--font-color);
  }

  &--primary {
    --border-color: #0b173933;
    --bg-color: transparent;
    --font-color: #0b1739;

    &:hover {
      --border-color: #6e6e6e94;
      --bg-color: #79797921;
    }

    &:active {
      --border-color: #55555594;
      --bg-color: #63636373;
    }
  }

  &:disabled {
    --bg-color: #4646464d;
    --border-color: transparent;
    --font-color: #55555594;
    cursor: default;
  }

  &__loader {
    width: 24px;
    height: 24px;
    border: 2px solid var(--font-color);
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  &--loading {
    pointer-events: none;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
