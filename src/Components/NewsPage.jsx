const NewsPage = ({ image, title, url }) => {
  return (
    <div className="d-flex">
      <div className="card bg-dark text-light" style={{ maxWidth: "365px" }}>
        <img src={image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{title}</p>
          <a href={url} className="btn btn-primary">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
