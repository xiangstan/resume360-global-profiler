import sys
import os
from os.path import join, dirname
from db import connect_to_postgresql
from gpt4all import GPT4All
from dotenv import load_dotenv
dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

if __name__ == "__main__":
  if len(sys.argv) >= 1:
  #   db_user = sys.argv[1]
  #   db_pass = sys.argv[2]
  #   db_host = sys.argv[3]
  #   db_name = sys.argv[4]
    user_id = sys.argv[1]

  db_user = os.environ.get("DB_USER")
  db_pass = os.environ.get("DB_PASSWD")
  db_host = os.environ.get("DB_HOST")
  db_name = os.environ.get("DB_NAME")

  db_connection = connect_to_postgresql(
    host=db_host,
    database=db_name,
    user=db_user,
    password=db_pass
  )

  # Define the SELECT query
  select_query = 'SELECT "experience" FROM "sgp"."jobs" WHERE "uaid"=%s;'

  # Execute the query
  cursor = db_connection.cursor()
  cursor.execute(select_query, (user_id))

  # Retrieve and print the data
  rows = cursor.fetchall()
  jobs = 'Working experiences: '
  for row in rows:
    jobs += ''.join(row)

  select_query = 'SELECT "degree", "achievement" FROM "sgp"."education" WHERE "uaid"=%s;'

  # Execute the query
  cursor = db_connection.cursor()
  cursor.execute(select_query, (user_id))

  # Retrieve and print the data
  rows = cursor.fetchall()
  school = 'School: '
  for row in rows:
    school += ''.join(row)

  # data = jobs + school
  # print(data)

  # The model to be used
  model = GPT4All(model_name='nous-hermes-llama2-13b.Q4_0.gguf')

  # This is the abstract prompt
  contents = "Below is a resume for applying Computer Science job, **analyzes key skills (less than 20) in one line, just key words, no rstrip and dash symbols**\n\n";

  # The resume content
  contents += jobs + school

  f = open("text.txt", "a")
  f.write(contents)
  f.close()

  #Generate the response
  with model.chat_session():
    response1 = model.generate(prompt=contents, temp=0)
    result=str(model.current_chat_session).split('{')[-1].split('}')[0]
    #print(result[42:-2])
    result=result.split("content': ' ",1)[1]
    #result=result.split(r"kills: \n",1)[1]
    #print(result[:-2])  
    result = result[:-2].replace("-","")
    #result = result.replace(r"Key skills: \n", "")
    result = result.replace(r"\n",", ")
    result = result.replace("and", ", ")
    result = result.strip()

    select_query = 'UPDATE "sgp"."users" SET "abstract"=%s WHERE "uaid"=%s;'

    # Execute the query
    cursor = db_connection.cursor()
    cursor.execute(select_query, (result, user_id))
    db_connection.commit()

    print(result)

  # Perform database operations using db_connection
  # ...

  # Close the connection when done
  if db_connection:
    db_connection.close()
