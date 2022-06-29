import { AfterViewInit, Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-ad-sense',
  template: `
    <div>
      <ins
        class="adsbygoogle"
        style="display:block; text-align:center;"
        data-ad-client="ca-pub-3268038834671616"
        data-ad-slot="7919791114"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
    <br />
  `,
  styles: [],
})
export class AdSenseComponent implements AfterViewInit {
  constructor() {}
  ngAfterViewInit() {
/*     try {
      (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
    } catch (e) {
      console.error('error');
    } */
    setTimeout(() => {
      try {
        (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
      } catch (e) {
        console.error('error');
      }
    }, 2000);
  }
}
