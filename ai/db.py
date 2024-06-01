# db_utils.py

import psycopg2

def connect_to_postgresql(host, database, user, password):
  try:
    connection = psycopg2.connect(
      host=host,
      database=database,
      user=user,
      password=password
    )
    return connection
  except Exception as e:
    print(f"Error: {e}")
    return None

def select_query(connection, query, input) :
  cursor = connection.cursor()
  cursor.execute(query, (input))
  # Retrieve and print the data
  rows = cursor.fetchall()
  return rows