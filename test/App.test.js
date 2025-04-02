/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { nextTick } from 'vue';
import { mount, flushPromises } from '@vue/test-utils';
import App from '@/App.vue'; // Adjust path
import TankstellenCard from '@/components/TankstellenCard.vue'; // Adjust path
import TankstellenModal from '@/components/TankstellenModal.vue'; // Adjust path

const mockRouterPush = vi.fn();
vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: mockRouterPush,
    }),
}));

const mockFeatures = [
    { attributes : {objectid: 98, adresse: 'Bonner Str. 98 (50677 Neustadt/Süd)'}, geometry : {x: 6.960644911005172, y: 50.916095041454554} }, // Index 0
    { attributes: {objectid: 99, adresse: 'Hülchrather Str. 17 (50670 Neustadt/Nord)'}, geometry: {x: 6.961069175632063, y: 50.954466539174284} }, // Index 1
    { attributes : {objectid: 100, adresse: 'Siegburger Str. 116 (50679 Deutz)'}, geometry : {x: 6.979491940887355, y: 50.923288946783785} }, // Index 2
];
const mockJsonResponse = { features: mockFeatures };

const mockUnsortedFeatures = [
    // Hülchrather
    mockFeatures[1], 
    // Siegburger
    mockFeatures[2], 
    // Bonner
    mockFeatures[0], 
];
const mockUnsortedJsonResponse = { features: mockUnsortedFeatures };

const createMockResponse = (body, ok = true) => ({
    ok,
    json: () => Promise.resolve(structuredClone(body)), 
});

describe('App.vue', () => {
    let wrapper;
    const originalLocation = window.location;
    let fetchSpy; 

    const mountComponent = (options = {}) => {
        let modalRoot = document.getElementById('modal');
        if (!modalRoot) {
            modalRoot = document.createElement('div');
            modalRoot.id = 'modal';
            document.body.appendChild(modalRoot);
        }

        wrapper = mount(App, {
            shallow: false, 
            global: {
                ...options.global,
            },
            attachTo: document.body,
            ...options,
        });
    };

    beforeEach(() => {
        vi.clearAllMocks();

        fetchSpy = vi.spyOn(window, 'fetch');
        fetchSpy.mockResolvedValue(createMockResponse({ features: [] })); 

        delete window.location;
        window.location = {
            ...originalLocation, 
            search: '',
        };
    });

    afterEach(() => {
        const modalRoot = document.getElementById('modal');
        if (modalRoot) modalRoot.remove();
        if (wrapper) wrapper.unmount();
        window.location = originalLocation; 
        vi.restoreAllMocks(); 
    });

    it('Test: mounts without errors', () => {
        mountComponent();
        expect(wrapper.exists()).toBe(true);
    });

    
    it('Test: renders TankstellenCard components when data is present (manual set)', async () => {
        mountComponent();

        wrapper.vm.filteredData = structuredClone(mockFeatures);
        await nextTick(); 

        const cards = wrapper.findAllComponents(TankstellenCard);
        expect(cards.length).toBe(mockFeatures.length); 
    });

    it('load correct modal /?id= parameter is present', async () => {
        const targetItem = mockFeatures[1];
        const targetId = targetItem.attributes.objectid;

        Object.defineProperty(window, 'location', {
            value: { ...window.location, search: `?id=${targetId}` }, 
            writable: true,
            configurable: true,
        });

        fetchSpy.mockResolvedValueOnce(createMockResponse(mockJsonResponse));

        mountComponent();

        await flushPromises(); 
        await nextTick();      

        expect(fetchSpy).toHaveBeenCalledTimes(1);

        expect(wrapper.vm.isModalOpen, 'Modal should be open').toBe(true);
        expect(wrapper.vm.selectedItem, 'Selected item should not be null').not.toBeNull();
        expect(wrapper.vm.selectedItem?.attributes?.objectid, `Selected item ID should be ${targetId}`).toBe(targetId);
        expect(wrapper.vm.selectedItem).toEqual(targetItem); 

        const modal = wrapper.findComponent(TankstellenModal);
        expect(modal.exists(), 'TankstellenModal component should exist').toBe(true);
        expect(modal.props('isModalOpen'), 'Modal isOpen prop should be true').toBe(true);

        expect(mockRouterPush).toHaveBeenCalledWith({ query: { id: targetId } });
    });
    
    it('correct props to TankstellenCard when filteredData', async () => {
        mountComponent();
        wrapper.vm.filteredData = structuredClone(mockFeatures); 
        await nextTick();
        const cards = wrapper.findAllComponents(TankstellenCard);
        expect(cards.length).toBeGreaterThan(0); 

        const firstCard = cards[0];
        const firstMockItem = mockFeatures[0];
        expect(firstCard.props('x')).toBe(firstMockItem.geometry.x);
        expect(firstCard.props('y')).toBe(firstMockItem.geometry.y);
        expect(firstCard.props('adresse')).toBe(firstMockItem.attributes.adresse);
        expect(firstCard.props('id')).toBe(firstMockItem.attributes.objectid);

        const secondCard = cards[1];
        const secondMockItem = mockFeatures[1];
        expect(secondCard.props('adresse')).toBe(secondMockItem.attributes.adresse);
    });

    it('calls openModal when TankstellenCard emits "open" event', async () => {
        mountComponent();
        wrapper.vm.filteredData = structuredClone(mockFeatures); 
        await nextTick();

        const openModalSpy = vi.spyOn(wrapper.vm, 'openModal');

        const cards = wrapper.findAllComponents(TankstellenCard);
        expect(cards.length).toBeGreaterThan(0); 

        const firstCard = cards[0];
        const testItem = mockFeatures[0];

        await firstCard.vm.$emit('open', testItem);
        await nextTick();

        expect(openModalSpy).toHaveBeenCalledTimes(1);
        expect(openModalSpy).toHaveBeenCalledWith(testItem);

        expect(wrapper.vm.isModalOpen).toBe(true);
        expect(wrapper.vm.selectedItem).toEqual(testItem);

        const modal = wrapper.findComponent(TankstellenModal);
        expect(modal.exists(), 'TankstellenModal should be rendered after event').toBe(true);
        expect(modal.props('isModalOpen')).toBe(true);
        expect(modal.props('x')).toBe(testItem.geometry.x);
        expect(modal.props('adresse')).toBe(testItem.attributes.adresse);
    });
});