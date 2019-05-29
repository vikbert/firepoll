import React, {Component} from 'react';
import * as Storage from "../../firebase/base";
import {base} from "../../firebase/base";
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import {withStyles} from '@material-ui/styles';
import {Axis, Chart, Coord, Geom, Tooltip} from 'bizcharts';
import PollTitleCard from "../common/PollTitleCard";

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

    base.fetch(`${Storage.endpoints.questions}/${slug}`, {
      context: this,
      asArray: false,
    }).then(data => {
      console.log('data is back');
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

    let data = [];
    const keys = Object.keys(barData);
    keys.map((key, index) => {
      data[index] = {option: key, votes: barData[key]};
      return true;
    });

    const totalVotesMessage = votes.length + "x Votes";

    console.log(data);
    data = [
      {option: 'some text ist there ', votes: 30},
      {option: 'some tex there ', votes: 3},
      {option: 'some tex ', votes: 12},
      {option: 'some text ist there ', votes: 20},
    ];

    return (
      <Container className={'container'} maxWidth={'sm'}>

        <PollTitleCard title={question.text}/>

        <Chart height={400} data={data} forceFit>
          <Coord transpose/>
          <Axis name="option" label={{offset: 5}}/>
          <Axis name="votes"/>
          <Tooltip/>
          <Geom type="interval" position="option*votes" color={'#9c27b0'}/>
        </Chart>

        <Chip
          icon={<FaceIcon/>}
          label={totalVotesMessage}
          className={classes.chip}
        />

      </Container>
    );
  }
}

export default withStyles(styles, {withTheme: true})(ChartPage);
