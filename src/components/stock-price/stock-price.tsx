import { Component, Element, h, Listen, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'vaz-stock-price',
  styleUrl: './stock-price.css',
  shadow: true,
})
export class StockPrice {
  stockInput: HTMLInputElement;

  @Element() el: HTMLElement;

  @State() fetchedPrice: number;
  @State() stockUserInput: string;
  @State() stockInputValid = false;
  @State() error: string;
  @State() loading: boolean;

  @Prop({ mutable: true, reflect: true }) stockSymbol: string;

  @Watch('stockSymbol')
  async onStockSymbolChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue;
      await this.fetchStockPrice(newValue);
    }
  }

  onStockUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value;
    this.stockInputValid = this.stockUserInput.trim() !== '';
  }

  async onFetchStockPrice(event: Event) {
    event.preventDefault();
    this.stockSymbol = this.stockInput.value;
  }

  componentWillLoad() {
    if (this.stockSymbol) {
      this.stockInputValid = true;
      this.stockUserInput = this.stockSymbol;
      this.fetchStockPrice(this.stockSymbol);
    }
  }

  async fetchStockPrice(stockSymbol: string) {
    this.loading = true;
    try {
      const apiResponse = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${process.env.AV_TOKEN}`);
      const parsedRes = await apiResponse.json();
      if (!parsedRes['Global Quote']['05. price']) throw new Error('Invalid stock symbol');
      this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
      this.error = null;
    } catch (err) {
      this.fetchedPrice = null;
      this.error = err.message;
    }
    this.loading = false;
  }

  @Listen('vazSymbolSelect', { target: 'body' })
  onStockSymbolSelected(event: CustomEvent) {
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
    }
  }

  hostData() {
    return {
      class: this.error ? 'error' : '',
    };
  }

  render() {
    let dataContent = <p>Pleas enter a symbol</p>;
    if (this.error) dataContent = <p>{this.error}</p>;
    if (this.fetchedPrice) dataContent = <p>Price: ${this.fetchedPrice}</p>;
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input id="stock-symbol" ref={el => (this.stockInput = el)} value={this.stockUserInput} onInput={this.onStockUserInput.bind(this)} />
        <button type="submit" disabled={!this.stockInputValid || this.loading}>
          Fetch
        </button>
      </form>,
      <div>{this.loading ? <p>Fetching Data...</p> : dataContent}</div>,
    ];
  }
}
