import { type Config, type DriveStep, driver } from 'driver.js'
import { inject, unref } from 'vue'
import type { DirectiveBinding, MaybeRefOrGetter, Plugin, VNode } from 'vue'

type DriverReturn = Omit<ReturnType<typeof driver>, 'highlight'> & {
  highlight: (step: RefDriveStep) => void
}

type RefDriveStep = Omit<DriveStep, 'element'> & {
  element?: MaybeRefOrGetter<string | Element | null>
  index?: number
}

type VueDriverOptions = Config & {
  mergeSteps?: boolean
}

export const driverPlugin: Plugin = {
  install(app, driverOptions: VueDriverOptions) {
    const driverSteps: DriveStep[] = []

    const { mergeSteps, ...config } = driverOptions
    const driverObj = driver(config)

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
      driverObj.setSteps([
        ...(mergeSteps ? (driverOptions.steps ?? []) : []),
        ...driverSteps,
      ])
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
