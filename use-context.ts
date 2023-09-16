import {
  defineComponent,
  h,
  inject,
  provide,
  type InjectionKey,
  UnwrapRef,
} from "vue";
import { Context } from "./types";

function createContext<T>(defaultValue: T) {
  const symbol = Symbol() as InjectionKey<T>;

  const Provider = defineComponent({
    props: ["value"],
    setup(props, { slots }) {
      const passedValue =
        props.value === undefined ? defaultValue : props.value;
      provide(symbol, passedValue);

      return () =>
        h(
          "div",
          null,
          // @ts-expect-error
          slots.default()
        );
    },
  });

  return {
    Provider,
    Consumer: null,
    useContext: () => inject(symbol, defaultValue),
  } as Context<T>;
}

export { createContext };
