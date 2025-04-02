/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchBar from '@/components/Searchbar.vue';

describe('SearchBar.vue', () => {
    let wrapper;
    const mockFilter = vi.fn();

    beforeEach(() => {
        mockFilter.mockClear();

        wrapper = mount(SearchBar, {
            props: {
                filter: mockFilter
            },
            global: {
                stubs: {
                     Gaspump: true
                }
            },
            attachTo: document.body
        });
    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
         vi.restoreAllMocks();
    });

    it('Test: mount without errors?', () => {
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    });

    it('Test: does typing call the filter method', async () => {
        const input = wrapper.find('input[type="text"]');
        const testQuery = 'Alexanderplatz';

        await input.setValue(testQuery);

        expect(mockFilter).toHaveBeenCalledTimes(1);
        expect(mockFilter).toHaveBeenCalledWith(testQuery);

        const updatedQuery = 'Alexanderplatz Station';
        await input.setValue(updatedQuery);
        expect(mockFilter).toHaveBeenCalledTimes(2);
        expect(mockFilter).toHaveBeenCalledWith(updatedQuery); 
    });

    it('Test: click focuses input bar?', async () => {
        const searchBarDiv = wrapper.find('.search-bar');
        const inputElement = wrapper.find('input[type="text"]').element;

        expect(document.activeElement).not.toBe(inputElement);
        await searchBarDiv.trigger('click');
        expect(document.activeElement).toBe(inputElement);
    });

});