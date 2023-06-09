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

# создание таблицы
cur.execute('''CREATE TABLE IF NOT EXISTS legal (
                    inn          varchar(12) NOT NULL UNIQUE,
                    date_update  date        NOT NULL,
                    card         jsonb,
                    history      jsonb,
                    non_validate varchar(50),
                    date_upload  varchar(10)
                )''')

# создание индексов
cur.execute('CREATE INDEX date_upload_index ON legal (date_upload)')
cur.execute('CREATE INDEX date_update_index ON legal (date_update)')

# коммит изменений в базе данных
conn.commit()

# импорт данных из json файлов
json_files_dir = r'fls/'
for filename in os.listdir(json_files_dir):
    if filename.endswith('.json'):
        with open(json_files_dir + filename, "r", encoding='utf-8' ) as f:
            data = f.read()
            # проверяем, что файл не пустой
            if data:
                json_data = json.loads(data)
                inn = json_data.get("inn")
                date_update = json_data.get("date_update")
                card = Json(json_data.get("card"))
                history = Json(json_data.get("history"))
                non_validate = json_data.get("non_validate")
                date_upload = json_data.get("date_upload")

                # импортируем данные в таблицу
                cur.execute(
                    "INSERT INTO legal (inn, date_update, card, history, non_validate, date_upload) VALUES (%s, %s, %s, %s, %s, %s)",
                    (inn, date_update, card, history, non_validate, date_upload)
                )
                # коммит изменений в базе данных
                conn.commit()
# закрытие курсора и соединения с базой данных
cur.close()
conn.close()