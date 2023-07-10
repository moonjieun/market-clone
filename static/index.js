const calcTime = (timestamp) => {
  const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
  const time = new Date(curTime - timestamp);
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  if (hour > 0) return `${hour}시간 전`;
  else if (minute > 0) return `${minute}분 전`;
  else if (second > 0) return `${second}초 전`;
  else "방금 전";
};

const renderData = (data) => {
  const main = document.querySelector("main");
  //[].reverse 를 쓰는이유 : 서버 측에서 내려준 데이터는 쌓인 순으로 내려줘서
  //가장 나중에 온 것이 가장 최근 데이터이기때문에
  data.reverse().forEach(async (obj) => {
    const div = document.createElement("div");
    div.className = "item-list";

    const imgDiv = document.createElement("div");
    imgDiv.className = "item-list__img";

    const img = document.createElement("img");
    const res = await fetch(`/images/${obj.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    img.src = url;

    const infoDiv = document.createElement("div");
    infoDiv.className = "item-list__info";

    const infoTitleDiv = document.createElement("div");
    infoTitleDiv.className = "item-list__info-title";
    infoTitleDiv.innerText = obj.title;

    const infoMetaDiv = document.createElement("div");
    infoMetaDiv.className = "item-list__info-meta";
    infoMetaDiv.innerText = obj.place + "" + calcTime(obj.insertAt);

    const infoPriceDiv = document.createElement("div");
    infoPriceDiv.className = "item-list__info-price";
    infoPriceDiv.innerText = obj.price;

    imgDiv.appendChild(img);
    infoDiv.appendChild(infoTitleDiv);
    infoDiv.appendChild(infoMetaDiv);
    infoDiv.appendChild(infoPriceDiv);
    div.appendChild(infoDiv);
    div.appendChild(imgDiv);
    div.appendChild(infoDiv);
    main.appendChild(div);
  });
};

const fetchList = async () => {
  const res = await fetch("items");
  const data = await res.json();
  renderData(data);
};

fetchList();
