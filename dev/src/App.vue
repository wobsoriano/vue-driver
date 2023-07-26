<script setup lang="ts">
import { useDriver } from '../../src'

const driver = useDriver()

function startTour() {
  driver.drive()
}
</script>

<template>
  <header v-driver-step.0="{ popover: { title: 'Header', description: 'This is the page header' } }" class="header">
    <h1>Welcome to My Website</h1>
  </header>

  <nav v-driver-step.3="{ popover: { title: 'Nav', description: 'This is the page nav' } }">
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Services</a>
    <a href="#">Contact</a>
  </nav>

  <main v-driver-step.2="{ popover: { title: 'Main', description: 'This is the page main content container' } }">
    <h2>Main Content</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vehicula, justo eu ultricies iaculis, nisl odio
      pharetra arcu, eget posuere arcu justo ac nunc.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vehicula, justo eu ultricies iaculis, nisl odio
      pharetra arcu, eget posuere arcu justo ac nunc.
    </p>
    <button @click="startTour">
      Start tour
    </button>
  </main>

  <footer v-driver-step.1="{ popover: { title: 'Footer', description: 'This is the page footer' } }" class="footer">
    <p>&copy; 2023 My Website. All rights reserved.</p>
  </footer>
</template>

<style>
/* Header styles */
.header {
  background-color: #333;
  color: #fff;
  padding: 10px;
  text-align: center;
}

/* Navigation styles */
nav {
  background-color: #444;
  padding: 10px;
  text-align: center;
}

nav a {
  color: #fff;
  text-decoration: none;
  margin: 5px;
  padding: 8px 12px;
  border-radius: 5px;
  transition: background-color 0.2s;
}

nav a:hover {
  background-color: #666;
}

/* Main content styles */
main {
  flex: 1;
  padding: 20px;
}

/* Footer styles */
.footer {
  background-color: #333;
  color: #fff;
  padding: 10px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
