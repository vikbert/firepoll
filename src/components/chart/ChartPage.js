import React, {Component} from 'react';
import * as Storage from "../../firebase/base";
import {base} from "../../firebase/base";
import {withStyles} from '@material-ui/styles';
import {Axis, Chart, Coord, Geom, Tooltip} from 'bizcharts';
import PollTitleCard from "../common/PollTitleCard";
import InfoContainer from "../common/InfoContainer";
import MySnackbarContentWrapper from "../common/SnackbarContentWrapper";
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import FaceIcon from '@material-ui/icons/Face';
import Fab from "@material-ui/core/Fab/Fab";
import copy from 'copy-to-clipboard';

const styles = theme => ({
  chip: {
    margin: theme.spacing(1),
  },
});

class ChartPage extends Component {
  state = {
    questionKey: undefined,
    votes: {},
    question: undefined,
    isCopied: false,
  };

  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.setState({questionKey: slug});

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

  handleCopy = (e) => {
    e.preventDefault();
    const url = window.location.href;
    copy(url.replace('chart', 'vote'));
    this.setState({isCopied: true});
  };

  handleClose = () => {
    this.setState({
      isCopied: false,
    });
  };

  render() {
    const {votes, question, isCopied} = this.state;
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

    return (
      <Container className={'container'} maxWidth={'sm'}>
        {question && (
          <Grid className={'container'}>
            <PollTitleCard title={question.text}/>
            {votes.length !== undefined &&
            <Grid container direction={'row'} justify={'flex-end'}>
              <Chip icon={<FaceIcon/>} label={totalVotesMessage} className={classes.chip}/>
            </Grid>
            }
            <Chart height={300} data={data} forceFit>
              <Coord transpose/>
              <Axis name="option" label={{offset: 5}}/>
              <Axis name="votes"/>
              <Tooltip/>
              <Geom type="interval" position="option*votes" color={'#9c27b0'}/>
            </Chart>
          </Grid>
        )}

        {isCopied && (
          <MySnackbarContentWrapper
            variant="success"
            open
            message={'Link copied!'}
            onClose={this.handleClose}
          />
        )}


        <Grid container justify={'center'} className={'container'}>
          <Fab
            onClick={this.handleCopy}
            size={'large'}
            variant={'extended'}
            color={'primary'}
            arial-label={'Copy and share'}
          >
            Copy & Share
          </Fab>
        </Grid>
        <InfoContainer info={'Share the link to get more voting from your team.'}/>

      </Container>
    );
  }
}

export default withStyles(styles, {withTheme: true})(ChartPage);
