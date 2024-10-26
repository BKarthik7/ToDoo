from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import db, ToDo, User
from ..utils.validators import validate_todo

todos_bp = Blueprint('todos', __name__)

@todos_bp.route('/', methods=['POST'])
@jwt_required()
def add_todo():
    user_id = get_jwt_identity()
    data = request.get_json()
    if not validate_todo(data):
        return jsonify({"msg": "Invalid data"}), 400
    
    new_todo = ToDo(title=data['title'], description=data.get('description'), user_id=user_id)
    db.session.add(new_todo)
    db.session.commit()
    return jsonify({"msg": "ToDo added successfully"}), 201

@todos_bp.route('/', methods=['GET'])
@jwt_required()
def get_todos():
    user_id = get_jwt_identity()
    todos = ToDo.query.filter_by(user_id=user_id).all()
    return jsonify([{"id": todo.id, "title": todo.title, "description": todo.description} for todo in todos]), 200

@todos_bp.route('/<int:todo_id>', methods=['PUT'])
@jwt_required()
def update_todo(todo_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    
    todo = ToDo.query.filter_by(id=todo_id, user_id=user_id).first()
    if not todo:
        return jsonify({"msg": "ToDo not found"}), 404
    
    todo.title = data.get('title', todo.title)
    todo.description = data.get('description', todo.description)
    db.session.commit()
    
    return jsonify({"msg": "ToDo updated successfully"}), 200

@todos_bp.route('/<int:todo_id>', methods=['DELETE'])
@jwt_required()
def delete_todo(todo_id):
    user_id = get_jwt_identity()
    
    todo = ToDo.query.filter_by(id=todo_id, user_id=user_id).first()
    if not todo:
        return jsonify({"msg": "ToDo not found"}), 404
    
    db.session.delete(todo)
    db.session.commit()
    return jsonify({"msg": "ToDo deleted successfully"}), 200
