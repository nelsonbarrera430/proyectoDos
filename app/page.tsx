'use client';

import { useState } from 'react';

// Definimos el tipo para los productos y el carrito
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const Home = () => {
  // Estados para el carrito, búsqueda, y pagos
  const [cart, setCart] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  // Lista de productos (divididos en categorías)
  const products: Product[] = [
    { id: 1, name: 'Chaqueta de cuero', description: 'Chaqueta de cuero premium para hombre.', price: 150, image: 'https://img.freepik.com/foto-gratis/camiseta_1203-8005.jpg', category: 'ropa' },
    { id: 2, name: 'Zapatillas deportivas', description: 'Zapatillas cómodas y de alto rendimiento.', price: 90, image: 'https://img.freepik.com/foto-gratis/camiseta_1203-8005.jpg', category: 'ropa' },
    { id: 3, name: 'Gafas de sol', description: 'Gafas de sol polarizadas para el verano.', price: 50, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_FiAWz7oApdQHcOWbYBkzY-mjQxsL-o3nww&s', category: 'ropa' },
    { id: 4, name: 'Auriculares Bluetooth', description: 'Auriculares de alta calidad con cancelación de ruido.', price: 120, image: 'https://www.lifeder.com/wp-content/uploads/2021/07/tecnologia-objetos.jpg', category: 'objetos' },
    { id: 5, name: 'Smartwatch', description: 'Reloj inteligente con monitoreo de actividad.', price: 200, image: 'https://www.lifeder.com/wp-content/uploads/2021/07/tecnologia-objetos.jpg', category: 'objetos' },
    { id: 6, name: 'Laptop Gaming', description: 'Laptop potente para juegos de alta resolución.', price: 1500, image: 'https://www.lifeder.com/wp-content/uploads/2021/07/tecnologia-objetos.jpg', category: 'objetos' },
    { id: 7, name: 'Cámara 4K', description: 'Cámara profesional con grabación en 4K.', price: 999, image: 'https://www.lifeder.com/wp-content/uploads/2021/07/tecnologia-objetos.jpg', category: 'objetos' },
    { id: 8, name: 'Dron profesional', description: 'Dron con cámara 4K y control remoto avanzado.', price: 700, image: 'https://www.lifeder.com/wp-content/uploads/2021/07/tecnologia-objetos.jpg', category: 'objetos' },
    { id: 9, name: 'Robot aspiradora', description: 'Aspiradora inteligente con navegación automática.', price: 300, image: 'https://www.lifeder.com/wp-content/uploads/2021/07/tecnologia-objetos.jpg', category: 'objetos' },
    { id: 10, name: 'Parlante Bluetooth', description: 'Parlante portátil con sonido surround.', price: 70, image: 'https://www.lifeder.com/wp-content/uploads/2021/07/tecnologia-objetos.jpg', category: 'objetos' },
  ];

  // Filtrar productos según la categoría seleccionada y la búsqueda
  const filteredProducts = products.filter(product =>
    (selectedCategory === 'all' || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Agregar producto al carrito
  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  // Eliminar producto del carrito
  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Total del carrito
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  // Mostrar el modal de pago
  const handlePayment = (method: string) => {
    setPaymentMethod(method);
    setShowPaymentModal(true);
  };

  // Cerrar el modal de pago
  const closeModal = () => {
    setShowPaymentModal(false);
    setCardNumber('');
    setCardExpiry('');
    setCardCVV('');
  };

  // Función de pago con tarjeta
  const handleCardPayment = () => {
    if (!cardNumber || !cardExpiry || !cardCVV) {
      alert('Por favor, complete todos los campos de la tarjeta.');
      return;
    }
    alert('Pago realizado con éxito.');
    closeModal();
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', background: '#222' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', color: 'white', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)' }}>
        <h1 style={{ fontSize: '2.5em', textTransform: 'uppercase', color: '#00bcd4' }}>TIENDA BLOP</h1>
        <div style={{ fontSize: '1.2em', color: '#fff' }}>
          <span>Carrito: {cart.length} items</span>
        </div>
      </header>

      <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '15px',
            width: '70%',
            fontSize: '1.2em',
            borderRadius: '30px',
            border: '2px solid #00bcd4',
            backgroundColor: 'transparent',
            color: '#fff',
            textAlign: 'center',
            boxShadow: '0 0 10px rgba(0, 188, 212, 0.5)',
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button onClick={() => setSelectedCategory('ropa')} style={{ padding: '10px 20px', background: selectedCategory === 'ropa' ? '#ff0099' : '#00bcd4', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.2em', margin: '0 10px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>
          Ropa
        </button>
        <button onClick={() => setSelectedCategory('objetos')} style={{ padding: '10px 20px', background: selectedCategory === 'objetos' ? '#ff0099' : '#00bcd4', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.2em', margin: '0 10px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>
          Objetos
        </button>
        <button onClick={() => setSelectedCategory('all')} style={{ padding: '10px 20px', background: selectedCategory === 'all' ? '#ff0099' : '#00bcd4', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.2em', margin: '0 10px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>
          Todos
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filteredProducts.map(product => (
          <div key={product.id} style={{ border: '2px solid #00bcd4', padding: '20px', width: '250px', borderRadius: '15px', background: '#121212', textAlign: 'center', boxShadow: '0 4px 10px rgba(0, 188, 212, 0.5)' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', marginBottom: '15px' }} />
            <h3 style={{ color: '#ff0099' }}>{product.name}</h3>
            <p style={{ color: '#fff' }}>{product.description}</p>
            <p style={{ color: '#ff0099', fontSize: '1.3em', fontWeight: 'bold' }}>${product.price}</p>
            <button onClick={() => addToCart(product)} style={{ background: '#ff0099', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', cursor: 'pointer', fontSize: '1.2em', width: '100%' }}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={{ padding: '20px', background: '#121212', marginTop: '20px', borderRadius: '10px' }}>
          <h2 style={{ color: '#fff' }}>Resumen de tu carrito</h2>
          <ul>
            {cart.map(item => (
              <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
                <span>{item.name}</span>
                <span>${item.price}</span>
                <button onClick={() => removeFromCart(item.id)} style={{ background: 'transparent', color: '#ff0099', border: 'none', cursor: 'pointer' }}>Eliminar</button>
              </li>
            ))}
          </ul>
          <h3 style={{ color: '#fff' }}>Total: ${getTotal()}</h3>
          <button onClick={() => handlePayment('Tarjeta')} style={{ background: '#00bcd4', color: 'white', padding: '15px 30px', fontSize: '1.5em', border: 'none', borderRadius: '30px', cursor: 'pointer', marginTop: '20px' }}>
            Pagar con tarjeta
          </button>
        </div>
      )}

      {showPaymentModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#222', padding: '40px', borderRadius: '15px', width: '400px', textAlign: 'center' }}>
            <h2 style={{ color: 'white' }}>Método de pago: {paymentMethod}</h2>
            <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Número de tarjeta" style={{ padding: '10px', width: '100%', margin: '10px 0', borderRadius: '5px' }} />
            <input type="text" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} placeholder="Fecha de expiración" style={{ padding: '10px', width: '100%', margin: '10px 0', borderRadius: '5px' }} />
            <input type="text" value={cardCVV} onChange={(e) => setCardCVV(e.target.value)} placeholder="CVV" style={{ padding: '10px', width: '100%', margin: '10px 0', borderRadius: '5px' }} />
            <button onClick={handleCardPayment} style={{ background: '#ff0099', color: 'white', border: 'none', padding: '10px 20px', fontSize: '1.2em', borderRadius: '25px', cursor: 'pointer' }}>
              Confirmar Pago
            </button>
            <button onClick={closeModal} style={{ background: 'transparent', color: '#ff0099', border: 'none', padding: '10px', fontSize: '1.2em', cursor: 'pointer' }}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
