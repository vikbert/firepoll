import React, {Component} from 'react';
import {base, endpoints} from "../../firebase/base";
import './VotePage.css';
import Option from './Option';
import Container from '@material-ui/core/Container';
import MySnackbarContentWrapper from '../common/SnackbarContentWrapper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import {withStyles} from '@material-ui/styles';

const styles = theme => ({
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
});

class VotePage extends Component {
  state = {
    question: undefined,
    questionKey: undefined,
    isVoted: false,
    submitError: false,
    selectedOption: {},
    isLoading: true,
  };

  uuidv4() {
    return `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16),
    );
  }

  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.setState({questionKey: slug});

    if (localStorage.getItem(slug) !== null) {
      this.setState({
        submitError: false,
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
    const isSubmitAllowed = playerId === null && selectedOption !== undefined;

    if (isSubmitAllowed) {
      playerId = this.uuidv4();
      localStorage.setItem(questionKey, playerId);

      const questionVotesEndpoint = `${endpoints.votes}/${questionKey}/${playerId}`;

      base.post(questionVotesEndpoint, {
        data: this.state.selectedOption,
      }).then(() => {
        const newRoute = "/chart/" + questionKey;
        history.push(newRoute);
        this.setState({submitError: false});
      }).catch((error) => {
        console.error(error);
      });
    } else {
      this.setState({submitError: true});
      console.error('Submit current form is not allowed!');
    }
  };

  handleCloseSnackbar = () => {
    this.setState({submitError: false});
  };

  render() {
    const {question, selectedOption, isLoading, submitError} = this.state;
    const {classes} = this.props;
    const optionKeys = question && Object.keys(question.options);
    const shareLinkMessage = "share this link to get the voting from the others </br> " + window.location.href;
    return (
      <>
        <Container className={'container'} maxWidth={'sm'}>
          {submitError && (
            <MySnackbarContentWrapper
              variant="error"
              open
              message="You might have been already voted this poll and it's not allowed to repeat the voting."
              onClose={this.handleCloseSnackbar}
            />
          )}

        </Container>
        <Container className={'container'} maxWidth={'sm'}>
          {isLoading
          && (
            <Grid container justify="center">
              <CircularProgress color="primary"/>
            </Grid>
          )}

          {question && (
            <>
              <Typography variant={'subtitle1'}>Question: {question.text}</Typography>
              {optionKeys.map((key, index) => (
                  <Option divName={selectedOption.optionId === key ? 'active option-item' : 'option-item'}
                          key={index}
                          optionId={key}
                          optionText={question.options[key]}
                          selectAnswer={this.handleClick}/>
                ),
              )}
              {this.state.selectedOption &&
              <Fab
                onClick={this.handleSubmit}
                size={'large'}
                variant={'extended'}
                color={'primary'}
                arial-label={'save the selected answer'}
              >
                <SaveIcon className={classes.extendedIcon}></SaveIcon>
                Submit the selected Answer
              </Fab>
              }
            </>
          )}

        </Container>
      </>
    );
  }
}

export default withStyles(styles)(VotePage);
