<template>
  <div class="run__table">

    <div class="table__headers">
      <TableButton
      class="headers__item"
      v-for="btn in buttonsTable"
      :key="btn.title"
      :param="btn"
      :sort-table="sortTable"
      />
    </div>

    <transition-group name="fade">
      <div class="table__row"
      v-for="user in users" :key="user.id">
        <div class="row__item">
          {{ user.registration }}
        </div>
        <div class="row__item">
          {{ user.name }}
        </div>
        <div class="row__item">
          {{ user.date }}
        </div>
        <div class="row__item">
          {{ user.email }}
        </div>
        <div class="row__item">
          {{ user.phone }}
        </div>
        <div class="row__item">
          {{ user.distance }}
        </div>
        <div class="row__item">
          {{ user.payment }}
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import TableButton from '@/components/MainUsersTableButton.vue';

export default {
  name: 'MainUsersTable',
  props: ['users', 'buttonsTable', 'sortTable'],
  components: { TableButton },
};
</script>

<style>
  h2 {
    text-align: center;
  }
  .run__table {
    width: 100%;
  }
  .table__headers, .table__row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .table__headers {
    padding: 20px 0 0 0;
    font-weight: 600;
  }
  .table__row {
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    border-radius: 50px;
    padding: 20px 0;
    margin: 25px 0;
    max-height: 125px;
    overflow: hidden;
  }
  .table__row:hover {
    background: rgba(0, 134, 248, 0.1);
    border: 1px solid rgba(0, 134, 248, 0.81);
    box-sizing: border-box;
    border-radius: 50px;
  }
  .row__item, .headers__item {
    width: 15%;
    margin: 5px 10px;
    font-size: 18px;
    text-align: center;
  }
  .header__btn-sort {
    text-align: left;
    padding: 0 15px;
    position: relative;
    background: transparent;
    font-weight: 600;
  }
  .header__btn-sort:before,
  .header__btn-sort:after {
    content: '';
    position: absolute;
    right: 20px;
    width: 8px;
    height: 8px;
    border: 6px solid transparent;
    outline: none;
  }
  .header__btn-sort:before {
    top: 60%;
    border-top: 8px solid #C4C4C4;
  }
  .header__btn-sort:after {
    bottom: 60%;
    border-bottom: 8px solid #C4C4C4;
  }
  .header__btn-sort.largest:before {
    /*
    тут и везде в .header__btn-sort дублироввание кода
    с классом largest отличие только цвет border
    поэтому достаточно указать border-color:  #0086F8
    */
    top: 60%;
    border-top: 8px solid #0086F8;
  }
  .header__btn-sort.smallest:after {
    bottom: 60%;
    border-bottom: 8px solid #0086F8;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateX(-120%);
    transition: all .8s;
    position: absolute;
  }
  .fade-leave-active {
    position: absolute;
    opacity: .2;
  }
</style>
