const throwError = (err) => {
  if (err.response.status === 403) {
    alert(err.response.data.error);
    localStorage.removeItem("token");
    window.location.reload();
  } else {
    alert(err.response.data.error);
  }
};

module.exports = throwError;

// export default 로 변경하면 알람이 안뜨는데?
