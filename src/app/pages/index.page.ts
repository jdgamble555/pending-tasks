import { AsyncPipe } from '@angular/common';
import { Component, ExperimentalPendingTasks, inject, isDevMode } from '@angular/core';
import { REQUEST } from '@lib/request.token';
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
  
  protected readonly request = inject(REQUEST);

  data = this.getData();

  // fetch data, will only run on server
  private async _getData() {
    const schema = isDevMode() ? 'http://' : 'https://';
    const host = this.request.headers.host;
    const url = schema + host + '/api/hello';
    const r = await fetch(url, {
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
