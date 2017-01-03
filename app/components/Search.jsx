import React from 'react';
import TextField from 'material-ui/TextField';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import Axios from 'axios';
import { Pagination,Image } from 'react-bootstrap';


export default class Search extends React.Component{
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }
  constructor(props) {
    super(props);
    this.callApi = this.callApi.bind(this);
    this.state = {
      search: false,
      value: '',
      movies: null,
      items: 0,
      activePage: 1,
      activeMovie: null
    };
  }

  handleChange(event){
    this.setState({
      value: event.target.value,
    });
  }

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey,
      activeMovie: this.state.movies[this.state.activePage-1],
    });
  }

  callApi(){
    Axios.get('http://www.omdbapi.com/?s=' + this.state.value + '')
         .then((result) => {
           let movieList = result['data']['Search'];
           this.setState({
             search: true,
             movies: movieList,
             items : movieList.length,
             activeMovie: movieList[this.state.activePage-1],
           });
         })
  }

  render() {
    let isSearch = this.state.search;
    let content = null;
    if(isSearch){
      content = <div>
                  <section>
                    <Image src={this.state.activeMovie['Poster']}/>
                    <h5>Title: {this.state.activeMovie['Title']}</h5>
                  </section>
                  <Pagination
                    bsSize="large"
                    items={this.state.items}
                    activePage={this.state.activePage}
                    onSelect={this.handleSelect.bind(this)} />
                </div>;
    }else{
      content = null;
    }
    return (
      <div className="container-fluid hero col-lg-6 col-md-8 col-sm-12">
        <TextField
          id="text-field-controlled"
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
          hintText="Enter text to search"
        />
      <FloatingActionButton onClick={this.callApi.bind(this)}>
        <SearchIcon/>
        </FloatingActionButton>
      {content}
    </div>
    )
  }
}

Search.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
