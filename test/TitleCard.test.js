/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import TitleCard from '@/components/TitleCard.vue';

describe('TitleCard.vue', () => {
  it('render correct prop adresse', () => {
    const testAddress = 'Grove Street 123';
    const wrapper = mount(TitleCard, {
      props: { adresse: testAddress }
    });
    expect(wrapper.text()).toContain(testAddress);
  });
});