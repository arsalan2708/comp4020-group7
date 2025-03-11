console.log("Hello from TypeScript!");

const rr = document.getElementById("body");

if (rr) {
  const tt = document.createElement("p");
  tt.innerText = "holla";
  rr.appendChild(tt);
}
