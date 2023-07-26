# vue3-driver

Drive the user's focus across the page with Vue and [Driver.js](https://driverjs.com).

## Install

```bash
npm install vue3-driver
```

## Usage

Install the plugin

```js
import { VueDriver } from 'vue3-driver'
import 'driver.js/dist/driver.css'

const app = createApp(App)
app.use(VueDriver)
```

Use directive to add steps, and composable to start driving

```vue
<script setup>
import { useDriver } from 'vue3-driver'

const driver = useDriver()

onMount(() => {
  driver.drive()
})
</script>

<template>
  <header v-driver-step={ popover: { title: 'Header', description: 'This is the page header' } }>
    <h1>Welcome to My Website</h1>
  </header>

  <main v-driver-step={ popover: { title: 'Main', description: 'This is the page main content' } }>
    Some content...
  </main>

  <footer v-driver-step={ popover: { title: 'Footer', description: 'This is the page footer' } }>
    2023 My Website. All rights reserved.
  </footer>
</template>
```

## License

MIT
