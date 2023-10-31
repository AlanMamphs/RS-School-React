import { Component, ReactNode, ChangeEventHandler } from 'react';
import './App.css';
import Search from './components/Search';
import Container from './components/Container';
import Card from './components/Card';
import BuggyComponent from './components/BuggyComponent';

class App extends Component {
  state: {
    showBuggyComponent: boolean;
    searchTerm: string;
    loading: boolean;
    error?: string;
    searchResult: {
      products: {
        product_name: string;
        id: string;
        image_front_url: string;
        brands: string;
        categories: string;
      }[];
    } | null;
  } = {
    searchTerm: localStorage.getItem('search-term') ?? '',
    searchResult: null,
    showBuggyComponent: false,
    loading: false,
  };

  handleSearch = async () => {
    const { searchTerm } = this.state;
    let url =
      'https://world.openfoodfacts.org/cgi/search.pl?search_simple=1&action=process&json=1';
    if (searchTerm) {
      url += `&search_terms=${searchTerm}`;
    }
    this.setState({ loading: true });

    try {
      const response = await fetch(url);
      const searchResult = await response.json();
      this.setState({ searchResult });
    } catch (e) {
      this.setState({ error: (e as Error).message });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearchChange: ChangeEventHandler<HTMLInputElement> = (input) => {
    this.setState({ searchTerm: input.target.value });
    localStorage.setItem('search-term', input.target.value);
  };

  componentDidMount() {
    this.handleSearch();
  }

  render(): ReactNode {
    return (
      <div id="app">
        <button
          onClick={() => {
            this.setState({ showBuggyComponent: true });
          }}
        >
          Test error boundary
        </button>
        <Search
          value={this.state.searchTerm}
          onChange={this.handleSearchChange}
          onSearchClick={this.handleSearch}
        />
        {this.state.loading && <div>Loading...</div>}
        {this.state.error && <div>{this.state.error}</div>}
        <Container>
          {!this.state.loading &&
            !this.state.error &&
            this.state.searchResult?.products?.map((product) => (
              <Card
                key={product.id}
                header={product.product_name}
                image={product.image_front_url}
                brands={product.brands}
              />
            ))}
          {(this.state.searchResult?.products?.length ?? 0) === 0 &&
            !this.state.loading && <div>No results</div>}
        </Container>
        {this.state.showBuggyComponent && <BuggyComponent />}
      </div>
    );
  }
}

export default App;
