import { Component, h, Method, Prop } from '@stencil/core';

@Component({
  tag: 'vaz-tooltip',
  styleUrl: './tooltip.css',
  shadow: true,
})
export class Tooltip {
  @Prop({ mutable: true, reflect: true }) opened = false;
  @Prop({ reflect: true }) text: string;

  @Method()
  async toggle() {
    this.opened = !this.opened;
  }

  render() {
    return (
      <span id="container">
        <button id="icon" onClick={this.toggle.bind(this)}>
          ?
        </button>
        <span id="content">{this.text}</span>
      </span>
    );
  }
}
