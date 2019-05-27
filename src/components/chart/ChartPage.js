import React, {Component} from 'react';
import BarGroup from "./BarGroup";
import * as Storage from "../../firebase/base";
import {base} from "../../firebase/base";
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import {withStyles} from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  chip: {
    margin: theme.spacing(1),
  },
});

class ChartPage extends Component {

  state = {
    questionKey: undefined,
    votes: {},
    question: {},
  };

  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.setState({questionKey: slug});

    const questionEndpoint = `${Storage.endpoints.questions}/${slug}`;
    console.log(questionEndpoint);
    base.fetch(`${Storage.endpoints.questions}/${slug}`, {
      context: this,
      asArray: false,
    }).then(data => {
      this.setState({question: data});
    }).catch(error => {
      console.error(error);
    });

    const votesEndpoint = `${Storage.endpoints.votes}/${slug}`;
    this.votesRef = Storage.base.syncState(votesEndpoint, {
      context: this,
      state: "votes",
      asArray: true,
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.votesRef);
  }

  render() {
    const barHeight = 30;
    const {votes, question} = this.state;
    const {classes} = this.props;

    const barData = {};
    if (question && question.options) {
      const optionKeys = Object.keys(question.options);
      optionKeys.map((key) => {
        barData[question.options[key]] = 0;
        return true;
      });
    }

    if (votes.length > 0) {
      votes.map((vote) => {
        barData[vote.optionText] = barData[vote.optionText] + 1;
        return true;
      });
    }

    const optionNames = Object.keys(barData);

    const barGroups = optionNames.map((name, index) => {
      const itemName = name;
      const itemCounter = barData[name];
      return (
        <g key={name} transform={`translate(0, ${index * barHeight})`}>
          <BarGroup barHeight={barHeight} count={itemCounter} name={itemName}/>
        </g>
      );
    });

    const totalVotesMessage = votes.length + "x Votes";

    return (
      <Container className={'container'} maxWidth={'sm'}>

        <svg width="800" height="300">
          <g className="container">
            <text className="title" x="10" y="30">
              Question: {this.state.question.text}
            </text>
            <g className="chart" transform="translate(100,60)">
              {barGroups}
            </g>
          </g>
        </svg>

        <Divider/>

        <Chip
          icon={<FaceIcon/>}
          label={totalVotesMessage}
          className={classes.chip}
        />
      </Container>
    );
  }
}

ChartPage.propTypes = {};

export default withStyles(styles, {withTheme: true})(ChartPage);
