export default function (mail) {
  const pattern = /[A-Z0-9._%+-]+@[A-Z0-9-]+.\.[A-Z]{2,4}/igm; // ivan@мояпочта.рф - валидный адрес, но он не пройдет это проверку
  return !(pattern.test(mail));
}
