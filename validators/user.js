// Check is string is valid name
export function isName(name) {
  return (
    typeof name === 'string' &&
    name.length < 20 &&
    name.length > 3 &&
    /^[A-Za-z\s]+$/.test(name)
  );
}
