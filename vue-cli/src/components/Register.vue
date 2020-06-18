<template>
  <div>
    <app-header></app-header>
    <div class="register">
      <div class="register-box">
        <h1 class="register-box__title">Rejestracja</h1>
        <input
          class="register-box__input register-box__input--name"
          v-model="name"
          type="name"
          name="name"
          placeholder="Imię"
          autocomplete="off"
        />
        <br />
        <input
          class="register-box__input register-box__input--surname"
          v-model="surname"
          type="surname"
          name="surname"
          placeholder="Nazwisko"
          autocomplete="off"
        />
        <br />
        <input
          class="register-box__input register-box__input--email"
          v-model="email"
          type="email"
          name="email"
          placeholder="Email"
          autocomplete="off"
        />
        <br />
        <input
          class="register-box__input register-box__input--password"
          v-model="password"
          type="password"
          name="password"
          placeholder="Hasło"
        />
        <br />
        <input
          class="register-box__input register-box__input--confirm"
          v-model="confirm"
          type="password"
          name="confirm"
          placeholder="Potwierdź hasło"
        />
        <br />
        <button class="register-box__btn" @click="handleReg">Zarejestruj</button>
        <p
          class="register-box__rules"
        >Rejestracja oznacza akceptację Regulaminu serwisu Portal w aktualnym brzmieniu. Jeśli nie akceptujesz warunków zmienionego Regulaminu serwisu Portal, wyślij oświadczenie o rozwiązaniu Umowy w trybie przewidzianym w Regulaminie.</p>
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
      email: "",
      password: "",
      name: "",
      surname: "",
      confirm: "",
      message: "",
      isCorrect: false
    };
  },
  methods: {
    handleReg() {
      this.isCorrect = true;
      if (this.password !== this.confirm) {
        this.message = "Hasła nie są takie same";
        this.isCorrect = false;
      }
      if (this.password.length < 8) {
        this.message = "Za krótkie hasło! Powinno mieć minimum 8 znaków";
        this.isCorrect = false;
      }
      if (!this.email.includes("@")) {
        this.message = "Podano błędny adres email";
        this.isCorrect = false;
      }
      if (
        !this.email ||
        !this.password ||
        !this.name ||
        !this.surname ||
        !this.confirm
      ) {
        this.message = "Uzupełnij wszystkie pola";
        this.isCorrect = false;
      }
      if (this.isCorrect) {
        axios
          .post("http://localhost:5000/users", {
            email: this.email,
            password: this.password,
            name: this.name,
            surname: this.surname
          })
          .then(response => {
            if (response.data) {
              alert("Zarejestrowano użytkownika");
              location.reload();
            } else if (response.data === false) {
              alert("Już istnieje taki email!");
            }
          });
      } else {
        alert(this.message);
      }
    }
  },
  mounted() {
    let box = document.querySelector(".register-box");
    let register = document.querySelector(".register");
    let headerHeight = document.querySelector(".header").offsetHeight;
    function checkHeight() {
      if (
        box.offsetHeight + box.offsetTop + headerHeight >
        window.innerHeight
      ) {
        let diff =
          box.offsetHeight + box.offsetTop + headerHeight - window.innerHeight;
        diff = diff + 100;
        register.style.height = `calc(100vh + ${diff}px)`;
      }
    }
    checkHeight();

    window.onresize = checkHeight;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/vars.scss";

.register {
  width: 100%;
  height: calc(100vh - 70px);
  position: relative;
  @include max-breakpoint(850px) {
    height: calc(100vh - 55px);
  }
  &::before {
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.85);
    z-index: -1;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    z-index: 0;
    background: url("../assets/bgc2.jpg");
    background-size: cover;
  }

  .register-box {
    position: absolute;
    left: 50%;
    top: 15%;
    text-align: center;
    transform: translateX(-50%);
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.85);
    z-index: 2;

    @include max-breakpoint($point1) {
      width: 80%;
    }

    .register-box__title {
      margin-bottom: 20px;
      margin-top: 40px;
    }
    .register-box__input {
      margin: 10px 0;
      border-radius: 5px;
      width: 50%;
      border: 1px solid #999;
      padding: 7px 7px;
      outline: none;
      @include max-breakpoint($point1) {
        width: 80%;
      }
    }
    .register-box__btn {
      margin-top: 20px;
      padding: 10px 30px;
      background: rgb(176, 251, 255);
      background: linear-gradient(
        0deg,
        rgba(176, 251, 255, 1) 0%,
        rgba(3, 241, 22, 1) 0%,
        rgba(105, 213, 117, 1) 100%
      );
      background: rgb(176, 251, 255);
      background: linear-gradient(
        0deg,
        rgba(176, 251, 255, 1) 0%,
        rgba(3, 241, 22, 1) 0%,
        rgba(96, 185, 106, 1) 100%
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
          rgba(3, 241, 22, 0.7727065826330532) 0%,
          rgba(105, 213, 117, 1) 100%
        );
        background: rgb(176, 251, 255);
        background: linear-gradient(
          0deg,
          rgba(176, 251, 255, 1) 0%,
          rgba(3, 241, 22, 0.7727065826330532) 0%,
          rgba(96, 185, 106, 1) 100%
        );
      }
    }
    .register-box__rules {
      color: #888;
      font-size: 10px;
      width: 70%;
      margin: 0 auto;
      margin-top: 30px;
      margin-bottom: 40px;
    }
  }
}
</style>
