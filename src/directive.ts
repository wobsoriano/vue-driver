import { type DriveStep, driver } from 'driver.js'
import { inject, unref } from 'vue'
import type { DirectiveBinding, Plugin, Ref, VNode } from 'vue'

type MaybeRef<T> = T | Ref<T>

type DriverReturn = Omit<ReturnType<typeof driver>, 'highlight'> & {
  highlight: (step: RefDriveStep) => void
}

type RefDriveStep = Omit<DriveStep, 'element'> & {
  element?: MaybeRef<string | Element | null>
  index?: number
}

export const driverPlugin: Plugin = {
  install(app, driverOptions) {
    const driverSteps: DriveStep[] = []
    const driverObj = driver(driverOptions)

    app.directive('driver-step', {
      mounted(
        el: HTMLElement | SVGElement,
        binding: DirectiveBinding,
        node: VNode<
        any,
        HTMLElement | SVGElement,
        Record<string, any>
        >,
      ) {
        // Get instance key if possible (binding value or element key in case of v-for's)
        const key = binding.value || node.key
        const step: DriveStep = {
          element: el,
          ...key,
        }
        const indexFromModifier = Object.keys(binding.modifiers)[0]

        if (key.index || indexFromModifier)
          driverSteps[key.index || Number(indexFromModifier)] = step
        else
          driverSteps.push(step)
      },
    })

    function drive(stepIndex?: number) {
      driverObj.setSteps(driverSteps)
      driverObj.drive(stepIndex)
    }

    function highlight(step: RefDriveStep) {
      driverObj.highlight({
        ...step,
        element: unref(step.element) as string | Element,
      })
    }

    app.provide<DriverReturn>('driver', {
      ...driverObj,
      drive,
      highlight,
    })
  },
}

export function useDriver() {
  const driver = inject<DriverReturn>('driver')

  if (!driver)
    throw new Error('VueDriver not found. Did you forget to install the plugin?')

  return driver
}
