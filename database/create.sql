-- DROP DATABASE resume

DROP DATABASE IF EXISTS "resume";

-- CREATE DATABASE resume

CREATE DATABASE "resume"
  WITH OWNER = 'akuma'
  ENCODING = 'UTF8'
  LC_COLLATE = 'en_US.UTF-8'
  LC_CTYPE = 'en_US.UTF-8'
  CONNECTION LIMIT = -1;
COMMENT ON DATABASE "potg" IS 'Database for Resume360 Global Profiler';

-- Connect to the 'resume' database
\c resume;

CREATE SCHEMA IF NOT EXISTS "sgp" AUTHORIZATION 'akuma';

-- resume user table
CREATE TABLE "sgp"."users" (
  "uaid" SERIAL PRIMARY KEY,
  "email" VARCHAR(255) UNIQUE NOT NULL
);

-- Add comments to the table and columns
COMMENT ON TABLE "sgp"."users" IS 'User table of resume';
COMMENT ON COLUMN "sgp"."users"."uaid" IS 'primary key';
COMMENT ON COLUMN "sgp"."users"."email" IS 'user email address';

-- Set the owner of the "users" table to 'akuma'
ALTER TABLE "sgp"."users" OWNER TO akuma;
