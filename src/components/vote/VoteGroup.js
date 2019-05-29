// import React, {Component} from "react";
// import {base, endpoints} from "../../firebase/base";
// import Vote from "./Vote";
//
// class VoteGroup extends Component {
//   state = {
//     votes: {},
//   };
//
//   componentWillMount() {
//     base
//       .fetch(endpoints.votes, {
//         context: this,
//         asArray: false,
//       })
//       .then((votes) => {
//         this.setState({
//           votes: votes,
//         });
//       })
//       .catch((error) => {
//         throw error;
//       });
//   }
//
//   clickHandler = (key) => {
//     const targetVote = this.state.votes[key];
//     const newVote = {
//       id: Date.now(),
//       name: targetVote.name,
//       value: 1,
//     };
//
//     base.push(endpoints.votes, {
//       data: newVote,
//     }).then((newLocation) => {
//     }).catch((error) => {
//       console.error(error);
//     });
//   };
//
//   render() {
//     const keys = Object.keys(this.state.votes);
//
//     return (
//       <div>
//         {keys.map((key, index) => <Vote name={this.state.votes[key].name} key={key} queryKey={key}
//                                         handleClick={this.clickHandler}/>)}
//       </div>
//     );
//   }
// }
//
// export default VoteGroup;
