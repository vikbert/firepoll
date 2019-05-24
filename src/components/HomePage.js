import React, {Component} from 'react';
import './HomePage.css';
import AnswerOption from "./AnswerOption";

class HomePage extends Component {
  state = {
    question: {
      id: Date.now(),
      text: '',
      options: {},
    },
    optionInput: '',
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
    const optionkey = Date.now();
    const {optionInput} = this.state;
    const question = {...this.state.question};
    question.options[optionkey] = optionInput;
    this.setState({optionInput: '', question: question});
  };

  handleClickPlus = (e) => {
    e.preventDefault();
    this._addAnswer();
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('key press in answer input');
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

  render() {
    const {optionInput, question} = this.state;
    const keys = Object.keys(question.options);
    const hasMinTwoAnswerOptions = keys.length >= 2;
    return (
      <div>
        <h1>Home</h1>
        <div className="question-form">
          <div className="form-body">
            <div className="question">
              <label htmlFor="question">Question:</label>
              <input
                type="text"
                placeholder={'enter the question'}
                onChange={this.handleChangeQuestion}
              />
            </div>
            <div className="answer">
              <label htmlFor="answer">Optional Answer:</label>
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
              <a href="#" className="circle-plus" onClick={this.handleClickPlus}>+</a>
            </div>
          </div>

          <div className="form-footer">
            {hasMinTwoAnswerOptions > 0 && <a href="#" className="submit">Submit the Question</a>}
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
