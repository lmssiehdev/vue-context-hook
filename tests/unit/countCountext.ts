import { UnwrapRef, reactive, ref } from "vue";
import { createContext } from "../../use-context";

const countContext = createContext({
  count: ref(100),
});

const { useContext } = countContext;

export { countContext, useContext as useCountContext };
