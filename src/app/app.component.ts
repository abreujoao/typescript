import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarefa } from './model/tarefa';

// configuracao do componente ANGULAR
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  public title = 'Lista de tarefas';
  public listaTarefas: Tarefa[] = [];
  public form : FormGroup;
  
  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({tarefa: ['', Validators.compose([
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.required

    ])]});

    this.load();
  }


  remove(item: Tarefa) {
    const indexItem = this.listaTarefas.indexOf(item);

    if (indexItem !== -1) {
      this.listaTarefas.splice(indexItem, 1);
    }
    this.save();
  }

  markAsDone(item: Tarefa) {
    item.done = true;
    this.save();
  }


  markAsUndone(item: Tarefa) {
    item.done = false;
    this.save();
  }

  adicionarTarefaNaLista(){
    const novaTarefa = this.form.controls['tarefa'].value;
    const contador = this.listaTarefas.length + 1;
    this.listaTarefas.push(new Tarefa(contador, novaTarefa, false));
    this.save();
  }

  save(){
    const data = JSON.stringify(this.listaTarefas);
    localStorage.setItem('tarefas', data)
  }

  load(){
    this.listaTarefas = JSON.parse(localStorage.getItem('tarefas') || '[]')
  }

}
