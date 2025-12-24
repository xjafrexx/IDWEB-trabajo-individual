from flask import Flask, render_template, request, redirect, url_for
import sqlite3
import os

# Configuración básica de Flask
app = Flask(__name__)
DB_NAME = "valorant_fan.db"

# Función para iniciar la base de datos
def init_db():
    try:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS mensajes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                email TEXT NOT NULL,
                mensaje TEXT NOT NULL,
                fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        conn.commit()
        conn.close()
        print("Base de datos lista.")
    except Exception as e:
        print(f"Error DB: {e}")

init_db()

# --- Rutas de las páginas (archivos en carpeta templates) ---

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/index.html')
def home():
    return render_template('index.html')

@app.route('/agentes.html')
def agentes():
    return render_template('agentes.html')

@app.route('/armas.html')
def armas():
    return render_template('armas.html')

@app.route('/contacto.html')
def contacto():
    return render_template('contacto.html')

@app.route('/registro.html')
def registro():
    return render_template('registro.html')

# --- Ruta para recibir el formulario ---
@app.route('/enviar-mensaje', methods=['POST'])
def enviar_mensaje():
    if request.method == 'POST':
        try:
            nombre = request.form['nombre']
            email = request.form['email']
            mensaje = request.form['mensaje']

            conn = sqlite3.connect(DB_NAME)
            cursor = conn.cursor()
            cursor.execute("INSERT INTO mensajes (nombre, email, mensaje) VALUES (?, ?, ?)", 
                           (nombre, email, mensaje))
            conn.commit()
            conn.close()
            
            return redirect(url_for('contacto'))
        except:
            return "Error al guardar mensaje"

# Configuración para Render
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)