export function makeUrlKey($name) {
  const str = $name.replace(" & ", "-");
  const uriunique = str.replace(/\s/g, "-");

  return uriunique.toLowerCase();
}
