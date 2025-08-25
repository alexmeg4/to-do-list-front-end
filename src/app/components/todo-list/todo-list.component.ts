import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: any[] = [];
  title: string = '';
  completed: boolean = false;
  draggedTodo: any = null;


  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    debugger;
    this.todoService.fetchTodos().subscribe((data: any[]) => {
      this.todos = data;
    });
  }

  handleAddTodo(): void {
    if (this.title.trim()) {
      this.todoService.addTodo({ title: this.title, completed: false }).subscribe((addedTodo) => {
        this.todos.push(addedTodo);
        this.title = '';
      });
    }
  }

  handleUpdateTodo(id: string, updates: any): void {
    this.todoService.updateTodo(id, updates).subscribe((updatedTodo) => {
      this.todos = this.todos.map(todo => (todo._id === id ? updatedTodo : todo));
    });
  }

  handleDeleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter(todo => todo._id !== id);
    });
  }

  todosTodo() {
    return this.todos?.filter(t => t.status === 'todo') || [];
  }

  todosInProgress() {
    return this.todos?.filter(t => t.status === 'in-progress') || [];
  }

  todosDone() {
    return this.todos?.filter(t => t.status === 'done') || [];
  }

  onDragStart(event: DragEvent, todo: any) {
    this.draggedTodo = todo;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, newStatus: string) {
    event.preventDefault();
    if (this.draggedTodo && this.draggedTodo.status !== newStatus) {
      this.handleUpdateTodo(this.draggedTodo._id, { status: newStatus });
      this.draggedTodo = null;
    }
  }
}