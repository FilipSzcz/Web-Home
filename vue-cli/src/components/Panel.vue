<template>
  <div class="panel" v-if="this.$store.state.isUserLoggedIn">
    <app-header></app-header>
    <div class="wrapper">
      <div class="panel__content">
        <h1 class="panel__title">Twoje ogłoszenia</h1>
        <div class="added__list">
          <ul v-if="this.addedAdvs.length > 0">
            <li v-for="(adv,i) in this.addedAdvs" :key="i" class="added__product">
              <div class="added__product__img">
                <router-link :name="adv.name" :to="`/adv/${adv._id}`">
                  <img :src="adv.file[0]" alt />
                </router-link>
              </div>
              <div class="added__product__desc-left">
                <router-link :name="adv.name" :to="`/adv/${adv._id}`">
                  <h2 class="added__product__desc-left__title">{{adv.name}}</h2>
                </router-link>
                <p class="added__product__desc-left__city">{{adv.city}}, {{adv.district}}</p>
              </div>
              <div class="added__product__desc-right">
                <div class="added__product__desc-right__price-container">
                  <p class="added__product__desc-right__static">Cena:</p>
                  <h3
                    class="added__product__desc-right__price"
                  >{{adv.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}} zł</h3>
                </div>
                <p
                  class="added__product__desc-right__date"
                >Dodano: {{adv.term.date}}, {{adv.term.time}}</p>
              </div>
            </li>
          </ul>
          <h2 v-else class="added__list-empty">Brak dodanych ogłoszeń</h2>
          <router-link v-if="this.addedAdvs.length < 1" to="/add">
            <button class="added__list-btn--add">+ Add advertisement</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./Header.vue";
export default {
  components: {
    "app-header": Header
  },
  data: function() {
    return {
      addedAdvs: []
    };
  },
  created() {
    const vn = this;
    console.log(vn.$store.state.userData);
    axios.get("http://localhost:5000/products").then(response => {
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].author === vn.$store.state.userId) {
          vn.addedAdvs.unshift(response.data[i]);
        }
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/vars.scss";

.wrapper {
  max-width: 1300px;
  margin: 0 auto;
}
.panel__title {
  text-align: center;
  margin-top: 40px;
  text-transform: uppercase;
}
.added__list {
  position: relative;
  width: 90%;
  margin: 0 auto;
  margin-top: 50px;
  padding: 4%;
  border: 2px solid #009400;
  border-radius: 5px;
  margin-bottom: 20px;
  min-height: 300px;
  ul {
    list-style: none;

    .added__product {
      display: flex;
      height: 220px;
      margin-bottom: 20px;
      border: 1px solid rgba(153, 153, 153, 0.658);
      border-radius: 5px;
      &:nth-last-child(1) {
        margin-bottom: 0;
      }
      @include max-breakpoint(890px) {
        flex-direction: column;
        height: auto;
      }
      &:hover {
        background-color: rgba(241, 233, 233, 0.658);
      }

      a {
        display: flex;
        width: 100%;
      }

      .added__product__desc-left {
        flex: 1;
        position: relative;
        margin: 15px 10px;
        .added__product__desc-left__title {
          margin-bottom: 5px;
          font-size: 22px;
          &:hover {
            color: #333;
          }
        }
        .added__product__desc-left__city {
          font-size: 14px;
          font-weight: bold;
          color: #777;
        }
      }
      .added__product__desc-right {
        width: 150px;
        text-align: right;
        position: relative;
        margin: 15px 10px;
        @include max-breakpoint(890px) {
          width: auto;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        .added__product__desc-right__price-container {
          @include max-breakpoint(890px) {
            display: flex;
            flex-direction: column;
            margin-bottom: 10px;
            // margin-left: 10px;
            width: 140px;
            text-align: left;
            margin-left: 0;
          }
          // @include max-breakpoint(548px) {
          //   text-align: left;
          //   margin-left: 0;
          //   margin-top: 15px;
          // }
        }
        .added__product__desc-right__static {
          margin-bottom: 5px;
          font-family: 10px;
        }
        .added__product__desc-right__price {
          font-size: 20px;
          font-weight: bold;
          color: green;
        }
        .added__product__desc-right__date {
          font-size: 12px;
          position: absolute;
          right: 0;
          bottom: 0;
          color: #888;
          @include max-breakpoint(890px) {
            bottom: -10px;
          }
        }
      }
      .added__product__img {
        height: 100%;
        width: 300px;
        border-right: #666;
        overflow: hidden;
        @include max-breakpoint(890px) {
          width: 100%;
        }

        &:hover {
          // filter: brightness(0.9);
        }
        a {
          height: 100%;
          width: 100%;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          transition: 0.5s;
          &:hover {
            transform: scale(1.1);
          }
          @include max-breakpoint(890px) {
            max-height: 350px;
          }
        }
      }
    }
  }
}
.added__product__desc-left__list {
  display: flex;
  position: absolute;
  bottom: 10px;
  left: 10px;
  @include max-breakpoint(890px) {
    display: none;
  }
}
.added__product__desc-left__list__item {
  text-align: center;
  padding: 0 10px;
  position: relative;
  border-left: 1px solid rgba(119, 119, 119, 0.582);

  &:nth-last-child(1) {
    border-right: 1px solid rgba(119, 119, 119, 0.582);
  }

  .added__product__desc-left__list__item__text {
    font-weight: normal;
    font-size: 13px;
    letter-spacing: 0.3px;
  }
  .added__product__desc-left__list__item__value {
    font-weight: bold;
    font-size: 15px;
  }
}
.added__product__desc-left__list--mobile {
  display: none;
  @include max-breakpoint(890px) {
    display: flex;
    position: static;
    height: max-content;
    margin-right: 20px;
  }
}
.added__list-empty {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #888;
  font-size: 22px;
  font-style: italic;
}
.added__list-btn--add {
  position: absolute;
  right: 30px;
  bottom: 20px;
  padding: 10px 20px;
  outline: none;
  background-color: #009400;
  border: none;
  font-family: "Fjalla One", sans-serif;
  letter-spacing: 1px;
  border-radius: 3px;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background-color: orange;
    transform: scale(1.1);
  }
}
</style>