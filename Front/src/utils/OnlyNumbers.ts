export const onlyNumbers = (event: KeyboardEvent) => {
  const charCode = event.keyCode ? event.keyCode : event.which;
  // Permite apenas números (48-57) e ponto (46)
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    event.preventDefault();
  }
};