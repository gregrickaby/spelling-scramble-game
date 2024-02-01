import AppFooter from '@/components/AppFooter.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

/**
 * Define a test suite.
 *
 * @see https://vitest.dev/api/#describe
 */
describe('AppFooter', () => {
  /**
   * Mount the component.
   *
   * @see https://vue-test-utils.vuejs.org/api/#mount
   */
  const wrapper = mount(AppFooter)

  /**
   * Assert the component renders.
   *
   * @see https://vitest.dev/api/expect.html
   */
  it('renders component', () => {
    expect(wrapper).toBeTruthy()
  })

  /**
   * Assert the component matches the snapshot.
   *
   * @see https://vitest.dev/api/expect.html#tomatchsnapshot
   */
  it('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
