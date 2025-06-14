// seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Conexión
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Definición del esquema de categoría
const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  active: Boolean
});

const productSchema = new mongoose.Schema({
  code: String,
  name: String,
  description: String,
  images: String,
  price: Number,
  stock: Number,
  category: mongoose.Types.ObjectId,
  brand: String,
  condition: {
    type: String,
    enum: ['new', 'used', 'refurbished']
  },
  vat: Number,
  active: Boolean
});

const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

async function insertarDatos() {
  try {
    // Insertar categoría si no hay
    const categorias = await Category.find();
    let categoriaId;

    if (categorias.length === 0) {
      const nuevaCat = await Category.create({
        name: "Tecnología",
        description: "Productos electrónicos",
        active: true
      });
      categoriaId = nuevaCat._id;
      console.log('🟢 Categoría creada:', nuevaCat.name);
    } else {
      categoriaId = categorias[0]._id;
      console.log('🟡 Categoría ya existente:', categorias[0].name);
    }

    // Insertar productos si no hay
    const productos = await Product.find();
    if (productos.length === 0) {
      await Product.insertMany([
        {
          code: "P001",
          name: "Laptop",
          description: "Laptop potente para desarrollo",
          images: "https://via.placeholder.com/150",
          price: 1200,
          stock: 10,
          category: categoriaId,
          brand: "HP",
          condition: "new",
          vat: 19,
          active: true
        },
        {
          code: "P002",
          name: "Mouse gamer",
          description: "Mouse RGB para gamers",
          images: "https://via.placeholder.com/150",
          price: 35,
          stock: 50,
          category: categoriaId,
          brand: "Logitech",
          condition: "new",
          vat: 19,
          active: true
        }
      ]);
      console.log('✅ Productos insertados correctamente');
    } else {
      console.log('🟡 Ya existen productos en la base de datos');
    }

    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error insertando datos:', err);
    mongoose.connection.close();
  }
}

insertarDatos();
