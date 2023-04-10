import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }



  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  //  get headlines from news api

  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=babf6d79cf4346bb9d9cd5df5b19920c&pageSize=${this.props.pageSize}}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  // go to pervious page
  handlPrevClick = async () => {
    console.log("pervious");

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=babf6d79cf4346bb9d9cd5df5b19920c&page=${this.state.page - 1
      }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
   
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
    });
  };

  //go to next page
  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.p)) {
    } else {
      console.log("Next");

      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=babf6d79cf4346bb9d9cd5df5b19920c&page=${this.state.page + 1
        }&pageSize=${this.props.pageSize}`;

      let data = await fetch(url);
      let parsedData = await data.json();
      
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
      });
    }
  };

  render() {
    return (
      <div className="container my-4">
        <h1 className="text-center" style={{ margin: '30px' , padding:'30px' }}>News - Top Headlines</h1>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlPrevClick}
          >
            Previous
          </button>

          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default News;
