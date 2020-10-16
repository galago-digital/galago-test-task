# galago-test-task

Избыточное кол-во компонентов, в таком небольшом приложении скорее путаницу создает,
чем помогает.

Именование комопонентов сбивает с толку - Main..., Base... - вроде как должны быть тогда еще какие-то - не главные и базовые

Некоторые решения выглядят не связными, например маска номера телефон для разных стран,
но дата при этом только в российском формате. Если уж прикручивать что-то вроде интернационализации то делать для всего где можно применить.

## 17.09.2020 — start
```
Created vue-cli project.
```

## 18.09.2020 — upd 0.0.1
```
Added vuex;
Created components MainUsersTable and MainUsersTableButton.
```

## 20.09.2020 — upd 0.0.2
```
Added vue-the-mask and vuejs-datepicker dependencies;
Created component MainForm;
Created helper function validMail;
Created mixin formFieldMixin and components BaseFormField, BaseFormText,
BaseFormTel, BaseFormSelect, BaseFormDate;
Added core-js and regenerator-runtime dependencies;
Changed .browserslistrc;
Added transpiling for vuejs-datepicker at vue.config.js;
Other minor edits.
```
## 20.09.2020 — upd 0.0.3
```
Created component AppPagination.
```
## 21.09.2020 — upd 0.0.4
```
Added loading users from localStorage;
Other minor edits.
```
## 22.09.2020 — upd 0.0.5
```
Added find of mask for input type="tel";
Started layout working;
Other minor edits.
```
## 23.09.2020 — upd 0.0.6
```
Layout change;
Other minor edits.
```
## 24.09.2020 — upd 0.0.7
```
Created filter for naming of users count (usersDeclension.js);
Created telephone masks catalog (telMask.js);
Improved AppPagination component;
Layout change;
Other minor edits.
```
## 24.09.2020 — upd 0.0.8
```
Layout change;
Other minor edits.
```
## 25.09.2020 — upd 0.0.9
```
Layout change;
Added support of layout for IE10, IE11;
Other minor edits.
```
## 25.09.2020 — upd 0.1.0
```
Added animation;
Other minor edits.
```
## 30.09.2020 — upd 0.1.1
```
Added page's reset after sort.
```
## Used packets (vue-components)
```
vue-the-mask — ver. 0.11.1;
vuejs-datepicker — ver. 1.6.2.

All list of packets look in package.json.
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
