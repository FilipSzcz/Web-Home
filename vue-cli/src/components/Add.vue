<template>
  <div v-if="this.$store.state.isUserLoggedIn" class="add">
    <app-header></app-header>
    <div class="add-box">
      <h1>Dodaj ogłoszenie</h1>
      <div class="add-box__input-box">
        <div class="add-box__input-box-wrapper">
          <input
            class="add-box__input"
            v-model="name"
            type="name"
            name="name"
            placeholder="Nazwa ogłoszenia"
            autocomplete="off"
          />
          <input class="add-box__input" v-model="city" list="city" placeholder="Miasto" />
          <datalist id="city">
            <option v-for="(city,index) in this.cityList" :key="index" :value="city"></option>
          </datalist>
          <input class="add-box__input" v-model="district" list="district" placeholder="Dzielnica" />
          <datalist v-if="city==='Gdańsk'" id="district">
            <option v-for="(d,i) in this.gdansk " :value="d" :key="i"></option>
          </datalist>
          <datalist v-else-if="city==='Sopot'" id="district">
            <option v-for="(d,i) in this.sopot " :value="d" :key="i"></option>
          </datalist>
          <datalist v-else-if="city==='Gdynia'" id="district">
            <option v-for="(d,i) in this.gdynia " :value="d" :key="i"></option>
          </datalist>
          <datalist v-else id="district">
            <option value=" "></option>
          </datalist>
          <input
            class="add-box__input"
            v-model="surface"
            type="number"
            min="1"
            step="any"
            name="surface"
            placeholder="Powierzchnia"
          />
          <input
            class="add-box__input"
            v-model="rooms"
            type="number"
            min="1"
            step="any"
            name="rooms"
            placeholder="Liczba pokoi"
          />
          <input
            class="add-box__input"
            v-model="year"
            type="number"
            min="1"
            step="any"
            name="year"
            placeholder="Rok budowy"
          />
          <input
            class="add-box__input"
            v-model="price"
            type="number"
            min="1"
            step="any"
            name="price"
            placeholder="Cena"
          />
          <input
            class="add-box__input"
            v-model="phone"
            type="number"
            min="100000000"
            step="any"
            name="phone"
            placeholder="Numer telefonu"
          />
          <editor
            v-model="desc"
            placeholder="Opis"
            api-key="no-api-key"
            :init="{
         height: 270,
         width: '100%',
         menubar: false,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
       }"
          />
          <input class="add-box__input add-box__input--file" type="file" @change="onFileSelected" />
          <input class="add-box__input add-box__input--file" type="file" @change="onFileSelected" />
          <input class="add-box__input add-box__input--file" type="file" @change="onFileSelected" />
          <input class="add-box__input add-box__input--file" type="file" @change="onFileSelected" />
          <input class="add-box__input add-box__input--file" type="file" @change="onFileSelected" />
        </div>
      </div>
      <button class="add-box__btn" @click="addProduct">Add</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./Header.vue";
import Editor from "@tinymce/tinymce-vue";
export default {
  components: {
    editor: Editor,
    "app-header": Header
  },
  data: function() {
    return {
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
        "Wrzeszcz"
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
      ],
      name: "",
      city: "",
      district: "",
      surface: "",
      rooms: "",
      year: "",
      price: "",
      desc: "",
      phone: "",
      selectedFile: null,
      file: ""
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      let formData = new FormData();
      formData.append("file", this.selectedFile, this.selectedFile.name);
      axios
        .post("http://localhost:5000/products/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          vn.file = res.data;
        });
    },
    addProduct() {
      const vn = this;
      if (
        this.name &&
        this.district &&
        this.price &&
        this.city &&
        this.surface &&
        this.rooms &&
        this.year &&
        this.desc &&
        this.phone
      ) {
        axios.post("http://localhost:5000/products", {
          name: this.name,
          city: this.city,
          district: this.district,
          surface: this.surface,
          rooms: this.rooms,
          year: this.year,
          price: this.price,
          desc: this.desc,
          phone: this.phone,
          author: this.$store.state.userData,
          file: "http://localhost:5000/upload/" + this.file
        });
        this.name = "";
        this.city = "";
        this.district = "";
        this.rooms = "";
        this.year = "";
        this.surface = "";
        this.price = "";
        this.phone = "";
        this.desc = "";
        this.selectedFile = "";
        window.location.href = "http://localhost:8080/#/panel";
        alert("Dodano produkt");
      } else {
        alert("Uzupełnij pola");
      }
    }
  },
  mounted() {
    this.gdansk = this.gdansk.sort();
    this.gdynia = this.gdynia.sort();
    this.sopot = this.sopot.sort();
  }
};
</script>

<style lang="scss">
@import "../styles/vars.scss";
.add-box {
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 80px;
  width: 80%;
  padding-top: 10px;
  text-align: center;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.85);
  z-index: 2;
  .add-box__input-box-wrapper {
    width: 50%;
    margin: 0 auto;
  }
  h1 {
    margin: 30px 50px;
  }
  .add-box__input {
    margin: 10px 0;
    border-radius: 5px;
    width: 100%;
    border: 1px solid #999;
    padding: 7px 7px;
    outline: none;
    @include max-breakpoint($point1) {
      width: 80%;
    }
  }
  .add-box__input--file {
    border: none;
  }
  .add-box__input--desc {
    resize: none;
    height: 100px;
  }
  .add-box__btn {
    margin-top: 20px;
    margin-bottom: 30px;
    padding: 10px 30px;
    background: rgb(176, 251, 255);
    background: linear-gradient(
      0deg,
      rgba(176, 251, 255, 1) 0%,
      rgba(3, 146, 241, 1) 0%,
      rgba(0, 212, 255, 1) 100%
    );
    border: none;
    border-radius: 3px;
    cursor: pointer;
    color: white;
    outline: none;
    &:hover {
      background: linear-gradient(
        0deg,
        rgba(176, 251, 255, 1) 0%,
        rgba(3, 146, 241, 0.6727065826330532) 0%,
        rgba(0, 212, 255, 1) 100%
      );
    }
  }
}
.tox-tinymce {
  width: 50%;
  margin: 0 auto;
  margin-top: 10px;
  border: 1px solid #999 !important;
  border-radius: 5px !important;
  @include max-breakpoint($point1) {
    width: 80%;
  }
}
.tox .tox-statusbar {
  display: none !important;
}
.tox-notification {
  display: none !important;
}
</style>