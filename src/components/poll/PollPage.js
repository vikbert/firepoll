import React, {Component} from 'react';
import AnswerOption from "./AnswerOption";
import {base, endpoints} from "../../firebase/base";
import AnswerOptionInput from "./AnswerOptionInput";
import {withStyles} from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  card: {
    marginTop: 15,
    cursor: null,
    "&:hover": {
      backgroundColor: 'transparent',
    },
  },
  media: {
    height: 14,
    padding: 14,
    backgroundColor: "grey",
    color: '#ffffff',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
});

class PollPage extends Component {
  state = {
    questionKey: undefined,
    question: {
      id: Date.now(),
      text: '',
      options: {},
    },
    optionInput: '',
    questionIsEmpty: false,
    optionIsEmpty: false,
  };

  handleChangeQuestion = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length > 0) {
      const question = {...this.state.question, text: inputValue};
      this.setState({question: question, questionIsEmpty: false});
    }
  };

  handleInputBlur = (e) => {
    const inputValue = e.target.value;
    this.setState({questionIsEmpty: inputValue.trim().length === 0});
  };

  addAnswer = (optionInput) => {
    if (optionInput.trim().length === 0) {
      this.setState({optionInput: '', optionIsEmpty: true});

      return false;
    }

    const optionkey = Date.now();
    const question = {...this.state.question};
    question.options[optionkey] = optionInput;
    this.setState({
      optionInput: '',
      question: question,
      optionIsEmpty: false,
    });
  };

  removeOption = (optionKey) => {
    console.log('remove options');
    const {question} = this.state;
    const options = {...question.options};
    delete options[optionKey];

    this.setState({question: {...question, options}});
  };

  handleSubmit = () => {
    const questionText = this.state.question.text.trim();
    if (questionText.length === 0) {
      this.setState({questionIsEmpty: true});
      return false;
    }

    const {history} = this.props;
    base.push(endpoints.questions, {
      data: this.state.question,
    }).then((newLocation) => {
      const querykey = newLocation.path.pieces_[1];
      this.setState({questionKey: querykey});
      const newRoute = "/vote/" + querykey;
      history.push(newRoute);
    }).catch((error) => {
      console.error(error);
    });
  };

  render() {
    const {classes} = this.props;
    const {question, questionIsEmpty} = this.state;
    const keys = Object.keys(question.options);
    const hasMinTwoAnswerOptions = keys.length >= 2;
    return (
      <div>
        <Container className={'container'} maxWidth="sm">
          <TextField
            error={questionIsEmpty}
            label="Poll Question:"
            placeholder="Enter the question text"
            helperText="Can not be empty"
            fullWidth
            multiline
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.handleChangeQuestion}
            onBlur={this.handleInputBlur}
          />

          <AnswerOptionInput addAnswer={this.addAnswer}/>
          <List dense={false}>
            {keys.map((key, index) => (
              <AnswerOption
                key={index}
                optionKey={key}
                optionText={question.options[key]}
                removeOption={this.removeOption}
              />
            ))}
          </List>

          {hasMinTwoAnswerOptions > 0 &&
          <Grid container direction={'row'} justify={'flex-end'} alignItems={'center'}>
            <Fab
              size={'large'}
              variant={'extended'}
              color={"primary"}
              aria-label="save the question"
              onClick={this.handleSubmit}
            >
              Submit Poll
            </Fab>
          </Grid>
          }
          {this.state.questionKey && <h3>{this.state.questionKey}</h3>}
        </Container>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(PollPage);
