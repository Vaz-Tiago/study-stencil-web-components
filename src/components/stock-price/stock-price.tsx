import { Component, Element, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'vaz-stock-price',
  styleUrl: './stock-price.css',
  shadow: true,
})
export class StockPrice {
  stockInput: HTMLInputElement;

  @Element() el: HTMLElement;

  @Prop() stockSymbol: string;

  @State() fetchedPrice: number;
  @State() stockUserInput: string;
  @State() stockInputValid = false;
  @State() error: string;
  @State() loading: boolean;

  onStockUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value;
    this.stockInputValid = this.stockUserInput.trim() !== '';
  }

  async onFetchStockPrice(event: Event) {
    event.preventDefault();
    // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement)?.value;
    const stockSymbol = this.stockInput.value;
    await this.fetchStockPrice(stockSymbol);
  }

  async componentDidLoad() {
    if (this.stockSymbol) {
      this.stockInputValid = true;
      this.stockUserInput = this.stockSymbol;
      await this.fetchStockPrice(this.stockSymbol);
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

  render() {
    let dataContent = <p>Pleas enter a symbol</p>;
    if (this.error) dataContent = <p>{this.error}</p>;
    if (this.fetchedPrice) dataContent = <p>Price: ${this.fetchedPrice}</p>;
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input id="stock-symbol" ref={el => (this.stockInput = el)} value={this.stockUserInput} onInput={this.onStockUserInput.bind(this)} />
        <button type="submit" disabled={!this.stockInputValid}>
          Fetch
        </button>
      </form>,
      <div>{this.loading ? <p>Fetching Data...</p> : dataContent}</div>,
    ];
  }
}
