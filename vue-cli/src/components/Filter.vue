<template>
  <div class="main">
    <app-header></app-header>
    <div class="products">
      <h1 v-if="this.products.length > 0" class="products__title">Ogłoszenia</h1>
      <div class="products__list">
        <router-link class="product__back-btn" to="/">< powrót do wszystkich ogłoszeń</router-link>
        <h2 v-if="this.products.length === 0" class="product__none">Nie znaleziono ogłoszeń</h2>
        <ul>
          <li v-for="(product,i) in products" :key="i" class="products__product">
            <div class="products__product__img">
              <router-link :name="product.name" :to="`/adv/${product._id}`">
                <img :src="product.file[0]" alt />
              </router-link>
            </div>
            <div class="products__product__desc-left">
              <router-link :name="product.name" :to="`/adv/${product._id}`">
                <h2 class="products__product__desc-left__title">{{product.name}}</h2>
              </router-link>
              <p class="products__product__desc-left__city">{{product.city}}, {{product.district}}</p>
              <ul class="products__product__desc-left__list">
                <li class="products__product__desc-left__list__item">
                  <p class="products__product__desc-left__list__item__text">Powierzchnia</p>
                  <p class="products__product__desc-left__list__item__value">{{product.surface}}</p>
                </li>
                <li class="products__product__desc-left__list__item">
                  <p class="products__product__desc-left__list__item__text">Liczba pokoi</p>
                  <p class="products__product__desc-left__list__item__value">{{product.rooms}}</p>
                </li>
                <li class="products__product__desc-left__list__item">
                  <p class="products__product__desc-left__list__item__text">Rok wybudowania</p>
                  <p class="products__product__desc-left__list__item__value">{{product.year}}</p>
                </li>
              </ul>
            </div>
            <div class="products__product__desc-right">
              <ul
                class="products__product__desc-left__list products__product__desc-left__list--mobile"
              >
                <li class="products__product__desc-left__list__item">
                  <p class="products__product__desc-left__list__item__text">Powierzchnia</p>
                  <p class="products__product__desc-left__list__item__value">{{product.surface}}</p>
                </li>
                <li class="products__product__desc-left__list__item">
                  <p class="products__product__desc-left__list__item__text">Liczba pokoi</p>
                  <p class="products__product__desc-left__list__item__value">{{product.rooms}}</p>
                </li>
                <li class="products__product__desc-left__list__item">
                  <p class="products__product__desc-left__list__item__text">Rok wybudowania</p>
                  <p class="products__product__desc-left__list__item__value">{{product.year}}</p>
                </li>
              </ul>
              <div class="products__product__desc-right__price-container">
                <p class="products__product__desc-right__static">Cena:</p>
                <h3
                  class="products__product__desc-right__price"
                >{{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}} zł</h3>
              </div>
              <p
                class="products__product__desc-right__date"
              >Dodano: {{product.term.date}}, {{product.term.time}}</p>
            </div>
          </li>
        </ul>
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
      products: [],
      city: this.$store.state.filterCity,
      district: "",
      minPrice: "",
      maxPrice: "",
      minSurface: "",
      maxSurface: "",
      cityList: ["Gdańsk", "Gdynia", "Sopot"],
      gdansk: [
        "Wyspa Sobieszewska",
        "Krakowiec",
        "Rudniki",
        "Orunia",
        "Olszynka",
        "Stogi",
        "Chełm",
        "Wzgórze Mickiewicza",
        "Siedlce",
        "Młyniska",
        "Przeróbka",
        "Nowy Port",
        "Letnica",
        "Przymorze",
        "Zaspa",
        "VII Dwór",
        "Piecki-Migowo",
        "Brętowo",
        "Suchanino",
        "Aniołki",
        "Ujeścisko-Łostowice",
        "Brzeźno",
        "Jasień",
        "Strzyża",
        "Matarnia",
        "Kokoszki",
        "Morena",
        "Osowa",
        "Oliwa",
        "Wrzeszcz",
        "Żabianka"
      ],
      gdynia: [
        "Kamienna Góra",
        "Babie Doły",
        "Oksywie",
        "Obłuże",
        "Śródmieście",
        "Pogórze",
        "Cisowa",
        "Leszczynki",
        "Pustki Cisowskie-Demptowo",
        "Chwarzno-Wiczlino",
        "Grabówek",
        "Działki Leśne",
        "Wzg. Św. Maksymiliana",
        "Redłowo",
        "Witomino",
        "Orłowo",
        "Karwiny",
        "Wielki Kack",
        "Mały Kack",
        "Dąbrowa",
        "Chylonia"
      ],
      sopot: [
        "Brodwino",
        "Dolny Sopot",
        "Górny Sopot",
        "Kamienny Potok",
        "Karlikowo",
        "Świemirowo"
      ]
    };
  },
  created() {
    const vn = this;
    axios.get("http://localhost:5000/products").then(response => {
      for (let i = 0; i < response.data.length; i++) {
        let correct = true;
        if (
          vn.$store.state.filterMinPrice &&
          vn.$store.state.filterMinPrice > response.data[i].price
        ) {
          correct = false;
        }
        if (
          vn.$store.state.filterMaxPrice &&
          vn.$store.state.filterMaxPrice < response.data[i].price
        ) {
          correct = false;
        }
        if (
          vn.$store.state.filterMinSurface &&
          vn.$store.state.filterMinSurface > response.data[i].surface
        ) {
          correct = false;
        }
        if (
          vn.$store.state.filterMaxSurface &&
          vn.$store.state.filterMaxSurface < response.data[i].surface
        ) {
          correct = false;
        }
        if (
          vn.$store.state.filterCity &&
          vn.$store.state.filterCity !== response.data[i].city
        ) {
          correct = false;
        }
        if (
          vn.$store.state.filterDistrict &&
          vn.$store.state.filterDistrict !== response.data[i].district
        ) {
          correct = false;
        }
        if (correct === true) {
          vn.products.unshift(response.data[i]);
        }
        // console.log(correct);
        response.data[i];
      }
    });
  }
};
</script>

