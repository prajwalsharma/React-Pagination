import axios from "axios";
import { Component } from "react";
import "./styles.css";
import Paginate from "./Paginate";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: null,
      loading: false,
      error: null,
      pageCount: 0,
      currentPage: 0
    };
  }

  // Fetch data on initial page load
  componentDidMount() {
    this.fetchPokemonsFromApi(0);
  }

  // API call to fetch data
  fetchPokemonsFromApi = (offset) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=6&offset=${offset * 6}`)
      .then((response) => {
        this.setState({
          pokemons: response.data.results,
          pageCount: Math.ceil(response.data.count / 6),
          loading: false
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.message
        });
      });
  };

  // Call API when click on any page
  handlePageClick = (data) => {
    this.setState(
      {
        currentPage: data.selected,
        loading: true,
        pokemons: null
      },
      () => {
        setTimeout(() => {
          this.fetchPokemonsFromApi(this.state.currentPage);
          console.log(this.state.currentPage);
        }, 3000);
      }
    );
  };

  // Set the selected page to first page
  handleFirstPageClick = () => {
    console.log("Clicked");
    this.setState(
      {
        currentPage: 0,
        loading: true,
        pokemons: null
      },
      () => {
        setTimeout(() => {
          this.fetchPokemonsFromApi(this.state.currentPage);
          console.log(this.state.currentPage);
        }, 3000);
      }
    );
  };

  // Set the selected page to last page
  handleLastPageClick = () => {
    console.log("Clicked");
    this.setState(
      {
        currentPage: this.state.pageCount - 1,
        loading: true,
        pokemons: null
      },
      () => {
        setTimeout(() => {
          this.fetchPokemonsFromApi(this.state.currentPage);
          console.log(this.state.currentPage);
        }, 3000);
      }
    );
  };

  render() {
    return (
      <div className="App">
        <h1>React Pagination</h1>
        <div className="pokemon-container">
          {this.state.loading && <div class="loader"></div>}
          {this.state.error && <div>{this.state.error}</div>}
          {this.state.pokemons &&
            this.state.pokemons.map((pokemon, index) => {
              return (
                <div className="pokemon" key={index}>
                  {pokemon.name}
                </div>
              );
            })}
        </div>
        <Paginate
          pageCount={this.state.pageCount}
          currentPage={this.state.currentPage}
          loading={this.state.loading}
          handlePageClick={this.handlePageClick}
          handleFirstPageClick={this.handleFirstPageClick}
          handleLastPageClick={this.handleLastPageClick}
        />
      </div>
    );
  }
}

export default App;
