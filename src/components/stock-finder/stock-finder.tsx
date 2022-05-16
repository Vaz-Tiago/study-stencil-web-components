import { Component, Event, EventEmitter, h, State } from '@stencil/core';

@Component({
  tag: 'vaz-stock-finder',
  styleUrl: './stock-finder.css',
  shadow: true,
})
export class StockFinder {
  stockNameInput: HTMLInputElement;

  @State() searchResults: { symbol: string; name: string }[] = [];
  @State() loading = false;

  @Event({ bubbles: true, composed: true }) vazSymbolSelect: EventEmitter<string>;

  async onFindStock(event: Event) {
    event.preventDefault();
    this.loading = true;
    const stockName = this.stockNameInput?.value;
    try {
      const apiResponse = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${process.env.AV_TOKEN}`);
      const res = await apiResponse.json();
      this.searchResults = res.bestMatches?.map(item => ({
        name: item['2. name'],
        symbol: item['1. symbol'],
      }));
    } catch (err) {
      console.error('API ERROR: ', err);
    } finally {
      this.loading = false;
    }
  }

  onSelectSymbol(symbol: string) {
    this.vazSymbolSelect.emit(symbol);
  }

  render() {
    let content = (
      <ul>
        {this.searchResults.map((item, index) => (
          <li key={`search-${index}`} onClick={this.onSelectSymbol.bind(this, item.symbol)}>
            <strong>{item.symbol}</strong> - {item.name}
          </li>
        ))}
      </ul>
    );
    if (this.loading) content = <vaz-spinner />;
    return [
      <form onSubmit={this.onFindStock.bind(this)}>
        <input id="stock-symbol" ref={el => (this.stockNameInput = el)} />
        <button type="submit">Find!</button>
      </form>,
      <div>{content}</div>,
    ];
  }
}
