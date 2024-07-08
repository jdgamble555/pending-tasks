import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ɵPendingTasks as PendingTasks } from '@angular/core'


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div>
      <p>testing 123 - {{ data | async }}</p>
    </div>
  `
})
export default class HomeComponent {

  data = this.getData();
  private tasks = inject(PendingTasks);

  async getData() {
    const myTask = this.tasks.add();
    const r = await fetch('http://localhost:5173/api/hello', {
      headers: {
        'Content-Type': 'application/json',
      },

    });
    const x = await r.json();
    this.tasks.remove(myTask);
    return x.message;
  }

}
