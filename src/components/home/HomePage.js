import React, {Component} from 'react';
import './HomePage.css';
import AnswerOption from "./AnswerOption";
import {base, endpoints} from "../../firebase/base";

class HomePage extends Component {
  state = {
    questionKey: undefined,
    question: {
      id: Date.now(),
      text: '',
      options: {},
    },
    optionInput: '',
    invalidUserInput: false,
  };

  handleChangeQuestion = (e) => {
    const inputValue = e.target.value;
    const question = {...this.state.question, text: inputValue};
    this.setState({question: question});
  };

  handleChangeOption = (e) => {
    const inputValue = e.target.value;
    this.setState({optionInput: inputValue});
  };

  _addAnswer = () => {
    const {optionInput} = this.state;

    if (optionInput.trim().length === 0) {
      this.setState({optionInput: '', invalidUserInput: true});

      return false;
    }

    const optionkey = Date.now();

    const question = {...this.state.question};
    question.options[optionkey] = optionInput;
    this.setState({optionInput: '', question: question, invalidUserInput: false});
  };

  handleClickPlus = (e) => {
    e.preventDefault();
    this._addAnswer();
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this._addAnswer();
    }
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
      this.setState({invalidUserInput: true});
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
    const {optionInput, question} = this.state;
    const keys = Object.keys(question.options);
    const hasMinTwoAnswerOptions = keys.length >= 2;
    return (
      <div>
        <h1>Enter your new Question and its optional Answers:</h1>
        <div className="question-form">
          <div className="form-body">
            <div className="question">
              {this.state.invalidUserInput &&
                <div className={'warning'}>Text field of question and answer should not be empty</div>
              }
              <label htmlFor="question">Question:</label><br/>
              <input
                type="text"
                placeholder={'enter the question'}
                onChange={this.handleChangeQuestion}
              />
            </div>
            <div className="answer">
              <label htmlFor="answer">Optional Answer(min. 2x):</label>
              <ul>
                {keys.map((key, index) => (
                  <AnswerOption
                    key={index}
                    optionKey={key}
                    optionText={question.options[key]}
                    removeOption={this.removeOption}
                  />
                ))}
              </ul>

              <input
                type="text"
                placeholder={'enter the optional answer'}
                onChange={this.handleChangeOption}
                onKeyPress={this.handleKeyPress}
                value={optionInput}
              />
              <span className="circle-plus" onClick={this.handleClickPlus}>+</span>
            </div>
          </div>

          <div className="form-footer">
            {hasMinTwoAnswerOptions > 0 &&
            <span className="submit" onClick={this.handleSubmit}>Submit the Question</span>
            }

            {this.state.questionKey && <h3>{this.state.questionKey}</h3>}
          </div>
        </div>

      </div>
    );
  }
}

export default HomePage;
