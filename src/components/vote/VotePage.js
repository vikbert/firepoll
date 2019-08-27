import React, {Component} from 'react';
import {base, endpoints} from "../../firebase/base";
import OptionButton from './OptionButton';
import Container from '@material-ui/core/Container';
import MySnackbarContentWrapper from '../common/SnackbarContentWrapper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import {withStyles} from '@material-ui/styles';
import PollTitleCard from "../common/PollTitleCard";
import InfoContainer from "../common/InfoContainer";
import copy from 'copy-to-clipboard';

const styles = theme => ({
  extendedIcon: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(5),
  },
  submitButtonRoot: {
    marginBottom: 10,
  },
  shareButton: {
    backgroundColor: theme.palette.background.paper,
  },
});

const errorDoubleVoting = 'It is not allowed to repeat the voting.';
const errorNoVoting = 'Please select one :)';
const errorNetworking = 'Something wrong with networking!';

class VotePage extends Component {
  state = {
    question: undefined,
    questionKey: undefined,
    isVoted: false,
    submitError: undefined,
    selectedOption: {},
    isLoading: true,
    isCopied: false,
  };

  uuidv4() {
    /*eslint no-mixed-operators:*/
    return `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16),
    );
  }

  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.setState({questionKey: slug});

    if (localStorage.getItem(slug) !== null) {
      this.setState({
        submitError: errorDoubleVoting,
      });
    }

    base.fetch(`${endpoints.questions}/${slug}`, {
      context: this,
      asArray: false,
    }).then(data => {
      this.setState({question: data, isLoading: false});
    }).catch(error => {
      console.error(error);
      this.setState({isLoading: false});
    });
  }

  handleClick = (optionId, optionText) => {
    const selectedOption = {
      optionId: optionId,
      optionText: optionText,
    };

    this.setState({
      selectedOption: selectedOption,
    });
  };

  handleSubmit = () => {
    const {history} = this.props;
    const {questionKey, selectedOption} = this.state;

    let playerId = localStorage.getItem(questionKey);
    if (playerId !== null) {
      this.setState({
        submitError: errorDoubleVoting,
      });

      return false;
    }

    const noOptionSelected = Object.keys(selectedOption).length === 0;
    if (noOptionSelected) {
      this.setState({
        submitError: errorNoVoting,
      });

      return false;
    }

    playerId = this.uuidv4();
    localStorage.setItem(questionKey, playerId);

    const questionVotesEndpoint = `${endpoints.votes}/${questionKey}/${playerId}`;
    base.post(questionVotesEndpoint, {
      data: this.state.selectedOption,
    }).then(() => {
      const newRoute = "/chart/" + questionKey;
      history.push(newRoute);
      this.setState({submitError: undefined});
    }).catch((error) => {
      console.error(error);
      this.setState({
        submitError: errorNetworking,
      });
    });
  };

  handleCloseSnackbar = () => {
    this.setState({
      submitError: false,
      isCopied: false,
    });
  };

  handleCopy = (e) => {
    e.preventDefault();
    const url = window.location.href;
    copy(url);
    this.setState({isCopied: true})
  };

  render() {
    const {question, selectedOption, isLoading, submitError, isCopied} = this.state;
    const {classes} = this.props;
    const optionKeys = question && Object.keys(question.options);

    return (
      <Container className={'container'} maxWidth={'sm'}>
        {submitError && (
            <MySnackbarContentWrapper
              variant="error"
              open
              message={submitError}
              onClose={this.handleCloseSnackbar}
            />
        )}
        { isCopied && (
          <MySnackbarContentWrapper
            variant="success"
            open
            message={'Link for this poll copied!'}
            onClose={this.handleCloseSnackbar}
          />
        )}
        <Grid className={'container'}>
          {isLoading
          && (
            <Grid container justify="center">
              <CircularProgress color="primary"/>
            </Grid>
          )}

          {question && (
            <>
              <PollTitleCard title={question.text}/>

              {optionKeys.map((key, index) => (
                  <OptionButton divName={selectedOption.optionId === key ? 'active option-item' : 'option-item'}
                                key={index}
                                optionId={key}
                                optionText={question.options[key]}
                                selectAnswer={this.handleClick}/>
                ),
              )}

              <Grid container direction={'row'}>
                <Grid item xs={6} container justify={'flex-start'} className={classes.shareButton}>
                  <Fab
                    onClick={this.handleCopy}
                    size={'large'}
                    variant={'extended'}
                    arial-label={'Copy and share'}
                  >
                    Share this poll
                  </Fab>
                </Grid>
                {this.state.selectedOption &&
                <Grid item xs={6} container justify={'flex-end'} className={classes.submitButtonRoot}>
                  <Fab
                    onClick={this.handleSubmit}
                    size={'large'}
                    variant={'extended'}
                    color={'primary'}
                    arial-label={'save the selected answer'}
                  >
                    Next
                  </Fab>
                </Grid>
                }
              </Grid>
            </>
          )}
          <InfoContainer info={'Choose one question and submit your vote'}/>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(VotePage);
