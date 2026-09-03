-- Run this to create the database:
-- CREATE DATABASE kisanbridge_db;
-- \c kisanbridge_db

CREATE TABLE IF NOT EXISTS farmers (
    id SERIAL PRIMARY KEY,
    preferred_language VARCHAR(50),
    full_name VARCHAR(100) NOT NULL,
    father_name VARCHAR(100),
    mobile VARCHAR(15) NOT NULL,
    state VARCHAR(50),
    district VARCHAR(50),
    village VARCHAR(100),
    pincode VARCHAR(10),
    farm_size_acres NUMERIC(5,2),
    crops JSONB,
    aadhaar_no VARCHAR(12),
    bank_account VARCHAR(50),
    bank_ifsc VARCHAR(20),
    fpo_member BOOLEAN DEFAULT false,
    fpo_name VARCHAR(150),
    fpo_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS family_buyers (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(100),
    family_size VARCHAR(20),
    address TEXT,
    city VARCHAR(50),
    pincode VARCHAR(10),
    weekly_opt_in BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS business_buyers (
    id SERIAL PRIMARY KEY,
    business_name VARCHAR(150) NOT NULL,
    business_type VARCHAR(50),
    contact_person VARCHAR(100),
    phone VARCHAR(15) NOT NULL,
    gstin VARCHAR(20),
    daily_requirement VARCHAR(50),
    delivery_slot VARCHAR(50),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
