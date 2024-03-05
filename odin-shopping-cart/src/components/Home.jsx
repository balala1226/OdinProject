import { Component } from "react";
import '../style/Home.css'

class Home extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <>
          <div className='content'>
            <div className='homeContent'>
              <div className='homeDescription'>
                <p className='homeText'>Add to cart now!</p>
              </div>
            </div>
          </div>
        </>
    );
  }
}

export default Home

