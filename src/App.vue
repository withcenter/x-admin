<template>
  <div id="app">
    <header>
      <b-navbar type="dark" variant="info">
        <b-navbar-nav>
          <b-nav-item to="/">Home </b-nav-item>
          <b-nav-item v-if="$app.notLoggedIn" to="/login">Login</b-nav-item>
          <b-nav-item v-if="$app.notLoggedIn" to="/register">
            Register
          </b-nav-item>
          <b-nav-item
            v-if="$app.loggedIn && $store.state.user.admin"
            to="/admin"
          >
            Admin
          </b-nav-item>

          <!-- Navbar dropdowns -->
          <b-nav-item-dropdown
            v-if="$app.loggedIn && $store.state.user.admin"
            text="Admin"
            right
          >
            <b-dropdown-item to="/admin/user">user</b-dropdown-item>
            <b-dropdown-item to="/admin/category">category</b-dropdown-item>
            <b-dropdown-item to="/admin/post">post</b-dropdown-item>
            <b-dropdown-item to="/admin/file">file</b-dropdown-item>
            <b-dropdown-item to="/admin/messaging">messaging</b-dropdown-item>
            <b-dropdown-item to="/admin/setting">setting</b-dropdown-item>
            <b-dropdown-item to="/admin/advertisement"
              >advertisement
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item to="/about">About</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="$app.loggedIn" text="User" right>
            <b-dropdown-item to="/profile">Profile</b-dropdown-item>
            <b-dropdown-item to="/" @click="$app.logout()"
              >Logout
            </b-dropdown-item>
          </b-nav-item-dropdown>
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
