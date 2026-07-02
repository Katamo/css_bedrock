/**
 * Contexto compartido entre BRadioGroup y los BRadio de su slot.
 * El grupo provee name, modelValue y disabled; cada radio lo inyecta
 * para no repetir cableado en cada opción.
 */
export const RADIO_GROUP_KEY = Symbol('b-radio-group');
