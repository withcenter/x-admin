<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Home</router-link> |
        <span v-if="$app.notLoggedIn">
          <router-link to="/login">Login</router-link> |
          <router-link to="/register">Register</router-link> |
        </span>
        <span v-if="$app.loggedIn">
          <span v-if="$store.state.user.admin">
            <router-link to="/admin">Admin</router-link> |
          </span>
          <span @click="$app.logout()"> Logout </span>
        </span>
        <router-link to="/about">About</router-link>
      </nav>
    </header>
    <div>
      {{ $app.user.admin }}
      Welcome, {{ $store.state.user.nickname }},
      {{ $store.state.user.sessionId }}
    </div>

    <router-view />
  </div>
</template>
