const express = require('express');
const mysql = require('mysql2');
const AWS = require('aws-sdk');
const app = express();

const rds = {
  host: 'diecastcorner-db.cnywe84w2h7u.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'pesawatjet12',
  database: 'diecastcorner-db'
};

const connection = mysql.createConnection(rds);

AWS.config.update({
  region: 'ap-southeast-1',
  accessKeyId: 'AKxxxxxxxxxxxx',
  secretAccessKey: 'xxxxxxxxxxxx'
});

const s3 = new AWS.S3();

async function fetchPosts() {
  const bucketName = 'diecastcorner-pictures';
  const params = {
    Bucket: bucketName,
    MaxKeys: 100
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    return data.Contents.map(item => item.Key);
  } catch (error) {
    console.error("Error fetching S3 objects:", error);
    return [];
  }
}

app.use(express.static(__dirname));

app.get('/produk', async (req, res) => {
  try {
    const images = await fetchPosts();

    connection.query("SELECT * FROM produk", (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error querying database' });
      }

      const data = rows.map((item, index) => ({
        ...item,
        image: `https://s3-ap-southeast-1.amazonaws.com/ecommerce-product-bucket/${images[index]}`
      }));

      res.json(data);
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

app.listen(3000, () => console.log("Web berjalan di port 3000"));
