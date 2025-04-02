/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { ref } from 'vue';

const mockFeatures = [
    { attributes : {objectid: 98, adresse: 'Bonner Str. 98 (50677 Neustadt/Süd)'}, geometry : {x: 6.960644911005172, y: 50.916095041454554} },
    { attributes : {objectid: 100, adresse: 'Siegburger Str. 116 (50679 Deutz)'}, geometry : {x: 6.979491940887355, y: 50.923288946783785} },
    { attributes: {objectid: 99, adresse: 'Hülchrather Str. 17 (50670 Neustadt/Nord)'}, geometry: {x: 6.961069175632063, y: 50.954466539174284} }, 
];

const mockUnsortedFeatures = [
    mockFeatures[1], 
    mockFeatures[0], 
    mockFeatures[2], 
];


describe('Sorting Functions Logic', () => {
    let filteredData; 

    function aufsteigend(){
        filteredData.value = [...filteredData.value].sort((a, b) => {
            return a.attributes.adresse.localeCompare(b.attributes.adresse);
        });
    }

    function absteigend(){
        aufsteigend();
        filteredData.value.reverse();
    }

    beforeEach(() => {
        filteredData = ref(structuredClone(mockUnsortedFeatures));
    });

    it('aufsteigend() sort alphabetically ascending', () => {
        aufsteigend();

        const expectedSortedData = [
            mockFeatures[0], 
            mockFeatures[2], 
            mockFeatures[1], 
        ];
        expect(filteredData.value).toEqual(expectedSortedData);
    });

    it('absteigend() sort alphabetically descending', () => {
        absteigend();

        const expectedSortedData = [
            mockFeatures[1], 
            mockFeatures[2], 
            mockFeatures[0], 
        ];
        expect(filteredData.value).toEqual(expectedSortedData);
    });

    it('aufsteigend() handle an empty array', () => {
        filteredData.value = []; 

        aufsteigend();

        expect(filteredData.value).toEqual([]);
    });

     it('absteigend() handle an empty array', () => {
        filteredData.value = []; 

        absteigend();

        expect(filteredData.value).toEqual([]);
    });

     it('aufsteigend() handle array with one item', () => {
        const singleItem = [mockFeatures[0]];
        filteredData.value = singleItem;

        aufsteigend();

        expect(filteredData.value).toEqual(singleItem); 
    });

    it('absteigend() handle array with one item', () => {
        const singleItem = [mockFeatures[0]];
        filteredData.value = singleItem;

        absteigend();

        expect(filteredData.value).toEqual(singleItem); 
    });
});