from . import create_app, db
from .models import User, ToDo  # Import models for migration recognition

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Ensure tables are created
    app.run(debug=True)
