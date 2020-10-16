<template>
  <label class="form__label input__tel">
    <span class="form__value">{{ title }}</span>
      <span v-show="currentMask.content" class="flags-font">
        {{ currentMask.content }}
      </span>

      <input type="tel" class="form__input"
      v-mask="currentMask.mask"
      :placeholder="placeholder"
      v-model="dataValue"
      @focus="onFocus"
      @blur="onBlur"
      />
  </label>
</template>

<script>
import { mask } from 'vue-the-mask';
import { defaultMask, maskData } from '@/data/telMask';

export default {
  name: 'BaseFormTel',
  props: ['title', 'placeholder', 'value'],
  directives: { mask },
  data() {
    return {
      focus: false,
      currentMask: defaultMask,
      maskData,
    };
  },
  methods: {
    findMask() {
      if (this.dataValue) {
        const findMask = this.maskData
          .filter((item) => item.code_pattern.test(this.dataValue))[0];
        if (findMask) this.currentMask = findMask;
      } else {
        this.currentMask = defaultMask;
      }
    },
    onFocus() {
      this.focus = true;
    },
    onBlur() {
      this.focus = false;
      const numbers = this.dataValue.replace(/\D*/g, '');
      const { pattern } = this.currentMask;
      const test = pattern.test(numbers);
      if (!test) {
        // я не до конца вввел номер, прешел к другому полю -
        // и поле с номером очистилось. Зачем? Вместо исправления надо вводить заново
        this.$emit('input', '');
        this.currentMask = defaultMask; // а это тут лишнее
      } else {
        this.$emit('input', numbers);
      }
    },
  },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  watch: {
    dataValue() {
      this.findMask();
    },
  },
};
</script>
<style media="screen">
  .input__tel {
    position: relative;
  }
  .flags-font {
    font-family: 'BabelStoneFlagsDual';
    position: absolute;
    top: 0;
    right: 30px;
  }
</style>
