import { type Component } from "vue";

export interface Context<T> {
  Provider: Component<
    Readonly<{
      value?: T;
    }>
  >;
  Consumer: Component | null;
  useContext: () => T;
}
