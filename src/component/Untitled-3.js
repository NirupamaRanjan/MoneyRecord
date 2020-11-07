fetch("http://localhost:3005/users", {
  method: "POST",
  body: JSON.stringify({
    id: 9,
    name: "Sumit",
    contect: "5123123123",
    bankname: "KOTAK",
    cardnumber: "123123"
  })
});
