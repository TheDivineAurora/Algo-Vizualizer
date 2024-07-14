import { createContext, useContext, useEffect, useState } from "react";
import  { getRandomInt, getDigit, mostDigits, awaitTimeout } from "../lib/utils.js";
const VisualizerContext = createContext();

const speeds = {
    "slow" : "50",
    "normal" : "200",
    "fast" : "10"
}

export const VisualizerProvider = ({ children }) => {
    const [sortingState , setSortingState] = useState({
        array : [],
        barCount : 0,
        delay : speeds["normal"],
        algorithm : "merge_sort",
        sorting : false,
        sorted : false
    });

    useEffect(()=>{
        updateBarCount(25);
    }, [sortingState.barCount]);

    const updateBar = (index, payload) => {
        setSortingState((prev) => ({
            ...prev,
            array : prev.array.map((item, i) => (i === index? { ...item, ...payload} : item))
        }));
    }

    const generateSortingArray = (barCount) => {
        const newArray = Array.from({ length : barCount}, () => {
            return (
                {
                    value : getRandomInt(100, 1000),
                    state : "idle"
                }
            );
        });

        setSortingState((prev) => ({
            ...prev,
            array : newArray,
            sorted : false,
            sorting : false
        }))

    }

    const updateBarCount = ( newBarCount ) => {
        generateSortingArray(newBarCount);
    }

    const changeAlgorithm = ( selectedAlgorithm ) => {
        setSortingState((prev) => ({
            ...prev,
            algorithm : selectedAlgorithm
        }));
    }

    const changeSpeed = ( newSpeed ) => {
        setSortingState((prev) => ({
            ...prev,
            delay : speeds[newSpeed]
        }));
    }

    const bubbleSort = async () => {
        const arr = sortingState.array.map((item) => item.value);

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                updateBar(j, { state: "selected" });
                updateBar(j + 1, { state: "selected" });
                await awaitTimeout(sortingState.delay);

                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    updateBar(j, { value: arr[j + 1] });
                    arr[j + 1] = temp;
                    updateBar(j + 1, { value: temp });
                    await awaitTimeout(sortingState.delay);
                }

                updateBar(j, { state: "idle" });
                updateBar(j + 1, { state: "idle" });
            }
        }
    };

    const insertionSort = async () => {
        const arr = sortingState.array.map((item) => item.value);

        for (let i = 1; i < arr.length; i++) {
            let current = arr[i];
            let j = i - 1;

            updateBar(i, { value: current, state: "selected" });

            while (j > -1 && current < arr[j]) {
                arr[j + 1] = arr[j];
                updateBar(j + 1, { value: arr[j], state: "selected" });
                j--;
                await awaitTimeout(sortingState.delay);
                updateBar(j + 2, { value: arr[j + 1], state: "idle" });
            }

            arr[j + 1] = current;
            updateBar(j + 1, { value: current, state: "idle" });
        }
    };

    const selectionSort = async () => {
        const arr = sortingState.array.map((item) => item.value);

        for (let i = 0; i < arr.length; i++) {
            let min = i;
            updateBar(min, { state: "selected" });

            for (let j = i + 1; j < arr.length; j++) {
                updateBar(j, { state: "selected" });
                await awaitTimeout(sortingState.delay);

                if (arr[j] < arr[min]) {
                    updateBar(min, { state: "idle" });
                    min = j;
                    updateBar(min, { state: "selected" });
                } else {
                    updateBar(j, { state: "idle" });
                }
            }

            if (min !== i) {
                let temp = arr[i];
                arr[i] = arr[min];
                updateBar(i, { value: arr[min], state: "idle" });
                arr[min] = temp;
                updateBar(min, { value: temp, state: "idle" });
            } else {
                updateBar(i, { state: "idle" });
                updateBar(min, { state: "idle" });
            }
        }
    };

    const mergeSort = async () => {
        const arr = sortingState.array.map((item) => item.value);
        mergeSortHelper(arr);
    };
    async function mergeSortHelper(arr, start = 0, end = arr.length - 1) {
        if (start >= end) return;

        const middle = Math.floor((start + end) / 2);
        await mergeSortHelper(arr, start, middle);
        await mergeSortHelper(arr, middle + 1, end);
        await mergeSortMerger(arr, start, middle, end);
    }
    async function mergeSortMerger(arr, start, middle, end) {
        let left = arr.slice(start, middle + 1);
        let right = arr.slice(middle + 1, end + 1);

        let i = 0,
            j = 0,
            k = start;

        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                updateBar(k, { value: left[i], state: "selected" });
                arr[k++] = left[i++];
            } else {
                updateBar(k, { value: right[j], state: "selected" });
                arr[k++] = right[j++];
            }
            await awaitTimeout(sortingState.delay);
        }

        while (i < left.length) {
            updateBar(k, { value: left[i], state: "selected" });
            arr[k++] = left[i++];
            await awaitTimeout(sortingState.delay);
        }

        while (j < right.length) {
            updateBar(k, { value: right[j], state: "selected" });
            arr[k++] = right[j++];
            await awaitTimeout(sortingState.delay);
        }

        for (let i = start; i <= end; i++) {
            updateBar(i, { value: arr[i], state: "idle" });
        }
    }

    const quickSort = async () => {
        const arr = sortingState.array.map((item) => item.value);
        quickSortHelper(arr);
    };
    const quickSortHelper = async (arr, start = 0, end = arr.length - 1) => {
        if (start >= end) {
            return;
        }

        const pivot = arr[Math.floor((start + end) / 2)];
        let i = start;
        let j = end;

        while (i <= j) {
            while (arr[i] < pivot) i++;
            while (arr[j] > pivot) j--;

            if (i <= j) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                updateBar(i, { value: arr[i], state: "selected" });
                updateBar(j, { value: arr[j], state: "selected" });

                await awaitTimeout(sortingState.delay);

                updateBar(i, { value: arr[i], state: "idle" });
                updateBar(j, { value: arr[j], state: "idle" });
                i++;
                j--;
            }
        }

        await quickSortHelper(arr, start, j);
        await quickSortHelper(arr, i, end);
    }

    const radixSort = async () => {

        let arr = sortingState.array.map((item) => item.value);
        let maxDigitCount = mostDigits(arr);

        for (let k = 0; k < maxDigitCount; k++) {
            let digitBuckets = Array.from({ length: 10 }, () => []);
            for (let i = 0; i < arr.length; i++) {
                let digit = getDigit(arr[i], k);
                digitBuckets[digit].push(arr[i]);
            }

            arr = [].concat(...digitBuckets);

            for (let i = 0; i < arr.length; i++) {
                updateBar(i, { value: arr[i], state: "selected" });
                await awaitTimeout(sortingState.delay);
                updateBar(i, { value: arr[i], state: "idle" });
            }
        }
    };

    const algorithms = {
        "bubble_sort" : bubbleSort,
        "insertion_sort" : insertionSort,
        "selection_sort" : selectionSort,
        "merge_sort" : mergeSort,
        "quick_sort" : quickSort,
        "radix_sort" : radixSort
    }
    
    const startPlaying = async() => {
        setSortingState((prev) => ({
            ...prev,
            sorting: true
        }))
        await algorithms[sortingState.algorithm]();

        setSortingState((prev) => ({
            ...prev,
            sorted: true,
            sorting: false  
        }))
    }
    
    const stopPlaying = () => {
        const newArray = [...sortingState.array].sort();

        setSortingState((prev) => ({
            ...prev,
            array : newArray,
            sorted : true,
            sorting : false
        }))
    }

    return (
        <VisualizerContext.Provider value = {{
            sortingState,
            generateSortingArray,
            updateBarCount,
            startPlaying,
            stopPlaying,
            changeSpeed,
            changeAlgorithm
        }}>
            {children}
        </VisualizerContext.Provider>
    )
}


export const useVisualizer = () => useContext(VisualizerContext);
