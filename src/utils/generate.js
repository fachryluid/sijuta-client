export const randomString = (length) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
  }
  
  return result;
}

export const getPeriodes = () => {
  const startYear = 2023;
  const currentYear = new Date().getFullYear();

  const periodes = [];

  for (let year = startYear; year <= currentYear; year++) {
    const periodeGanjil = `GANJIL ${year}`;
    const periodeGenap = `GENAP ${year}`;

    periodes.push(periodeGanjil, periodeGenap);
  }

  return periodes;
};
