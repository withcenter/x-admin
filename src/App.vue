<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Login</router-link> |

        <span v-if="$store.state.user.loggedIn">
          <span v-if="$store.state.user.admin">
            <router-link to="/admin">Admin</router-link> |
          </span>
        </span>
        <router-link to="/about">About</router-link>
      </nav>
    </header>
    <div>
      Welcome, {{ $store.state.user.nickname }},
      {{ $store.state.user.sessionId }}
    </div>

    <router-view />
  </div>
</template>
