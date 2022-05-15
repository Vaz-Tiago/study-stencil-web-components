import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'vaz-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true,
})
export class SideDrawer {
  @Prop({ reflect: true }) titleMenu: string;
  @Prop({ reflect: true, mutable: true }) open: boolean;

  onCloseDrawer() {
    this.open = false;
  }

  render() {
    return (
      <aside>
        <header>
          <h1>{this.titleMenu}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
        </header>
        <main>
          <slot />
        </main>
      </aside>
    );
  }
}
