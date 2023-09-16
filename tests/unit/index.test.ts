import { mount } from "@vue/test-utils";
import { describe, expect, expectTypeOf, it } from "vitest";
import { Component, ref } from "vue";
import { countContext, useCountContext } from "./countCountext";

const ComponentWithValuePassedUsingProvider = <T>(value: T) => {
  const ChildComponent = {
    name: "childComponent",
    template: `<div>{{context.count}}</div>`,
    setup() {
      const context = useCountContext();

      return {
        context,
      };
    },
  } as Component;

  const ParentComponent = {
    components: {
      ChildComponent,
      CountContextProvider: countContext.Provider,
    },
    template: `
    <div>
      <CountContextProvider :value="value">
        <ChildComponent />
      </CountContextProvider>
    </div>`,
  } as Component;

  return mount(ParentComponent);
};

const ComponentWithNoValuePassed = () => {
  const ChildComponent = {
    name: "childComponent",
    template: `<div>{{context?.count}}</div>`,
    setup() {
      const context = useCountContext();

      return {
        context,
      };
    },
  } as Component;

  const ParentComponent = {
    components: {
      ChildComponent,
      CountContextProvider: countContext.Provider,
    },
    template: `
    <div>
      <CountContextProvider>
        <ChildComponent />
      </CountContextProvider>
    </div>`,
  } as Component;

  return mount(ParentComponent);
};

/**`
 * @vitest-environment happy-dom
 */
describe("give me a better name", () => {
  it("default Value is passed down", () => {
    const wrapper = ComponentWithValuePassedUsingProvider({
      count: ref(10),
    });

    expect(wrapper.text()).toContain("10");
    expectTypeOf();
  });

  it("useContext should return the default value if undefined is passed", () => {
    const wrapper = ComponentWithNoValuePassed();

    expect(wrapper.text()).toContain("100");
  });
});
