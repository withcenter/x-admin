<template>
  <div id="app">
    <header>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/">Home</router-link>
          </b-nav-item>
          <b-nav-item v-if="$app.notLoggedIn">
            <router-link to="/login">Login</router-link>
          </b-nav-item>
          <b-nav-item v-if="$app.notLoggedIn">
            <router-link to="/register">Register</router-link>
          </b-nav-item>

          <!-- Navbar dropdowns -->
          <b-nav-item-dropdown
            v-if="$app.loggedIn && $store.state.user.admin"
            text="Admin"
            right
          >
            <b-dropdown-item>
              <router-link to="/admin/user">user</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link to="/admin/category">category</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link to="/admin/post">post</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link to="/admin/file">file</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link to="/admin/messaging">messaging</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link to="/admin/setting">setting</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link to="/admin/advertisement">advertisement</router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown v-if="$app.loggedIn" text="User" right>
            <b-dropdown-item>Profile</b-dropdown-item>
            <b-dropdown-item>
              <span @click="$app.logout()">Logout</span>
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item>
            <router-link to="/about">About</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </header>
    <div>
      {{ $app.user.admin }}
      Welcome, {{ $store.state.user.nickname }},
      {{ $store.state.user.sessionId }}
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>
