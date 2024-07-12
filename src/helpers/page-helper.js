export function setTitle(title) {
  const element = document.querySelector("title");
  element.innerHTML = title;
}

export function setDescription(description) {
  const element = document.querySelector("meta[name='description']");
  element.setAttribute("content", description);
}

export default function setPageHead({ title, description }) {
  setTitle(title);
  setDescription(description);
}
