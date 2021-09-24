import axios from "axios";
import { Component } from "react";
import "./styles.css";
import ReactPaginate from "react-paginate";

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

  // Fetch data on page load
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
          {this.state.pokemons &&
            this.state.pokemons.map((pokemon, index) => {
              return (
                <div className="pokemon" key={index}>
                  {pokemon.name}
                </div>
              );
            })}
        </div>
        <div className="pagination-container">
          <li onClick={this.handleFirstPageClick} className="previousClassName">
            {"<<"}
          </li>
          <ReactPaginate
            previousLabel={"← Previous"}
            pageRangeDisplayed="1"
            marginPagesDisplayed="2"
            nextLabel={"Next →"}
            pageCount={this.state.pageCount}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            previousClassName={`previousClassName ${
              this.state.loading && "disableButtonClick"
            } `}
            previousLinkClassName={`previousClassName ${
              this.state.loading && "disableButtonClick2"
            } `}
            nextClassName={`nextClassName ${
              this.state.loading && "disableButtonClick"
            } `}
            nextLinkClassName={`nextClassName ${
              this.state.loading && "disableButtonClick2"
            } `}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination_link_active"}
            pageClassName={"paginationPage"}
            forcePage={this.state.currentPage}
          />
          <li onClick={this.handleLastPageClick} className="nextClassName">
            {">>"}
          </li>
        </div>
      </div>
    );
  }
}

export default App;
