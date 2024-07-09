import { AsyncPipe } from '@angular/common';
import { Component, ExperimentalPendingTasks, inject, isDevMode } from '@angular/core';
import { useAsyncTransferState } from '@lib/utils';

import { REQUEST } from '@lib/request.token';


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
  
  protected readonly request = inject(REQUEST, {
    optional: true,
  });

  // fetch data
  private async _getData() {
    const host = this.request?.get('host');
    console.log(host);
    const url = isDevMode() ? 'http://localhost:5173' : 'https://pending-tasks.vercel.app/';
    const r = await fetch(url + '/api/hello', {
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
