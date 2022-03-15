import { Component } from 'react'

class storageComponent extends Component {

  componentDidMount() {
    const myHour = new Date();

    if (localStorage.getItem('__TimeZone')) {
      // this.checkExpiration()
    } else {
      const data = myHour.setHours(myHour.getHours() + 1);
      localStorage.setItem('__TimeZone', JSON.stringify(data))
    }

  }

  // checkExpiration() {
  //   var values = JSON.parse(localStorage.getItem('__TimeZone'));

  //   var myHour = new Date()
  //   const hourNow = myHour.setHours(myHour.getHours())

  //   if (values < hourNow) {
  //     localStorage.removeItem('__TimeZone');
  //     localStorage.removeItem('__categoryEraspace');
  //     localStorage.removeItem('__cartTemp');
  //     window.location.reload();
  //   }
  // }

  render() {
    return (
      <>
      </>
    )
  }

}

export default storageComponent;