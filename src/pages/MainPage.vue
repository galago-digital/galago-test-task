<template>
  <section class="run">

    <div class="run__row">
      <div class="run__col col__left">
        <h1 class="run__title_h1">
          Марафон в поддержку детей
        </h1>

        <img src="@/assets/runners.png" alt="" class="run__title-img">
      </div>

      <div class="run__col col__right">
        <MainForm
        :add-user="this.addUserInTable"
        />
      </div>
    </div>

    <h2 class="run__title_h2" v-show="countUsers > 0">
      С нами уже {{ countUsers | usersDeclension }}
    </h2>
    <div class="run_row run__row-table">

        <MainUsersTable
        :users="usersForTable"
        :buttons-table="this.sortButtons"
        :sort-table="this.getSort"
        />
        <!-- this.countUsers > this.usersPerPage - подобные вещи лучше выносить
        в computed -->
        <AppPagination v-if="this.countUsers > this.usersPerPage"
        v-model='page'
        :page="page"
        :count="countUsers"
        :perPage="usersPerPage"
        :limit="limitPagination"
        />
    </div>
    <component :is="'style'" v-if="isIE10">
      <!-- justify-content: flex-start !important;
      - это ничем не поможет в IE10, он только синтаксис 2012 года понимает
        -->
      .headers__item {
       display: flex !important;
       justify-content: flex-start !important;
       align-items: center !important;
      }
      .row__item, .headers__item {
       width: 10% !important;
      }
      .header__btn-sort {
       padding: 0 11% 0 0 !important;
      }

    </component>
  </section>
</template>

<script>
import MainUsersTable from '@/components/MainUsersTable.vue';
import AppPagination from '@/components/AppPagination.vue';
import MainForm from '@/components/MainForm.vue';
import { mapState, mapActions } from 'vuex';
import usersDeclension from '@/helpers/usersDeclension';

export default {
  name: 'MainPage',
  data() {
    return {
      page: 1,
      usersPerPage: 4,

      limitPagination: 10,
    };
  },
  filters: { usersDeclension },
  methods: {
    ...mapActions([
      'addUser',
      'updateSort',
      'sortUsers',
      'loadUsersFromStorage',
    ]),
    getSort(sortId) {
      this.sortUsers(sortId);
      this.page = 1;
    },
    addUserInTable(user) {
      this.addUser(user);
      this.updateSort();
      this.page = 1;
    },
    updateUsersPerPage() {
      const vh = window.innerHeight;
      switch (true) {
        case (vh <= 740):
          this.usersPerPage = 3;
          break;
        default:
          this.usersPerPage = 4;
          break;
      }
    },
  },
  computed: {
    ...mapState(['users', 'sortButtons']),
    isIE10() {
      try {
        const agent = navigator.userAgent;
        const reg = /MSIE ([^;]*)/;
        const ver = reg.exec(agent)[1].split('.')[0];
        return (+ver === 10);
      } catch {
        return false;
      }
    },
    totalUsers() {
      return this.users.length;
    },
    countUsers() {
      return this.users ? this.totalUsers : 0;
    },
    usersForTable() {
      const end = this.usersPerPage * this.page;
      const start = end - this.usersPerPage;
      return this.users
        .filter((usr) => this.users.indexOf(usr) < end && this.users.indexOf(usr) >= start);
    },
  },
  components: {
    MainUsersTable,
    MainForm,
    AppPagination,
  },
  created() {
    this.loadUsersFromStorage();
    this.updateSort();
    this.updateUsersPerPage();
    window.addEventListener('resize', this.updateUsersPerPage);
  },
};
</script>
<style>
.run-wrapper {
  background: #FFFFFF;
  box-shadow: 0px 20px 20px 15px rgba(0, 0, 0, 0.5);
  border-radius: 50px;
  width: 90%;
  overflow: hidden;
  width: 90.2vw;
  height: 90.2vh;
  max-width: 1920px;
  max-height: 1080px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.run {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 45px 0 0 0;
}
.run__title_h1 {
  font-size: 36px;
  line-height: 43px;
  font-weight: 600;
}
.run__row {
  display: flex;
}
.run__row-table {
  background: #F5F5F5;
  height: 524px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 35px;
}
.run__col {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.col__left {
  width: 35%;
  padding: 0 0 0 95px;
}
.col__right {
  width: 65%;
}
.run__title-img {
  margin: 20px 0 0 0;
}
.run__title_h2 {
  font-size: 18px;
  line-height: 22px;
  font-weight: 600;
  text-align: right;
  padding: 10px 70px;
}
@media (max-width: 1919px), (max-height: 1079px) {

  .run-wrapper {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
  .run {
    padding: 2vh 0;
  }
  .run__row {
    height: 32vh;
  }
  .run__title-img {
    height: 24vh;
  }
  .run__title_h2 {
    font-size: 18px;
    height: 7vh;
  }
  .run__row-table {
    height: 59vh;
    padding-bottom: 18px;
  }
  .col__left {
    padding: 0 0 0 40px;
  }
  .run__title_h1 {
    font-size: 25px;
  }
  .form__submit, .form__submit:disabled {
    margin-top: 15px;
  }
  .header__btn-sort:before, .header__btn-sort:after {
    right: 0;
  }
}

@media (max-width: 1439px), (max-height: 899px) {
  .run__title-img {
    display: none;
  }
  .run {
    display: block;
  }
  .run__row {
    flex-direction: column;
  }
  .run__form {
    padding: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  .col__left, .col__right {
    width: 100%;
  }
  .run__form-row {
    width: 50%;
  }
  .row__item, .headers__item {
    font-size: 16px;
  }
  .form__value, .form__input, .form__submit, .form__submit:disabled {
    font-size: 16px;
  }
  .table__row {
    padding: 10px 0;
  }
  .run__form-container {
    width: 100%;
    height: fit-content;
  }
}

</style>
