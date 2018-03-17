export default function inputValid(touched, error) {
  if (touched) {
    if (error) {
      return false;
    }
    return true;
  }
  return undefined;
}
