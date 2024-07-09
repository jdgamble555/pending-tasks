import { AsyncPipe } from '@angular/common';
import { Component, ExperimentalPendingTasks, inject } from '@angular/core';
import { useAsyncTransferState } from '@lib/utils';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div>
      <p class="font-bold">{{ data | async }}</p>
    </div>
  `
})
export default class HomeComponent {

  private pendingTasks = inject(ExperimentalPendingTasks);

  data = this.getData();

  // fetch data
  private async _getData() {
    const r = await fetch('http://localhost:5173/api/hello', {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const x = await r.json();
    return x.message;
  }

  // fetch data with pending task and transfer state
  async getData() {
    const taskCleanup = this.pendingTasks.add();
    const r = await useAsyncTransferState('pending', async () => await this._getData());
    taskCleanup();
    return r;
  }

}
