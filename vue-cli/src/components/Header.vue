<template>
  <div class="header">
    <div class="header-wrapper">
      <router-link class="logo" to="/">
        <img src="../assets/home.png" alt />
        <p>Web Home</p>
      </router-link>
      <div @click="activeMenu" class="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav class="header__nav header__nav--hamburger">
        <router-link to="/">
          <button class="header__nav-btn header__nav-btn--home">Strona główna</button>
        </router-link>
        <router-link v-if="!this.$store.state.isUserLoggedIn" to="/login">
          <button class="header__nav-btn header__nav-btn--login">Logowanie</button>
        </router-link>
        <router-link v-if="!this.$store.state.isUserLoggedIn" to="/register">
          <button class="header__nav-btn header__nav-btn--register">Rejestracja</button>
        </router-link>
        <router-link v-if="this.$store.state.isUserLoggedIn" to="/add">
          <button class="header__nav-btn header__nav-btn--add">+ Dodaj ogłoszenie</button>
        </router-link>
        <router-link v-if="this.$store.state.isUserLoggedIn" to="/panel">
          <button class="header__nav-btn header__nav-btn--profil">Profil</button>
        </router-link>
        <router-link v-if="this.$store.state.isUserLoggedIn" to="/">
          <button class="header__nav-btn header__nav-btn--logout" @click="logout">Wyloguj</button>
        </router-link>
      </nav>
      <nav class="header__nav">
        <router-link to="/">
          <button class="header__nav-btn header__nav-btn--home">Strona główna</button>
        </router-link>
        <router-link v-if="!this.$store.state.isUserLoggedIn" to="/login">
          <button class="header__nav-btn header__nav-btn--login">Logowanie</button>
        </router-link>
        <router-link v-if="!this.$store.state.isUserLoggedIn" to="/register">
          <button class="header__nav-btn header__nav-btn--register">Rejestracja</button>
        </router-link>
        <router-link v-if="this.$store.state.isUserLoggedIn" to="/add">
          <button class="header__nav-btn header__nav-btn--add">+ Dodaj ogłoszenie</button>
        </router-link>
        <router-link v-if="this.$store.state.isUserLoggedIn" to="/panel">
          <button class="header__nav-btn header__nav-btn--profil">Profil</button>
        </router-link>
        <router-link v-if="this.$store.state.isUserLoggedIn" to="/">
          <button class="header__nav-btn header__nav-btn--logout" @click="logout">Wyloguj</button>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.state.isUserLoggedIn = false;
      localStorage.clear();
      location.reload();
    },
    activeMenu() {
      document
        .querySelector(".header__nav--hamburger")
        .classList.toggle("active");
      document.querySelector(".hamburger").classList.toggle("active");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/vars.scss";

.header {
  position: relative;
  width: 100%;
  text-align: center;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2f4858;
  box-shadow: 0 2px 2px 0;
  @include max-breakpoint(850px) {
    height: 55px;
  }

  .header-wrapper {
    height: 100%;
    width: 100%;
    max-width: 1300px;
    position: relative;
  }

  .logo {
    display: flex;
    align-items: center;
    position: absolute;
    left: 40px;
    top: 3px;
    height: calc(100% - 3px);
    z-index: 10000000;

    @include max-breakpoint(850px) {
      left: 10px;
    }

    img {
      position: absolute;
      top: 3px;
      height: 150%;
      @include max-breakpoint(400px) {
        height: 120%;
      }
    }
    p {
      font-size: 20px;
      color: #009400;
      margin-left: 125px;
      font-family: "Bai Jamjuree", sans-serif;
      font-weight: 700;
      font-style: italic;
      @include max-breakpoint(850px) {
        margin-left: 95px;
      }
      @include max-breakpoint(400px) {
        margin-left: 80px;
      }
      @include max-breakpoint(370px) {
        display: none;
      }
    }
  }

  .hamburger {
    display: none;
    flex-direction: column;
    position: absolute;
    width: 32px;
    height: 50%;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    @include max-breakpoint(850px) {
      display: flex;
    }
    span {
      height: 5px;
      width: 100%;
      position: absolute;
      background-color: white;
      border-radius: 3px;
      transform: translateY(-50%);
      cursor: pointer;
      transition: 0.3s;
    }
    span:nth-child(1) {
      top: calc(50% - 10px);
    }
    span:nth-child(2) {
      top: 50%;
    }
    span:nth-child(3) {
      top: calc(50% + 10px);
    }
    &.active {
      span:nth-child(1) {
        transform: translateY(150%) rotate(45deg);
      }
      span:nth-child(2) {
        display: none;
      }
      span:nth-child(3) {
        transform: translateY(-250%) rotate(-45deg);
      }
    }
  }

  .header__nav {
    position: absolute;
    right: 20px;
    font-family: "Fjalla One", sans-serif;
    height: 100%;
    @include max-breakpoint(850px) {
      display: none;
    }
    &.header__nav--hamburger {
      display: none;
      flex-direction: column;
      background: linear-gradient(
        90deg,
        rgba(0, 148, 0, 1) 0%,
        rgba(0, 137, 71, 1) 47%,
        rgba(0, 123, 104, 1) 100%
      );
      position: absolute;
      top: 55px;
      right: -230px;
      width: 230px;
      z-index: 10000000;
      transition: 0.5s;
      border-left: 2px solid #2f4858;
      border-bottom: 2px solid #2f4858;
      height: auto;
      @include max-breakpoint(850px) {
        display: flex;
      }
      a {
        margin: 0;
        padding: 20px;
        border-bottom: 1px solid black;
        line-height: normal;
        &:hover {
          .header__nav-btn {
            transform: translateY(-7px);
            color: black;
          }
        }

        &:nth-last-child(1) {
          border-bottom: none;
        }
      }
      &.active {
        right: 0;
      }
    }
    a {
      margin: 20px;
      line-height: 70px;
    }
    .header__nav-btn {
      background-color: transparent;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      outline: none;
      transition: 0.3s;
      font-family: "Fjalla One", sans-serif;
      letter-spacing: 1px;
      text-transform: uppercase;

      &:hover {
        color: #009400;
        transform: translateY(-7px);
      }
    }
  }
}
</style>