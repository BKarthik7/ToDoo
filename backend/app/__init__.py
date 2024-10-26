from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from .config import Config

# Initialize extensions
db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    
    # Register Blueprints
    from .routes.auth import auth_bp
    from .routes.todos import todos_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(todos_bp, url_prefix='/todos')
    
    return app
