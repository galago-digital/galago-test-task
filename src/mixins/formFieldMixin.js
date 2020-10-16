/* eslint-disable max-len */
import BaseFormField from '@/components/BaseFormField.vue';

export default {
  components: { BaseFormField },
  props: ['title', 'error', 'placeholder', 'value', 'min'],
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
};

// Создание этого миксина и комопнента BaseFormField избыточно - он используется лишь в 2х компонентах.
// Поэтому где-то dataValue - получается в миксине, где-то - часть комопонета.
// Если бы в миксине было только dataValue и использовалось везде было бы более оправдано.
// При этом на BaseFormField можно было бы оставить "обертку" полей с label - и так же использовать везде.

// Так же использование миксина в таком виде вносит путаницу в отображение ошибок формы. Например ошибка в поле Email отображается как красный крест (болше ассоциируется с закрыть, чем с ошибкой в поле),
// а в поле Сумма взноса ошибка выглядит как тень вокруг поля красного цвета.
