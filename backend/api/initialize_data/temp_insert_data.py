import psycopg2, os
def psycopg2_insert_data():
    sql_file = open('insert_data.sql', 'r')
    connection = psycopg2.connect(host=os.environ['CONNECTION'], database=os.enviiron['USER'], password=os.environ['PASSWORD'])
    cursor = connection.cursor()
    cursor.execute(sql_file.read())
    connection.commit()
    connection.close()