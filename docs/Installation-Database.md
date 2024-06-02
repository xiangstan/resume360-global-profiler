# Database Installation Guide

## Install PostgreSQL

```bash
sudo dnf install postgresql-server
sudo postgresql-setup --initdb
sudo systemctl status postgresql
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## Check PostgreSQL version

```bash
postgres --version
```

## Create Application Database User

Once log in postgres DBMS with `sudo -u postgresql psql`, type:

```psql
create user akuma with encrypted password '<password>';
```
Setup the password from the [backend](Installation-Backend.md) setup guilde.

## Update PostgreSQL Configuration file

```bash
sudo nano /var/lib/pgsql/data/pg_hba.conf
```

1. Replace all **`ident`** with **`md5`** under the **`METHOD`** column
1. Append the following line to the bottom of the config file.
   ```
   local   all             akuma                                   md5
   ```

## Reload PostgreSQL

```bash
sudo systemctl reload postgresql
```

## Create Database

Login database with the postgres account

```bash
sudo -u postgres psql
```

Create a new database

```psql
DROP DATABASE IF EXISTS "resume";
CREATE DATABASE "resume"
  WITH OWNER = 'akuma'
  ENCODING = 'UTF8'
  LC_COLLATE = 'en_US.UTF-8'
  LC_CTYPE = 'en_US.UTF-8'
  CONNECTION LIMIT = -1;
COMMENT ON DATABASE "potg" IS 'Database for Resume360 Global Profiler';
```

## Load Database

Navigate to `/database` directory.

```bash
psql -h localhost -U akuma -d resume -f create.sql
```