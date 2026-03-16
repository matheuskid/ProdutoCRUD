export const rules = {
  required: (value: any) => {
    if (typeof value === 'object') {
      return !!value.id || 'Campo obrigatório';
    }
    return !!value || 'Campo obrigatório';
  },
  positivo: (value: number) => value >= 0 || 'O preço não pode ser negativo',
  
  isNumber: (value: any) => {
    const pattern = /^\d+(\.\d{1,2})?$/; // Aceita números com até 2 casas decimais
    return pattern.test(value) || 'Formato de preço inválido (use apenas números e ponto)';
  },

  noEmpty: (value: string) => {
    return (value?.trim().length > 0) || 'O nome não pode conter apenas espaços em branco';
  },
};