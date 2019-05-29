import React, {Component} from 'react';
import {base, endpoints} from "../../firebase/base";
import AnswerOption from "./AnswerOption";
import AnswerOptionInput from "./AnswerOptionInput";
import QuestionInput from './QuestionInput';

import {withStyles} from '@material-ui/styles';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Typography from '@material-ui/core/Typography';
import SubmitButton from "./SubmitButton";

const styles = () => ({
  root: {}
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

  handleChangeQuestion = (inputText) => {
    if (inputText.length > 0) {
      const question = {...this.state.question, text: inputText};
      this.setState({question: question, questionIsEmpty: false});
    }

    this.setState({questionIsEmpty: inputText.trim().length === 0});
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
    const {question} = this.state;
    const keys = Object.keys(question.options);
    const hasMinTwoAnswerOptions = keys.length >= 2;

    return (
      <div>
        <Container className={'container'} maxWidth="sm">

          <Box>
            <Typography component={'p'} align={'center'} style={{color: '#b7b7b7', margin: '1.5em'}}>
              Add the poll question and min. 2x poll answers, then share the URL for getting feedback.
              Each participant is able to vote the poll just once.
            </Typography>
          </Box>
          <Box display={'flex'} justifyContent={'center'}>
            <AssignmentIcon color={'disabled'} style={{fontSize: 80, display: 'block'}}/>
          </Box>

          <QuestionInput handleSubmit={this.handleChangeQuestion} labelText={'Poll Question'}/>
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

          {hasMinTwoAnswerOptions > 0 && <SubmitButton handleSubmit={this.handleSubmit}/>}
          {this.state.questionKey && <h3>{this.state.questionKey}</h3>}
        </Container>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(PollPage);
