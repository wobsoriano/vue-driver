# vue-driver

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
app.use(VueDriver, {
  // Driver.js options
  // https://driverjs.com/docs/configuration
})
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
  <header v-driver-step="{ popover: { title: 'Header', description: 'Description' } }">
    <h1>Welcome to My Website</h1>
  </header>

  <main v-driver-step="{ popover: { title: 'Main', description: 'Description' } }">
    Some content...
  </main>

  <footer v-driver-step="{ popover: { title: 'Footer', description: 'Description' } }">
    2023 My Website. All rights reserved.
  </footer>
</template>
```

### Indexing

By default, the steps run from top to bottom depending on the directive placements. If you want to customize the arrangement, you can add an `index` property to the directive value, or via modifiers:

```vue
<template>
  <header v-driver-step="{ index: 0, popover: {} }" />
  <main v-driver-step.2="{ popover: {} }" />
  <footer v-driver-step.1="{ popover: {} }" />
</template>
```

### Highlight

You can pass a `ref` when you want to highlight an element as well:

```ts
import { onMount, ref } from 'vue'
import { useDriver } from 'vue3-driver'

const driver = useDriver()
const element = ref<HTMLElement | null>(null)

onMount(() => {
  driver.highlight({
    element,
    popover: {}
  })
})
```

## License

MIT
