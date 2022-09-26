import React from 'react'

function Covid() {
    return (
        <div className="covid">
             <div classNameName="card" style={{ marginTop: "200px", borderRadius: "10px", border: "none" }}>
        {/* <h5 className="card-header">Featured</h5> */}
        <div className="card-body" style={{ height: "200px", borderRadius: "10px", backgroundColor: "rgb(209, 248, 238)" }}>
          <h3 className="card-title" style={{ textAlign: "center", color: "rgb(1, 59, 45)" }}>Welcome to Digi Heal</h3>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional content.
          </p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
      <div className="col">
        <div className="card h-100">
          <img
            src="https://mdbootstrap.com/img/new/standard/city/041.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This is a longer card with supporting text below as a natural lead-in to
              additional content. This content is a little bit longer.
            </p>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card h-100">
          <img
            src="https://mdbootstrap.com/img/new/standard/city/042.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">This is a short card.</p>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card h-100">
          <img
            src="https://mdbootstrap.com/img/new/standard/city/043.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This is a longer card with supporting text below as a natural lead-in to
              additional content.
            </p>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card h-100">
          <img
            src="https://mdbootstrap.com/img/new/standard/city/044.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This is a longer card with supporting text below as a natural lead-in to
              additional content. This content is a little bit longer.
            </p>
          </div>
        </div>
      </div>
  </div>
        </div>
    )
}

export default Covid
