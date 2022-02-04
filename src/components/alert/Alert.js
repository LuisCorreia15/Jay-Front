export function tempAlert(msg, duration) {
  var el = document.createElement("div");
  el.setAttribute(
    "style",
    "position:fixed; opacity: 0 ;transition: 0.5s ease; transform: translate(-50%); top:-10%;left:50%;  padding: 15px 30px; font-weight: 500; backdrop-filter: blur(28px);   box-shadow: var(--basicShadow);  border-radius: 10px;  margin: 20px; border: none;   background-color: var(--comment);  font-size: 18px;  color:var(--bg);  z-index:10005;"
  );
  el.innerHTML = msg;

  setTimeout(function () {
    el.style.top = "6%";
    el.style.opacity = "1";
  }, 100);

  setTimeout(function () {
    el.style.opacity = "0";
    el.style.top = "-15%";
  }, duration);

  setTimeout(function () {
    el.parentNode.removeChild(el);
  }, duration * 1.5);

  document.body.appendChild(el);
}

export default tempAlert;
