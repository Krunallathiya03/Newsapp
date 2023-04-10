import React, { Component } from "react";
import newsimage from "./newsimage.jpg"

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl,author,date } = this.props;
    return (
      <divc className="my-3">
        <div className="card">
          <img src={!imageUrl?newsimage:imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <small className="text-muted">By {!author?"Unknow":author} on {new Date(date).toGMTString()}</small>
            <a href={newsUrl} className="btn btn-dark">
              Read More
            </a>
          </div>  
        </div>
      </divc>
    );
  }
}

export default NewsItem;
