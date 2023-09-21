# vue-use-context

inspired by createContext and useContext hooks in react

## Install

```bash
pnpm add vue-context-hook
# or
npm install vue-context-hook
```

## Usage

Using vue-context-hook is quite straightforward, especially if you are familiar with React's useContext API. Here's a step-by-step guide on how to use it:

### 1. Create a Context

First, create a context by calling createContext and defining an initial context value. This function will return an object containing the Provider and useContext functions.

```ts
// count-context.ts
import { createContext } from "vue-context-hook";

const countContext = createContext({
  count: ref(0),
});

const { useContext } = countContext;

export { countContext, useContext as useCountContext };
```

### 2. Provide the Context

In your Vue component, you can provide the context using the Provider component and specifying the context value as a prop. If you don't provide a value, the initial value passed to createContext will be used.

```ts
<script setup lang="ts">
import { countContext } from "./count-context";
</script>
<template>
  <countContext.Provider
    :value="{
      count: ref(10),
    }"
  >
    <ChildComponent />
  </countContext.Provider>
</template>
```

### 3. Consume the Context

To consume the context in a child component, import the useContext function from your context file and call it within the `<script setup>` section.

```ts
<script setup lang="ts">
import { useCountContext } from "./countCountext";

const context = useCountContext();
</script>
<template>{{ context?.count }}</template>
```

In this example, `context?.count` should display the value `10`, as specified when providing the context.

## License

MIT
