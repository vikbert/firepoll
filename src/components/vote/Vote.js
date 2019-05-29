// import React, {Component} from 'react';
// import PropTypes from 'prop-types';
//
// class Vote extends Component {
//   state = {
//     queryKey: this.props.queryKey,
//   };
//   handleOnClick = () => {
//     const {handleClick} = this.props;
//     handleClick(this.state.queryKey);
//   };
//
//   render() {
//     const {name, queryKey} = this.props;
//     return (
//       <button
//         className={"vote-button"}
//         onClick={this.handleOnClick}
//         type="button"
//       >
//         {name}
//       </button>
//     );
//   }
// }
//
// Vote.propTypes = {
//   name: PropTypes.string.isRequired,
//   queryKey: PropTypes.string.isRequired,
//   handleClick: PropTypes.func.isRequired,
// };
//
// export default Vote;
