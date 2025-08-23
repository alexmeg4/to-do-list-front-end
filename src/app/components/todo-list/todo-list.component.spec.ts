import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from '../../services/todo.service';
import { of } from 'rxjs';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    const todoServiceMock = {
      fetchTodos: jasmine.createSpy('fetchTodos').and.returnValue(of([])),
      addTodo: jasmine.createSpy('addTodo').and.returnValue(of({})),
      updateTodo: jasmine.createSpy('updateTodo').and.returnValue(of({})),
      deleteTodo: jasmine.createSpy('deleteTodo').and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      declarations: [ TodoListComponent ],
      providers: [
        { provide: TodoService, useValue: todoServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos on init', () => {
    component.ngOnInit();
    expect(todoService.fetchTodos).toHaveBeenCalled();
  });

  it('should add a new todo', () => {
    component.newTodo = 'Test Todo';
    component.handleAddTodo();
    expect(todoService.addTodo).toHaveBeenCalledWith({ title: 'Test Todo' });
  });

  it('should update a todo', () => {
    const todoId = '1';
    const updates = { completed: true };
    component.handleUpdateTodo(todoId, updates);
    expect(todoService.updateTodo).toHaveBeenCalledWith(todoId, updates);
  });

  it('should delete a todo', () => {
    const todoId = '1';
    component.handleDeleteTodo(todoId);
    expect(todoService.deleteTodo).toHaveBeenCalledWith(todoId);
  });
});