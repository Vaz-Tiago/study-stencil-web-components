import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'vaz-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true,
})
export class SideDrawer {
  @Prop({ reflect: true }) titleMenu: string;

  render() {
    return (
      <aside>
        <header>
          <h1>{this.titleMenu}</h1>
        </header>
        <main>
          <slot />
        </main>
      </aside>
    );
  }
}
