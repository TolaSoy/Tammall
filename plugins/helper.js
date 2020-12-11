const getFormattedDate = date => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date
    .getDate()
    .toString()
    .padStart(2, "0");

  return month + "-" + day + "-" + year;
};

const dateFormat = date => {
  let t = new Date(date.seconds * 1000);
  return getFormattedDate(t);
};

const uuid = fileName => {
  console.log(fileName);
  let dt = new Date().getTime();
  let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
    c
  ) {
    let r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return `${uuid} - ${fileName}`;
};

export default ({ app }, inject) => {
  inject("getFormattedDate", getFormattedDate);
  inject("dateFormat", dateFormat);
  inject("uuid", uuid);
};
