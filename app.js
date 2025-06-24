const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  projectId: "TU_ID_PROYECTO",
  storageBucket: "TU_BUCKET.appspot.com",
  messagingSenderId: "TU_MENSAJERIA",
  appId: "TU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const userInfo = document.getElementById("user-info");
const adminPanel = document.getElementById("admin-panel");
const productosContainer = document.getElementById("productos-container");

auth.onAuthStateChanged(user => {
  if (user) {
    userInfo.textContent = "Hola, " + user.displayName;
    // Si el correo es el del admin, muestra panel
    if (user.email === "izangagon@gmail.com") {
      adminPanel.style.display = "block";
    }
    cargarProductos();
  } else {
    userInfo.textContent = "No has iniciado sesión.";
    productosContainer.innerHTML = "";
    adminPanel.style.display = "none";
  }
});

function login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}

function logout() {
  auth.signOut();
}

function crearProducto(e) {
  e.preventDefault();
  const producto = {
    nombre: document.getElementById("nombre").value,
    precio: parseFloat(document.getElementById("precio").value),
    imagen: document.getElementById("imagen").value,
    descripcion: document.getElementById("descripcion").value
  };
  db.collection("productos").add(producto).then(() => {
    alert("Producto agregado.");
    cargarProductos();
  });
}

function cargarProductos() {
  productosContainer.innerHTML = "";
  db.collection("productos").get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement("div");
      div.className = "col-md-4";
      div.innerHTML = `
        <div class="card mb-4 product-card">
          <img src="${data.imagen}" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">${data.nombre}</h5>
            <p class="card-text">${data.descripcion}</p>
            <p class="text-primary fw-bold">$${data.precio}</p>
          </div>
        </div>
      `;
      productosContainer.appendChild(div);
    });
  });
}

paypal.Buttons({
  createOrder: function(data, actions) {
    return actions.order.create({
      purchase_units: [{
        amount: { value: '10.00' }
      }]
    });
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      alert('Pago completado por ' + details.payer.name.given_name);
    });
  }
}).render('#paypal-button-container');
