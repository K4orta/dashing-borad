import React from 'react';
import Truck from './truck';

export default class Trucks extends React.Component {
  componentDidMount() {
    let { fetchTrucks } = this.props;
    fetchTrucks();
  }
  render() {
    let trucks = this.props.lunch.trucks.map((day) => {
      return <Truck />;
    });
    console.log(this.props);
    return (
      <div className='lunch'>
      </div>
    );
  }
}
