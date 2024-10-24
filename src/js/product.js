async function fetchProducts() {
  var url = "http://192.168.1.235:8060/api/product/all";
  
  const product = await fetch(url, {
  method: "GET",
  mode: "no-cors",
  })

  return await product.json();
}