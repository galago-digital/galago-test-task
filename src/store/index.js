import Vue from 'vue';
import Vuex from 'vuex';
import userData from '@/data/users.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: userData.users,
    // sortButtons - логичнее все ж в компоненте хранить
    // vuex для общего состояния приложения
    sortButtons: [
      {
        title: 'Дата регистрации',
        sortId: 'registration',
        smallest: true,
        largest: false,
      },
      { title: 'ФИО' },
      {
        title: 'Дата рождения',
        sortId: 'date',
        smallest: false,
        largest: false,
      },
      { title: 'Email' },
      { title: 'Телефон' },
      {
        title: 'Дистанция, км',
        sortId: 'distance',
        smallest: false,
        largest: false,
      },
      {
        title: 'Сумма взноса, руб.',
        sortId: 'payment',
        smallest: false,
        largest: false,
      },
    ],
  },
  mutations: {
    addUser(state, upd) {
      state.users = upd;
    },
    sortUsers(state, { upd, id, sortTo }) {
      // сортировка должна быть не mutations,
      // их назначение - запись данных.
      // Тогда уж в actions

      // раз есть пагинация - сортировка должна ее учитывать
      // и сортировать внутри текущей страницы
      // сейчас наприер при сортировке по сумме взноса
      // пользователь с макс. суммой может быть на странице 2,
      // а при сортировке внезавно оказаться на первой странице
      const sortNum = () => {
        const updUsers = state.users.sort((a, b) => a[id] - b[id]);
        if (sortTo) updUsers.reverse();
        state.sortButtons = upd;
        state.users = updUsers;
      };
      // о том как хранить дату я написал ниже
      // такая сортировка по дате на редкость не оптимальна
      const sortDate = () => {
        const updUsers = state.users.sort((a, b) => {
          let aa = a[id].split('.');
          let bb = b[id].split('.');
          aa = +aa[0] + +aa[1] * 100 + +aa[2] * 1000;
          bb = +bb[0] + +bb[1] * 100 + +bb[2] * 1000;
          return aa - bb;
        });
        if (sortTo) updUsers.reverse();
        state.sortButtons = upd;
        state.users = updUsers;
      };
      switch (id) {
        case 'date':
        case 'registration':
          sortDate();
          break;
        default:
          sortNum();
          break;
      }
    },
  },
  actions: {
    loadUsersFromStorage(context) {
      let lStore = JSON.parse(localStorage.getItem('charity-run-app'));
      if (lStore) {
        lStore = lStore.map((item) => ({
          ...item,
          date: new Date(item.date).toLocaleDateString(),
          registration: new Date(item.registration).toLocaleDateString(),
        }));
        const upd = [...context.state.users, ...lStore];
        context.commit('addUser', upd);
      }
    },
    addUser(context, user) {
      const id = context.state.users.length + 1;
      // "дешевле" было бы написать
      // user.date = new Date(user.date).toLocaleDateString(),
      // чем
      //  ...user,
      //  date: new Date(user.date).toLocaleDateString(),

      // Еще лучше хранить дату как дату, и форматировать при выводе, а не в хранилище.
      // Тогда и функция sortDate была бы намного проще и короче.
      // ее вообще можно было бы не создавать - сравнивая дату как timestamp
      // в функции sortNum.
      const upd = [...context.state.users, {
        ...user,
        id,
        // не ошибка, но всегда полагаться на toLocaleDateString не стоит.
        // Могут быть сюрпризы, например в safari
        date: new Date(user.date).toLocaleDateString(),
        registration: new Date(user.registration).toLocaleDateString(),
      }];
      context.commit('addUser', upd);

      const lStore = JSON.parse(localStorage.getItem('charity-run-app'));
      // если вынести сохраняемые данные в переменную можно избежать дублирования кода
      // let upd = { ...user, id: `by-user${id}` }
      // if (lStore) {
      //   localStorage.setItem('charity-run-app', JSON.stringify([...lStore, upd]));
      // } else {
      //   localStorage.setItem('charity-run-app', JSON.stringify([upd]));
      // }

      if (lStore) {
        const updlStore = [...lStore, { ...user, id: `by-user${id}` }];
        localStorage.setItem('charity-run-app', JSON.stringify(updlStore));
      } else {
        localStorage.setItem('charity-run-app', JSON.stringify([{ ...user, id: `by-user${id}` }]));
      }
    },
    updateSort(context) {
      const buttons = context.state.sortButtons;
      const countSortBtn = buttons
        .find((btn) => (btn.smallest === true) || (btn.largest === true));
      const id = countSortBtn.sortId;
      const sortTo = !countSortBtn.smallest;
      context.commit('sortUsers', { upd: buttons, id, sortTo });
    },
    sortUsers(context, id) {
      const btn = context.state.sortButtons.find((obj) => obj.sortId === id);

      if (btn.smallest) {
        btn.smallest = false;
        btn.largest = true;
      } else {
        btn.smallest = true;
        btn.largest = false;
      }

      const upd = context.state.sortButtons.map((obj) => {
        if (obj.sortId === id) return btn;
        return {
          ...obj,
          smallest: false,
          largest: false,
        };
      });

      const sortTo = !btn.smallest;
      context.commit('sortUsers', { upd, id, sortTo });
    },
  },
});
