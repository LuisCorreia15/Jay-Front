function tempAlert(msg, duration) {
  var el = document.createElement("div");
  el.setAttribute(
    "style",
    "position:fixed;top:0%;left:50%;padding: 15px 20px;  font-weight: 300;border-radius: 5px;margin-top: 100px;transform: translate(-50%); background-color: #ffff;font-size: 20px;  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.05);color:#555;z-index:1000;"
  );
  el.innerHTML = msg;
  setTimeout(function () {
    el.parentNode.removeChild(el);
  }, duration);
  document.body.appendChild(el);
}

export default tempAlert;