<style lang="scss">
@import "../styles/vars.scss";

.main {
  background-image: url("../assets/bg-sg2.jpg");
  background-size: cover;
  background-attachment: fixed;
  padding-bottom: 150px;
  min-height: 100vh;
}
.product__back-btn {
  display: inline-block;
  color: rgb(0, 0, 110);
  margin-bottom: 20px;
  font-weight: bold;
}
.product__none {
  text-align: center;
  color: white;
  margin-top: 50px;
}
.products__title {
  text-align: center;
  margin-top: 30px;
  text-transform: uppercase;
  color: white;
  letter-spacing: 1px;
}
.products__list {
  // width: 60vw;
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 50px;
  padding: 0 2%;
  ul {
    list-style: none;

    .products__product {
      display: flex;
      height: 220px;
      margin-bottom: 20px;
      border: 1px solid rgba(153, 153, 153, 0.658);
      border-radius: 5px;
      background-color: rgba(255, 255, 255, 0.9);
      transition: 0.2s;
      @include max-breakpoint(890px) {
        flex-direction: column;
        height: auto;
      }
      &:hover {
        background-color: rgba(241, 233, 233, 0.658);
        background-color: rgba(255, 255, 255, 1);
      }

      a {
        display: flex;
        width: 100%;
      }

      .products__product__desc-left {
        flex: 1;
        position: relative;
        margin: 15px 10px;
        .products__product__desc-left__title {
          margin-bottom: 5px;
          font-size: 22px;
          &:hover {
            color: #333;
          }
        }
        .products__product__desc-left__city {
          font-size: 14px;
          font-weight: bold;
          color: #777;
        }
      }
      .products__product__desc-right {
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
        .products__product__desc-right__price-container {
          @include max-breakpoint(890px) {
            display: flex;
            flex-direction: column;
            margin-bottom: 5px;
            // margin-left: 10px;
            width: 140px;
          }
          @include max-breakpoint(548px) {
            text-align: left;
            margin-left: 0;
            margin-top: 15px;
          }
        }
        .products__product__desc-right__static {
          margin-bottom: 5px;
          font-family: 10px;
        }
        .products__product__desc-right__price {
          font-size: 20px;
          font-weight: bold;
          color: green;
        }
        .products__product__desc-right__date {
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
      .products__product__img {
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
.products__product__desc-left__list {
  display: flex;
  position: absolute;
  bottom: 10px;
  left: 10px;
  @include max-breakpoint(890px) {
    display: none;
  }
}
.products__product__desc-left__list__item {
  text-align: center;
  padding: 0 10px;
  position: relative;
  border-left: 1px solid rgba(119, 119, 119, 0.582);

  &:nth-last-child(1) {
    border-right: 1px solid rgba(119, 119, 119, 0.582);
  }

  .products__product__desc-left__list__item__text {
    font-weight: normal;
    font-size: 13px;
    letter-spacing: 0.3px;
  }
  .products__product__desc-left__list__item__value {
    font-weight: bold;
    font-size: 15px;
  }
}
.products__product__desc-left__list--mobile {
  display: none;
  @include max-breakpoint(890px) {
    display: flex;
    position: static;
    height: max-content;
    margin-right: 20px;
  }
}
</style>