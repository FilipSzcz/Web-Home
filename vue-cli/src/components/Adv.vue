<template>
  <div>
    <app-header></app-header>
    <div class="wrapper">
      <div v-if="this.loaded" class="product">
        <h2 class="product__title">{{this.product.name}}</h2>
        <router-link class="product__back-btn" to="/">< powrót do listy</router-link>
        <div class="owl-carousel owl-desc-aside owl-3-item owl-theme">
          <carousel
            :responsive="{
        0: {
            items: 1
        },
        541: {
            items: 1.2
        },
        900: {
            items: 1.3
        }
      }"
            :loop="true"
            :center="true"
            :autoplay="false"
            :nav="true"
          >
            <div v-for="(image,i) in this.product.file" :key="i" class="item">
              <div class="owl-img">
                <img :src="image" alt />
              </div>
            </div>
          </carousel>
        </div>
        <div class="product__mainInfo">
          <div class="product__mainInfo-price">
            <p>Cena</p>
            <span>{{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}} zł</span>
          </div>
          <div class="product__mainInfo-numbers">
            <ul class="product__mainInfo-list">
              <li class="product__mainInfo-list__item">
                <p class="product__mainInfo-list__item__text">Metraż</p>
                <p class="product__mainInfo-list__item__value">{{product.surface}}</p>
              </li>
              <li class="product__mainInfo-list__item">
                <p class="product__mainInfo-list__item__text">Pokoje</p>
                <p class="product__mainInfo-list__item__value">{{product.rooms}}</p>
              </li>
              <li class="product__mainInfo-list__item">
                <p class="product__mainInfo-list__item__text">Rok</p>
                <p class="product__mainInfo-list__item__value">{{product.year}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="product__basic">
          <h2 class="product__basic-title">Podstawowe informacje</h2>
          <div class="product__basic-item">
            <p>Miasto</p>
            <span>{{product.city}}</span>
          </div>
          <div class="product__basic-item">
            <p>Dzielnica</p>
            <span>{{product.district}}</span>
          </div>
          <div class="product__basic-item">
            <p>
              Cena za m
              <sup>2</sup>
            </p>
            <span>{{Math.round((product.price/product.surface)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}} zł</span>
          </div>
          <div class="product__basic-item">
            <p>Powierzchnia</p>
            <span>
              {{product.surface}} m
              <sup>2</sup>
            </span>
          </div>
          <div class="product__basic-item">
            <p>Liczba pokoi</p>
            <span>{{product.rooms}}</span>
          </div>
          <div class="product__basic-item">
            <p>Rok wybudowania</p>
            <span>{{product.year}}</span>
          </div>
          <div class="product__basic-item product__basic-item--phone">
            <p>Telefon</p>
            <span>{{product.phone.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}}</span>
          </div>
        </div>
        <div class="product__desc">
          <h2 class="product__desc-title">Treść ogłoszenia</h2>
          <p class="product__desc-text" v-html="product.desc"></p>
        </div>
        <div class="product__data">
          <p>Ogłoszenie dodano:</p>
          <span>{{product.term.date}}, {{product.term.time}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./Header.vue";
import carousel from "vue-owl-carousel";
export default {
  components: {
    carousel,
    "app-header": Header
  },
  data: function() {
    return {
      product: "",
      loaded: false
    };
  },
  created() {
    const vn = this;
    axios.get("http://localhost:5000/products").then(response => {
      for (let i = 0; i < response.data.length; i++) {
        if (this.$route.params.id == response.data[i]._id) {
          vn.product = response.data[i];
        }
      }
      this.loaded = true;
    });
  },
  updated() {
    this.$el.querySelector(".owl-next").textContent = "";
    this.$el.querySelector(".owl-prev").textContent = "";
  }
};
</script>

<style lang="scss">
@import "../styles/vars.scss";
@import "../styles/owl.scss";

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f4f4f4;
  padding: 3%;
}
.product__back-btn {
  color: rgb(0, 0, 201);
  font-weight: bold;
}
.product__title {
  margin-top: 20px;
  margin-bottom: 2px;
}
.product__mainInfo {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  justify-content: space-between;
  padding: 20px 5px;
  border-top: 1px solid #999;
  border-bottom: 1px solid #999;

  .product__mainInfo-price {
    @include max-breakpoint(630px) {
      width: 100%;
    }
    p {
      font-size: 13px;
    }
    span {
      font-size: 30px;
      color: green;
      font-weight: bold;
    }
  }

  .product__mainInfo-numbers {
    @include max-breakpoint(630px) {
      width: 100%;
      margin-top: 20px;
    }
    .product__mainInfo-list {
      list-style: none;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 100%;
      @include max-breakpoint(630px) {
        justify-content: center;
      }

      .product__mainInfo-list__item {
        text-align: center;
        padding: 0 30px;
        border-left: 1px solid black;
        .product__mainInfo-list__item__value {
          font-weight: bold;
        }
        &:nth-last-child(1) {
          border-right: 1px solid black;
        }
        @include max-breakpoint(630px) {
          margin: 0;
          padding: 0 20px;
          height: 100%;
        }
      }
    }
  }
}
.product__basic {
  margin-top: 15px;
  .product__basic-title {
    color: grey;
    font-size: 18px;
    margin-bottom: 15px;
  }
  .product__basic-item {
    width: 33%;
    display: inline-block;
    margin-bottom: 20px;
    @include max-breakpoint(690px) {
      width: 49%;
    }
    &.product__basic-item--phone {
      span {
        color: #ea7225;
      }
    }
    p {
      color: grey;
    }
    span {
      font-weight: bold;
    }
  }
}
.product__desc {
  padding: 20px 0;
  border-top: 1px solid #999;
  border-bottom: 1px solid #999;
  .product__desc-title {
    color: grey;
    font-size: 18px;
  }
  .product__desc-text {
    margin-top: 15px;
  }
}
.product__data {
  text-align: right;
  color: grey;
  font-size: 12px;
  margin-top: 15px;
  p {
    margin-bottom: 3px;
  }
}
</style>