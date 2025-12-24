from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import sqlite3
import os

# Configuración básica de Flask
app = Flask(__name__)

uri = os.getenv("DATABASE_URL")

if uri and uri.startswith("postgres://"):
  uri = uri.replace("postgres://", "postgresql://", 1)

app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Mensaje(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  nombre = db.Column(db.String(100), nullable=False)
  email = db.Column(db.String(100), nullable=False)
  mensaje = db.Column(db.Text, nullable=False)

if not uri:
  raise RuntimeError("DATABASE_URL no está configurada en variables de entorno.")

try:
  with app.app_context():
    db.create_all()
    print("Tablas listas (create_all).")
except Exception as e:
  print("Error creando tablas:", e)
  raise

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
        nombre = request.form['nombre']
        email = request.form['email']
        mensaje = request.form['mensaje']

        nuevo_mensaje = Mensaje(
            nombre=nombre,
            email=email,
            mensaje=mensaje
        )

        try:
            db.session.add(nuevo_mensaje)
            db.session.commit()
            return redirect(url_for('contacto'))
        except Exception as e:
            db.session.rollback()
            return f"Ocurrió un error al enviar el mensaje: {e}"

# Configuración para Render
if __name__ == '__main__':
    app.run(debug=True)