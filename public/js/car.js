addEventListener("DOMContentLoaded", () => {
  let mainCar = document.querySelector("#mainCar");
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));

    const arrayPrice = () => {
      let convertToNumber = carrito.map((cars) => {
        return Number(cars.price.split("$")[1]);
      });

      return convertToNumber;
    };

    let total = arrayPrice().reduce(
      (previousValue, currentValue) => previousValue + currentValue
    );

    const listCar = () => {
      let res = carrito.map(
        ({ id, image, title, price }) =>
          `<a href='/products/detail/${id}'>
        <img class='img-car' src='/images/covers/${image}'/>
      </a>
      <div class='info-album'>
        <p class='artist'>${title}</p>
      </div>
      <div class='cantidad'>
        <i class='fas fa-minus-circle'></i>
        <p>1</p>
        <i class='fas fa-plus'></i>
      </div>
      <div>
        <p class='precio-album'>${price} MXN</p>
      </div>
      <p class='borrar' >
        <a href='#'>Eliminar</a>
      </p>`
      );
      return res;
    };

    // const deteleAllProducts = () => {
    //   localStorage.removeItem("carrito");
    // };

    // onclick="${deteleAllProducts()}"

    //   <button  class="form-btn" type="button">
    //   <a href="/">Vaciar carrito</a>
    // </button>

    mainCar.innerHTML = `
    <section class="container-car" style="margin-bottom: 5%">
    <div class="header-carrito">
      <h2>Tu carrito</h2>
    </div>
    <div class="productoX">
     ${listCar().join("")}
    </div>
    <div class="subtotal">
      <h5>Subtotal</h5>
      <p id="x-pagar"> ${total} MXN</p>
    </div>
    <div class="btn-form">
      <button class="form-btn" type="button">
        <a href="/">Seguir comprando</a>
      </button>
      <button class="form-btn-finalizar" type="submit">
        Finalizar pedido
      </button>
    </div>
  </section>    
    `;
  } else {
    mainCar.innerHTML = `
    <section class="container-car">
    <div class="header-empty">
      <h2>Tu carrito está vacío</h2>
    </div>
    <div class="empty">
      <div>
        <p>¿No sabes qué comprar?</p>
        <p>Revisa las colecciones de álbumes</p>
      </div>
    </div>
  </section>
    `;
    console.log(mainCar);
  }
});
