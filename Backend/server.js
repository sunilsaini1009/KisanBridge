const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Connection Setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test DB connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL successfully!');
  release();
});

// API Routes

// 1. Register Farmer
app.post('/api/register/farmer', async (req, res) => {
  const {
    preferredLanguage, farmerFullName, farmerFatherName, farmerMobile,
    farmerState, farmerDistrict, farmerVillage, farmerPincode,
    farmSizeAcres, crops, farmerAadhaar, bankAccount, bankIfsc,
    fpoMember, fpoName, fpoId
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO farmers (
        preferred_language, full_name, father_name, mobile,
        state, district, village, pincode, farm_size_acres, crops,
        aadhaar_no, bank_account, bank_ifsc, fpo_member, fpo_name, fpo_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *`,
      [
        preferredLanguage, farmerFullName, farmerFatherName, farmerMobile,
        farmerState, farmerDistrict, farmerVillage, farmerPincode,
        farmSizeAcres, JSON.stringify(crops), farmerAadhaar, bankAccount, bankIfsc,
        fpoMember === 'yes', fpoName, fpoId
      ]
    );
    res.status(201).json({ success: true, message: 'Farmer registered successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error registering farmer:', error);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

// 2. Register Family Buyer
app.post('/api/register/family', async (req, res) => {
  const {
    buyerName, buyerPhone, buyerEmail, familySize,
    buyerAddress, buyerCity, buyerPincode, weeklyBoxOptIn
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO family_buyers (
        full_name, phone, email, family_size, address, city, pincode, weekly_opt_in
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        buyerName, buyerPhone, buyerEmail, familySize,
        buyerAddress, buyerCity, buyerPincode, weeklyBoxOptIn
      ]
    );
    res.status(201).json({ success: true, message: 'Family buyer registered successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error registering family buyer:', error);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

// 3. Register Business Buyer
app.post('/api/register/business', async (req, res) => {
  const {
    businessName, businessType, buyerName, buyerPhone, gstin,
    estimatedDailyRequirement, deliverySlot, buyerAddress
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO business_buyers (
        business_name, business_type, contact_person, phone, gstin,
        daily_requirement, delivery_slot, address
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        businessName, businessType, buyerName, buyerPhone, gstin,
        estimatedDailyRequirement, deliverySlot, buyerAddress
      ]
    );
    res.status(201).json({ success: true, message: 'Business buyer registered successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error registering business buyer:', error);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

// GET endpoints for fetching data
app.get('/api/farmers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM farmers ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/buyers/family', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM family_buyers ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/buyers/business', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM business_buyers ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
