import AppHeader from '@/components/AppHeader.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

/**
 * Define a route.
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: {
      template: AppHeader
    }
  }
]

/**
 * Create a router instance.
 *
 * @see https://router.vuejs.org/api/#createrouter
 */
const router = createRouter({
  history: createWebHistory(),
  routes
})

/**
 * Define a test suite.
 *
 * @see https://vitest.dev/api/#describe
 */
describe('AppHeader', () => {
  /**
   * Mount the component.
   *
   * @see https://vue-test-utils.vuejs.org/api/#mount
   */
  const wrapper = mount(AppHeader, {
    global: {
      plugins: [router]
    }
  })

  /**
   * Assert the component renders.
   *
   * @see https://vitest.dev/api/expect.html
   */
  it('renders component', () => {
    expect(wrapper).toBeTruthy()
  })

  /**
   * Assert the component renders the title.
   */
  it('renders title', () => {
    expect(wrapper.text()).toContain('Spelling Scramble')
  })

  /**
   * Assert the component contains a link to the home page.
   */
  it('contains a link to the home page', async () => {
    await router.isReady()
    const link = wrapper.findComponent({ name: 'RouterLink' })
    expect(link.exists()).toBe(true)
    expect(link.props().to).toBe('/')
    expect(wrapper.find('a').attributes('href')).toBe('/')
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
