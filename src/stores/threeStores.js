import { writable } from 'svelte/store';

const isThreejsRunning = writable(true);

export default isThreejsRunning;
