export function changeBodyScrollState(state) {
  const body = document.getElementsByTagName('body')[0];
  if (state) {
    body.classList.add('scroll-disabled');
    body.classList.remove('scroll-enabled');
  } else {
    body.classList.add('scroll-enabled');
    body.classList.remove('scroll-disabled');
  }
}