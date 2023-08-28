const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const dbName = "hackathon";
const collectionName = "connections";

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mohit:mohit@cluster0.lm5qs.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

app.use(express.json());

async function retrieveIdConnections(id) {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const documents = await collection.find({"from":id}).toArray();
    return documents;
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}


app.get('/', (req, res) => {
  res.send('Hello, World! yes');
});

app.get('/view',async (req,res)=>{
  const {id}=req.query;
  const data = await retrieveIdConnections(parseInt(id));
  const nodes_reached = data.reduce((acc, item) => {
      const existingItem = acc.find((el) => el.to === item.to);
      if (existingItem) {
        if (!existingItem.type.includes(item.type)) {
          existingItem.type.push(item.type);
        }
      } else {
        acc.push({ to: item.to, type: [item.type] });
      }
      return acc;
    }, []);
  res.json(nodes_reached);
})

app.get('/details',(req,res)=>{

})

app.post('/upload', async (req, res) => {
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      const data = req.body;
      const result = await collection.insertMany(data);
      res.json({
        message: `${result.insertedCount} documents inserted`
      });
    } catch (error) {
      console.error('Error inserting data to the database:', error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      client.close();
    }
})

app.post('/service',async (req,res)=>{
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('services');
    const data = req.body;
    const result = await collection.insertMany(data);
    res.json({
      message: `${result.insertedCount} documents inserted`
    });
  } catch (error) {
    console.error('Error inserting data to the database:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.close();
  }
  }
)

const port = 8000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
