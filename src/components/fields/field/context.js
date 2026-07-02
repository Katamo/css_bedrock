import { inject } from 'vue';

/**
 * Contexto compartido entre BField y el control de su slot.
 * BField lo provee (objeto reactivo); los controles (BInput, BCheckbox,
 * BSelect, BTextarea…) lo inyectan para autoconfigurar id, aria-describedby,
 * aria-invalid y disabled sin cableado manual.
 */
export const FIELD_KEY = Symbol('b-field');

export function useFieldContext() {
  return inject(FIELD_KEY, null);
}

/**
 * Atributos ARIA/id derivados del contexto de campo.
 * Los attrs explícitos del consumidor tienen prioridad.
 */
export function fieldControlAttrs(field, attrs) {
  if (!field) return {};

  const describedBy = [field.hintId, field.errorId].filter(Boolean).join(' ');

  return {
    ...(field.id && attrs.id === undefined && { id: field.id }),
    ...(describedBy && attrs['aria-describedby'] === undefined && { 'aria-describedby': describedBy }),
    ...(field.invalid && attrs['aria-invalid'] === undefined && { 'aria-invalid': 'true' }),
    ...(field.required && attrs.required === undefined && { required: true }),
  };
}
