<template>
  <div>
    <app-header></app-header>
    <div class="login">
      <div class="login-box">
        <h1 class="login-box__title">Logowanie</h1>
        <input
          class="login-box__input login-box__input--email"
          v-model="email"
          type="email"
          name="email"
          placeholder="Email"
          autocomplete="off"
        />
        <br />
        <input
          class="login-box__input login-box__input--password"
          v-model="password"
          type="password"
          name="password"
          placeholder="Hasło"
        />
        <br />
        <button class="login-box__btn" @click="handleLog">Zaloguj</button>
        <p
          class="login-box__rules"
        >Zalogowanie oznacza akceptację Regulaminu serwisu Portal w aktualnym brzmieniu. Jeśli nie akceptujesz warunków zmienionego Regulaminu serwisu Portal, wyślij oświadczenie o rozwiązaniu Umowy w trybie przewidzianym w Regulaminie.</p>
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
      answer: ""
    };
  },
  methods: {
    handleLog() {
      const vn = this;
      axios
        .post("http://localhost:5000/login", {
          email: vn.email,
          password: vn.password
        })
        .then(response => {
          if (response.data) {
            window.location.href = "http://localhost:8080/#/panel";
            vn.$store.state.userData = response.data;
            vn.$store.state.userId = response.data._id;
            vn.$store.state.userName = response.data.name;
            vn.$store.state.isUserLoggedIn = true;
            localStorage.setItem("isUserLoggedIn", "true");
            localStorage.setItem("userId", response.data._id);
            localStorage.setItem("userName", response.data.name);
          } else if (!response.data) {
            alert("Błędne hasło lub email");
          }
        });
    }
  },
  mounted() {
    axios.get("http://localhost:5000/login");

    let box = document.querySelector(".login-box");
    let login = document.querySelector(".login");
    let headerHeight = document.querySelector(".header").offsetHeight;
    function checkHeight() {
      if (
        box.offsetHeight + box.offsetTop + headerHeight >
        window.innerHeight
      ) {
        let diff =
          box.offsetHeight + box.offsetTop + headerHeight - window.innerHeight;
        diff = diff + 100;
        login.style.height = `calc(100vh + ${diff}px)`;
      }
    }
    checkHeight();

    window.onresize = checkHeight;
  }
};
</script>

<style scoped lang="scss">
@import "../styles/vars.scss";

.login {
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

  .login-box {
    position: absolute;
    left: 50%;
    top: 20%;
    text-align: center;
    transform: translateX(-50%);
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.85);
    z-index: 2;

    @include max-breakpoint($point1) {
      width: 80%;
    }

    .login-box__title {
      margin-bottom: 20px;
      margin-top: 40px;
    }
    .login-box__input {
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
    .login-box__btn {
      margin-top: 20px;
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
    .login-box__rules {
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