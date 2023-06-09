import psycopg2
from psycopg2.extras import Json
import json
import os
import datetime

# Параметры подключения к базе данных
DB_NAME = "postgres"
DB_USER = "postgres"
DB_PASSWORD = "root"
DB_HOST = "localhost"
DB_PORT = "5432"

# подключение к базе данных
conn = psycopg2.connect(database=DB_NAME, user=DB_USER, password=DB_PASSWORD, host=DB_HOST, port=DB_PORT)
# открытие курсора
cur = conn.cursor()

# закрытие курсора и соединения с базой данных
#insert_query1 = "select 'количество данных', count(*)from legal"
#insert_query2 = "select 'последнее обновление', date_update from legal WHERE date_update=(SELECT MAX(date_update) FROM legal)"
with open ("tst.txt", "w") as file1:
    cur.execute('''select 'total records', count(*)from legal''')
    result1 = cur.fetchall()
    insert_query1 = str(result1[0][0])+'\t'+str(result1[0][1])
    cur.execute('''select 'last update', date_update from legal WHERE date_update=(SELECT MAX(date_update) FROM legal)''')
    result2 = cur.fetchall()
    insert_query2 = str(result2[0][0])+'\t'+str(result2[0][1])
    file1.writelines([insert_query1,'\n', insert_query2])
    file1.close()
cur.close()
conn.close()