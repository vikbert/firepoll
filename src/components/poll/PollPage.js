import React, {Component} from 'react';
import AnswerOption from "./AnswerOption";
import {base, endpoints} from "../../firebase/base";
import AnswerOptionInput from "./AnswerOptionInput";
import {withStyles} from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';

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
  floatingFab: {
    position: 'absolute',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
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
            label="Question:"
            style={{margin: 8}}
            placeholder="Enter the question text"
            helperText="Can not be empty"
            fullWidth
            multiline
            margin="normal"
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
          <Fab
            size={'large'}
            variant="extended"
            className={classes.floatingFab}
            color={"primary"}
            aria-label="save the question"
            onClick={this.handleSubmit}
          >
            <SaveIcon className={classes.extendedIcon}/>
            {'submit this poll'}
          </Fab>
          }

          {this.state.questionKey && <h3>{this.state.questionKey}</h3>}
        </Container>
        {question.text !== '' && (
          <Container className={'question-preview'} maxWidth="sm">
            <Card className={classes.card}>
              <CardMedia className={classes.media} src="#">PREVIEW</CardMedia>
              <CardContent>
                <Typography variant={'h6'} gutterBottom display={'block'}>
                  {question.text}
                </Typography>
                {keys.length > 0 && (
                  <FormControl component="fieldset" className={classes.formControl}>
                    <RadioGroup
                      aria-label="answer-option"
                      name="answer-option"
                      className={classes.group}
                    >
                      {keys.map((key, index) => (
                        <FormControlLabel key={index} value={key} control={<Radio/>} label={question.options[key]}/>
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
              </CardContent>
            </Card>
          </Container>
        )}
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(PollPage);
