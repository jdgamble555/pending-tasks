import { AsyncPipe } from '@angular/common';
import { Component, ExperimentalPendingTasks, inject, InjectionToken, isDevMode } from '@angular/core';
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
  
  private request = inject(REQUEST, {
    optional: true,
  });

  data = this.getData();

  // fetch data
  private async _getData() {
    const host = this.request?.headers.referer;
    const url = host || '/';
    const r = await fetch(url + 'api/hello', {
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
