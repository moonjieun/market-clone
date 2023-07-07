const renderData = (data) => {
  const main = document.querySelector("main");
  data.forEach((obj) => {
    const div = document.createElement("div");
    div.innerText = obj.title;
    main.appendChild(div);
  });
};

const fetchList = async () => {
  const res = await fetch("items");
  const data = await res.json();
  renderData(data);
};

fetchList();
