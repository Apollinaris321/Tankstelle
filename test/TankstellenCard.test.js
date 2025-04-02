/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import TankstellenCard from '@/components/TankstellenCard.vue';
import MapComponent from '@/components/MapComponent.vue';

describe('TankstellenCard.vue Interactions', () => {
    let wrapper;
    const testProps = {
        x: 13.4050,
        y: 52.5200,
        adresse: 'Test Address 123',
        id: 555
    };

    let openSpy;
    const mockClipboard = {
        writeText: vi.fn().mockResolvedValue(undefined),
    };
    const originalClipboard = navigator.clipboard;
    const originalWindowOpen = window.open;

    beforeEach(() => {
        openSpy = vi.spyOn(window, 'open').mockImplementation(() => {});

        Object.defineProperty(navigator, 'clipboard', {
            value: mockClipboard,
            writable: true,
            configurable: true,
        });

        wrapper = mount(TankstellenCard, {
            props: testProps,
            global: {
              stubs: {
                 MapComponent: true,
                 TitleCard: true,
              }
            }
        });
         vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();

         Object.defineProperty(navigator, 'clipboard', {
            value: originalClipboard,
            writable: true,
            configurable: true,
        });
        window.open = originalWindowOpen;

        if (wrapper) {
            wrapper.unmount();
        }
    });

    it('open Google Maps when "Öffnen in Google Maps" is clicked', async () => {
        const mapsButton = wrapper.find('[data-testid="maps-button"]');
        expect(mapsButton.exists()).toBe(true);

        await mapsButton.trigger('click');

        expect(openSpy).toHaveBeenCalledTimes(1);
        const expectedUrl = `https://www.google.com/maps?q=${testProps.y},${testProps.x}`;
        expect(openSpy).toHaveBeenCalledWith(expectedUrl, '_blank');
    });

    it('call copyToClipboard when "Link öffnen" is clicked', async () => {
        const copyButton = wrapper.find('[data-testid="copy-button"]');
        expect(copyButton.exists()).toBe(true);

        await copyButton.trigger('click');

        expect(mockClipboard.writeText).toHaveBeenCalledTimes(1);
        const expectedUrl = `${window.location.href}?id=${testProps.id}`;
        expect(mockClipboard.writeText).toHaveBeenCalledWith(expectedUrl);
    });

    it('dont emit "open" when "Öffnen in Google Maps" button is clicked', async () => {
        const mapsButton = wrapper.find('[data-testid="maps-button"]');
        await mapsButton.trigger('click');

        expect(wrapper.emitted('open')).toBeFalsy();
    });

    it('dont emit "open" event when the "Link kopieren" button is clicked', async () => {
        const copyButton = wrapper.find('[data-testid="copy-button"]');
        await copyButton.trigger('click');

        expect(wrapper.emitted('open')).toBeFalsy();
    });

    it('emit "open" event with id when card is clicked', async () => {
        const cardContainer = wrapper.find('[data-testid="card-container"]');
        await cardContainer.trigger('click');

        expect(wrapper.emitted('open')).toBeTruthy();
        expect(wrapper.emitted('open')).toHaveLength(1);
        expect(wrapper.emitted('open')[0]).toEqual([testProps.id]);
    });

    
    it('Test: should mount successfully when valid props are provided', () => {
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('[data-testid="card-container"]').exists()).toBe(true);
    });

    it('Test: should pass x and y props down to MapComponent', () => {
        const mapStub = wrapper.findComponent(MapComponent); 
        expect(mapStub.exists()).toBe(true);

        expect(mapStub.props('x')).toBe(testProps.x);
        expect(mapStub.props('y')).toBe(testProps.y);
    });

    it('Test: should emit "open" event with id when the card container is clicked', async () => {
        const cardContainer = wrapper.find('[data-testid="card-container"]');
        expect(cardContainer.exists()).toBe(true);

        await cardContainer.trigger('click');

        expect(wrapper.emitted('open')).toBeTruthy();
        expect(wrapper.emitted('open')).toHaveLength(1);
        expect(wrapper.emitted('open')[0]).toEqual([testProps.id]);
    });

     it('Test: should call window.open with correct Google Maps URL when maps button is clicked', async () => {
        const mapsButton = wrapper.find('[data-testid="maps-button"]');
        expect(mapsButton.exists()).toBe(true);

        await mapsButton.trigger('click');

        const expectedUrl = `https://www.google.com/maps?q=${testProps.y},${testProps.x}`;

        expect(openSpy).toHaveBeenCalledTimes(1);
        expect(openSpy).toHaveBeenCalledWith(expectedUrl, '_blank');
    });
});