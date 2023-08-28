import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const dbName = 'hackathon';
const collectionName = 'connections';
const uri =
  'mongodb+srv://mohit:mohit@cluster0.lm5qs.mongodb.net/?retryWrites=true&w=majority';

async function retrieveIdConnections(id) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const documents = await collection.find({ from: id }).toArray();
    return documents;
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB Atlas');
  }
}

const handler = nextConnect();

handler.get(async (req, res) => {
  const { id } = req.query;
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
  res.json({ data: nodes_reached });
});

export default handler;
