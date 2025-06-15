
import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const prisma = new PrismaClient();
const app = express();
app.use(express.json());


/*my user section start here*/

//creating a new user 
app.post('/users', async (req, res) => {
  const { firstName, lastName, emailAddress, username } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        emailAddress,
        username,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'User could not be created', details: error.message });
  }
});

// get many user
app.get('/user', async (req, res) => {
  const user = await prisma.user.findMany();
  res.json(user);
});
//get unique user 
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
});

// update a user
app.put('/user/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, emailAddress } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { firstName, lastName, emailAddress },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});



//delete a user
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    res.status(200).json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user', details: error.message });
  }
});
// end of my user part user 

/*my post part start here*/
// Post ama create
app.post('/post', async (req, res) => {
  const { title, content, userId } = req.body; 
  try {
    const post = await prisma.post.create({
      data: { title, content, userId }, 
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/post', async (req, res) => {
  const post = await prisma.post.findMany({
    where: { isDeleted: false },
    include: { user: true }, 
  });
  res.json(post);
});

app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: { user: true }, 
  });
  post && !post.isDeleted
    ? res.json(post)
    : res.status(404).json({ error: 'Post not found or deleted' });
});

//part to update a user

app.put('/post/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updated = await prisma.post.update({
      where: { id },
      data: { title, content },
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/post/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await prisma.post.update({
      where: { id },
      data: { isDeleted: true },
    });
    res.json({ message: 'Post marked as deleted', post: deleted });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/*my product part starts here*/

//my code for creating a new product 
app.post('/products', async (req, res) => {
  const { productTitle, productDescription, productCost, unitsLeft } = req.body;

  try {
    const newProduct = await prisma.product.create({
      data: {
        productTitle,
        productDescription,
        productCost,
        unitsLeft,
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product', details: error.message });
  }
});

//my updating part product
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { productTitle, productDescription, productCost, unitsLeft } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        productTitle,
        productDescription,
        productCost,
        unitsLeft,
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product', details: error.message });
  }
});
// my get many ama all products
app.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products', details: error.message });
  }
});
//my geta product
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
       error: 'Failed to retrieve product', details: error.message });
  }
});
//my delete product part
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product', details: error.message });
  }
});
// End of my product part

app.get('/', (req, res) => {
  res.send('coding is such interesting also addictive');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
