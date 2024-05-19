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

CREATE SCHEMA IF NOT EXISTS "sgp" AUTHORIZATION akuma;

-- User table
CREATE TABLE "sgp"."users" (
  "uaid" SERIAL PRIMARY KEY,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "name" VARCHAR(255) DEFAULT NULL,
  "published" BOOLEAN NOT NULL DEFAULT false
);
-- Add comments to the table and columns
COMMENT ON TABLE "sgp"."users" IS 'User table of resume';
COMMENT ON COLUMN "sgp"."users"."uaid" IS 'primary key';
COMMENT ON COLUMN "sgp"."users"."email" IS 'user email address';

-- Set the owner of the "users" table to 'akuma'
ALTER TABLE "sgp"."users" OWNER TO akuma;

-- Jobs table
CREATE TABLE "sgp"."jobs" (
  "uaid" INT CHECK ("uaid" >= 0) NOT NULL,
  "title" VARCHAR(128) NOT NULL,
  "company" VARCHAR(255) NOT NULL,
  "experience" TEXT NOT NULL,
  "start" DATE NOT NULL,
  "end" DATE DEFAULT NULL,
  PRIMARY KEY ("uaid", "title", "start"),
  FOREIGN KEY ("uaid") REFERENCES "sgp"."users" ("uaid") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Add comments to the table and columns
COMMENT ON TABLE "sgp"."jobs" IS 'Experiences table of resume';
COMMENT ON COLUMN "sgp"."jobs"."uaid" IS 'Primary key, foreign key with "sgp"."users"';
COMMENT ON COLUMN "sgp"."jobs"."title" IS 'Job title';
COMMENT ON COLUMN "sgp"."jobs"."company" IS 'Company where the experience is gained';
COMMENT ON COLUMN "sgp"."jobs"."title" IS 'Experiences from the job record';
COMMENT ON COLUMN "sgp"."jobs"."start" IS 'The starting date of selected experience record';
COMMENT ON COLUMN "sgp"."jobs"."end" IS 'The end date of selected experience record. When the end date is null, it is the current experience';

-- Set the owner of the "jobs" table to 'akuma'
ALTER TABLE "sgp"."jobs" OWNER TO akuma;

-- Education table
CREATE TABLE "sgp"."education" (
  "uaid" INT CHECK ("uaid" >= 0) NOT NULL,
  "degree" VARCHAR(128) NOT NULL,
  "school" VARCHAR(255) NOT NULL,
  "achievement" TEXT NOT NULL,
  "start" DATE NOT NULL,
  "end" DATE DEFAULT NULL,
  PRIMARY KEY ("uaid", "degree", "start"),
  FOREIGN KEY ("uaid") REFERENCES "sgp"."users" ("uaid") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Add comments to the table and columns
COMMENT ON TABLE "sgp"."education" IS 'Experiences table of resume';
COMMENT ON COLUMN "sgp"."education"."uaid" IS 'Primary key, foreign key with "sgp"."users"';
COMMENT ON COLUMN "sgp"."education"."degree" IS 'academic degree';
COMMENT ON COLUMN "sgp"."education"."school" IS 'school attended to';
COMMENT ON COLUMN "sgp"."education"."achievement" IS 'achievement earned from the education';
COMMENT ON COLUMN "sgp"."education"."start" IS 'The starting year of selected education record';
COMMENT ON COLUMN "sgp"."education"."end" IS 'The end year of selected education record. When the end date is null means current in the degree program';

-- Set the owner of the "education" table to 'akuma'
ALTER TABLE "sgp"."education" OWNER TO akuma;